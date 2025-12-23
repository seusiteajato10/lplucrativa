import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Rocket } from "lucide-react";

const Privacidade = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade - LP Lucrativa</title>
        <meta name="description" content="Política de privacidade da plataforma LP Lucrativa." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 gradient-hero rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                LP <span className="text-gradient">Lucrativa</span>
              </span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Política de Privacidade
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Informações que Coletamos
                </h2>
                <p>
                  Coletamos informações que você nos fornece diretamente, como nome, email e dados de pagamento 
                  quando você cria uma conta ou assina um plano.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Como Usamos suas Informações
                </h2>
                <p>
                  Usamos suas informações para fornecer, manter e melhorar nossos serviços, processar pagamentos, 
                  enviar comunicações sobre sua conta e fornecer suporte ao cliente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Compartilhamento de Informações
                </h2>
                <p>
                  Não vendemos suas informações pessoais. Podemos compartilhar informações com prestadores de 
                  serviços que nos ajudam a operar a plataforma, sempre sob acordos de confidencialidade.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. Segurança dos Dados
                </h2>
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações 
                  contra acesso não autorizado, alteração ou destruição.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Seus Direitos
                </h2>
                <p>
                  Você tem direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer 
                  esses direitos, entre em contato conosco pelo email privacidade@lplucrativa.com.br.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Cookies
                </h2>
                <p>
                  Usamos cookies para melhorar sua experiência na plataforma. Você pode configurar seu 
                  navegador para recusar cookies, mas isso pode afetar algumas funcionalidades.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  7. Alterações nesta Política
                </h2>
                <p>
                  Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações 
                  significativas publicando a nova política nesta página.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Privacidade;
