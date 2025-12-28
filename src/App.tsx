import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import Projetos from "./pages/Projetos";
import Leads from "./pages/Leads";
import Configuracoes from "./pages/Configuracoes";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Pricing from "./pages/Pricing";
import PublicLandingPage from "./pages/PublicLandingPage";
import ProjectEditor from "./pages/ProjectEditor";
import ThankYouPage from "./pages/ThankYouPage";
import UpsellPage from "./pages/UpsellPage";
import DownsellPage from "./pages/DownsellPage";
import TemplatePreview from "./pages/TemplatePreview";
import TemplateGallery from "./pages/TemplateGallery";
import Admin from "./pages/Admin";
import { AdminRoute } from "./components/admin/AdminRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ProjectsProvider>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/update-password" element={<UpdatePassword />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/projetos" element={<Projetos />} />
                  <Route path="/dashboard/projetos/:id/editar" element={<ProjectEditor />} />
                  <Route path="/dashboard/leads" element={<Leads />} />
                  <Route
                    path="/dashboard/configuracoes"
                    element={<Configuracoes />}
                  />
                  <Route path="/termos" element={<Termos />} />
                  <Route path="/privacidade" element={<Privacidade />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                  <Route path="/templates" element={<TemplatePreview />} />
                  <Route path="/templates/galeria" element={<TemplateGallery />} />
                  {/* Rotas públicas de projetos */}
                  <Route path="/p/:slug" element={<PublicLandingPage />} />
                  <Route path="/p/:slug/obrigado" element={<ThankYouPage />} />
                  <Route path="/p/:slug/upsell" element={<UpsellPage />} />
                  <Route path="/p/:slug/downsell" element={<DownsellPage />} />
                  {/* Rota alias para compatibilidade */}
                  <Route path="/:slug" element={<PublicLandingPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </HashRouter>
            </ProjectsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;