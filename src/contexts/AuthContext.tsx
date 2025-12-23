import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/project";

interface SignUpResult {
  error: Error | null;
  requiresEmailConfirmation?: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<SignUpResult>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  updateProfile: (data: Partial<Pick<UserProfile, 'full_name'>>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ensures public.users row exists for the authenticated user
  const ensureUserRow = async (authUser: User) => {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', authUser.id)
      .maybeSingle();

    // If row already exists, do nothing
    if (existingUser) {
      return;
    }

    // Create the row with data from auth.users metadata
    const fullName = authUser.user_metadata?.full_name || '';
    const email = authUser.email || '';

    const { error } = await supabase
      .from('users')
      .insert({
        id: authUser.id,
        full_name: fullName,
        email: email,
        plan: 'starter',
        plan_limits: { projects: 1, leads_per_month: 500 }
      });

    if (error) {
      // Ignore duplicate key error (race condition), log others
      if (!error.message?.includes('duplicate key')) {
        console.error('Error ensuring user row:', error);
      }
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as UserProfile | null;
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Defer Supabase calls with setTimeout to avoid deadlock
        if (currentSession?.user) {
          setTimeout(async () => {
            // Ensure user row exists in public.users
            await ensureUserRow(currentSession.user);
            // Then fetch profile
            const userProfile = await fetchProfile(currentSession.user.id);
            setProfile(userProfile);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession?.user) {
        await ensureUserRow(existingSession.user);
        const userProfile = await fetchProfile(existingSession.user.id);
        setProfile(userProfile);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string): Promise<SignUpResult> => {
    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName }
      }
    });

    if (error) {
      return { error, requiresEmailConfirmation: false };
    }

    // Check if we have an active session (email confirmation disabled)
    const hasSession = Boolean(data.session);

    if (!hasSession) {
      // Email confirmation is enabled - user must confirm email first
      // The public.users row will be created by ensureUserRow when user logs in
      return { error: null, requiresEmailConfirmation: true };
    }

    // Session exists - we can insert into public.users now
    const authUserId = data.user?.id;
    
    if (!authUserId) {
      return { error: new Error('Não foi possível obter o ID do usuário.'), requiresEmailConfirmation: false };
    }

    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: authUserId,
        full_name: fullName,
        email: email,
        plan: 'starter',
        plan_limits: { projects: 1, leads_per_month: 500 }
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      return { error: profileError, requiresEmailConfirmation: false };
    }

    return { error: null, requiresEmailConfirmation: false };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`
    });

    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    return { error };
  };

  const updateProfile = async (data: Partial<Pick<UserProfile, 'full_name'>>) => {
    if (!user) {
      return { error: new Error('No user logged in') };
    }

    const { error } = await supabase
      .from('users')
      .update(data)
      .eq('id', user.id);

    if (!error && profile) {
      setProfile({ ...profile, ...data });
    }

    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
