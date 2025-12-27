import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Skeleton } from "@/components/ui/skeleton";

const PricingSection = () => {
  const { plans, loading, error } = useSubscription();

  if (loading) {
    return (
      <section id="precos" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Planos simples,{" "}
              <span className="text-gradient">preços justos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Cancele quando quiser.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative bg-card rounded-2xl p-8 border border-border animate-fade-in-up">
                <div className="text-center mb-8">
                  <Skeleton className="h-6 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto mb-4" />
                  <Skeleton className="h-10 w-24 mx-auto" />
                </div>
                <ul className="space-y-4 mb-8">
                  {[1, 2, 3, 4].map((j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="precos" className="py-24">
        <div className="container mx-auto px-4 text-center text-destructive">
      
