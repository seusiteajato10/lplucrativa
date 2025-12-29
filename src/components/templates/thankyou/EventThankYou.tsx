import React from "react";

type EventThankYouProps = {
  data: Record<string, any>;
  projectName: string;
  projectId: string;
  userId: string;
  slug: string;
};

const EventThankYou: React.FC<EventThankYouProps> = ({
  data,
  projectName,
}) => {
  const handleAddToCalendar = () => {
    const calendarUrl = data.calendarUrl || "#";
    if (calendarUrl !== "#") {
      window.open(calendarUrl, "_blank");
    }
  };

  const handleDownloadTicket = () => {
    const ticketUrl = data.ticketUrl || data.pdfUrl || "#";
    if (ticketUrl !== "#") {
      window.open(ticketUrl, "_blank");
    }
  };

  const handleAccessEvent = () => {
    const eventUrl = data.eventUrl || data.accessUrl || "#";
    if (eventUrl !== "#") {
      window.open(eventUrl, "_blank");
    }
  };

  const handleJoinGroup = () => {
    const groupUrl = data.groupUrl || data.whatsappUrl || "#";
    if (groupUrl !== "#") {
      window.open(groupUrl, "_blank");
    }
  };

  const handleAccessMemberArea = () => {
    const memberAreaUrl = data.memberAreaUrl || "#";
    if (memberAreaUrl !== "#") {
      window.open(memberAreaUrl, "_blank");
    }
  };

  const handleShare = () => {
    const shareText = `Garanta sua vaga no ${data.eventName || projectName}!`;
    const shareUrl = data.shareUrl || window.location.href;
    
    if (navigator.share) {
      navigator.share({ title: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-8 text-center">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {data.headline || "Inscrição Confirmada! Nos Vemos Lá!"}
            </h1>
            <p className="text-xl text-purple-100">
              {data.subheadline || "Seu ingresso para o evento foi garantido. Prepare-se para uma experiência única!"}
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Event and Ticket Details */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Event Info */}
                <div>
                  <h3 className="font-bold text-purple-900 mb-3">Detalhes do Evento</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700"><strong>Evento:</strong> {data.eventName || projectName}</p>
                    <p className="text-gray-700"><strong>Data:</strong> {data.eventDate || "15 de Janeiro, 2025"}</p>
                    <p className="text-gray-700"><strong>Horário:</strong> {data.eventTime || "19h00 - 22h00"}</p>
                    <p className="text-gray-700"><strong>Local:</strong> {data.eventLocation || "Online (Zoom)"}</p>
                  </div>
                </div>

                {/* Ticket Info */}
                <div>
                  <h3 className="font-bold text-purple-900 mb-3">Seu Ingresso</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700"><strong>Tipo:</strong> {data.ticketType || "VIP"}</p>
                    <p className="text-gray-700"><strong>Número:</strong> #{data.ticketNumber || "12345"}</p>
                    <p className="text-gray-700"><strong>Status:</strong> <span className="text-green-600 font-bold">Confirmado</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-purple-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Adicionar ao Calendário</h3>
                <button 
                  onClick={handleAddToCalendar}
                  className="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-input bg-white hover:bg-gray-50 h-9 px-3 transition-colors"
                >
                  Google Calendar
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-purple-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Baixar Ingresso</h3>
                <button 
                  onClick={handleDownloadTicket}
                  className="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-input bg-white hover:bg-gray-50 h-9 px-3 transition-colors"
                >
                  Baixar PDF
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 text-purple-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">Lembretes</h3>
                <p className="text-sm text-gray-600 mt-2">Ativado por e-mail</p>
              </div>
            </div>

            {/* Preparation Steps */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Prepare-se para o Evento:</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Acesse o link do evento</h3>
                    <p className="text-gray-600 text-sm mb-2">O link de acesso será enviado 1 hora antes do início.</p>
                    <button 
                      onClick={handleAccessEvent}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-purple-300 bg-white hover:bg-gray-50 h-9 px-3 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Ver Instruções de Acesso
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Baixe os materiais</h3>
                    <p className="text-gray-600 text-sm">Material de apoio já está disponível para download.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Participe do grupo</h3>
                    <p className="text-gray-600 text-sm mb-2">Entre no grupo exclusivo de participantes.</p>
                    <button 
                      onClick={handleJoinGroup}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-green-300 bg-white hover:bg-gray-50 h-9 px-3 transition-colors"
                    >
                      Entrar no WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main CTAs */}
            <div className="space-y-4">
              <button 
                onClick={handleAccessMemberArea}
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg transition-all"
              >
                ACESSAR ÁREA DO PARTICIPANTE
              </button>

              <button 
                onClick={handleShare}
                className="w-full h-14 text-lg font-bold border-2 border-input bg-white hover:bg-gray-50 rounded-xl transition-colors"
              >
                COMPARTILHAR COM AMIGOS
              </button>
            </div>

            {/* Contact Footer */}
            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>Dúvidas? Fale conosco: <a href={`mailto:${data.contactEmail || "eventos@email.com"}`} className="text-purple-600 hover:underline">{data.contactEmail || "eventos@email.com"}</a></p>
            </div>

          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.brandName || projectName}. {data.footerNote || "Todos os direitos reservados."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href={data.privacyUrl || "#"} className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href={data.termsUrl || "#"} className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href={data.contactUrl || "#"} className="hover:text-foreground transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventThankYou;
