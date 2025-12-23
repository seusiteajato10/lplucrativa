import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Rocket } from "lucide-react";

const Termos = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso - LP Lucrativa</title>
        <meta name="description" content="Termos de uso da plataforma LP Lucrativa." />
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
            Termos de Uso
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e usar a plataforma LP Lucrativa, você concorda em cumprir estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Descrição do Serviço
                </h2>
                <p>
                  A LP Lucrativa é uma plataforma de criação de landing pages que permite aos usuários 
                  criar, editar e publicar páginas de destino para seus negócios.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Conta do Usuário
                </h2>
                <p>
                  Para usar nossos serviços, você deve criar uma conta fornecendo informações precisas e 
                  completas. Você é responsável por manter a confidencialidade de sua senha.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. Uso Aceitável
                </h2>
                <p>
                  Você concorda em não usar a plataforma para fins ilegais ou proibidos por estes termos. 
                  É proibido publicar conteúdo ofensivo, difamatório ou que viole direitos de terceiros.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Pagamento e Cancelamento
                </h2>
                <p>
                  Os planos pagos são cobrados mensalmente. Você pode cancelar sua assinatura a qualquer 
                  momento. Não oferecemos reembolso por períodos parciais.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Contato
                </h2>
                <p>
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do 
                  email suporte@lplucrativa.com.br.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Termos;
