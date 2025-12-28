import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Play, CheckCircle, ChevronRight } from "lucide-react";

const TemplatePreview = () => {
  const { templateId = "capture_ebook" } = useParams();
  const navigate = useNavigate();

  const templates = {
    capture_ebook: {
      title: "Captura E-book - Ebook Gratuito",
      hero: "Descubra os 5 Segredos do Marketing Digital",
      subtitle: "Baixe agora o guia completo GRATUITO que já ajudou +10k empreendedores",
      formTitle: "Cadastre-se para receber",
      cta: "Quero o E-book Grátis",
      color: "from-indigo-500 to-purple-500",
      icon: "📖",
      type: "form",
    },
    capture_vsl: {
      title: "Captura VSL - Aula ao Vivo",
      hero: "Aula Exclusiva: Multiplique suas Vendas em 30 Dias",
      subtitle: "Inscreva-se AGORA - Vagas Limitadas (só 500 disponíveis)",
      formTitle: "Reserve sua vaga gratuita",
      cta: "Quero Assistir Agora",
      color: "from-blue-500 to-cyan-500",
      icon: "▶️",
      type: "form",
    },
    capture_quiz: {
      title: "Captura Quiz - Diagnóstico Personalizado",
      hero: "Descubra seu Perfil de Conversão em 60 Segundos",
      subtitle: "Responda 5 perguntas e receba seu relatório GRATUITO",
      color: "from-orange-500 to-red-500",
      icon: "❓",
      type: "quiz",
      questions: [
        "Qual seu maior desafio hoje?",
        "Quantas leads você captura por dia?",
        "Qual seu ticket médio atual?",
        "Você usa automação de e-mails?",
        "Qual seu objetivo principal este mês?",
      ],
    },
    capture_discount: {
      title: "Captura Cupom - Oferta Relâmpago",
      hero: "🚨 70% OFF por TEMPO LIMITADO",
      subtitle: "Cupom exclusivo válido por 24h - Digite seu e-mail",
      formTitle: "Garanta seu desconto",
      cta: "Quero Meu Cupom 70% OFF",
      color: "from-emerald-500 to-green-500",
      icon: "🎫",
      type: "form",
    },
    product_vsl: {
      title: "Venda VSL - Produto Premium",
      hero: "O Curso que Transformou Minha Vida Financeira",
      subtitle: "R$497 → Apenas 12x de R$47 | Garantia de 7 dias",
      formTitle: "Garantir minha vaga",
      cta: "Quero Comprar Agora",
      color: "from-purple-600 to-pink-500",
      icon: "▶️",
      type: "form",
    },
    product_modern: {
      title: "Venda Moderna - SaaS Premium",
      hero: "Automatize suas Vendas em 5 Minutos",
      subtitle: "Plano Anual | Cancelamento quando quiser | Resultados imediatos",
      formTitle: "Começar teste grátis",
      cta: "Ativar Plano Anual",
      color: "from-slate-500 to-blue-500",
      icon: "⚡",
      type: "form",
    },
    product_classic: {
      title: "Carta de Vendas - Lançamento Quente",
      hero: "Como Faturei R$1,2M em 90 Dias (Sem Sorte)",
      subtitle: "Método passo a passo revelado | 97% de satisfação",
      formTitle: "Acessar método completo",
      cta: "Quero o Método Completo",
      color: "from-amber-500 to-orange-500",
      icon: "📘",
      type: "form",
    },
    upsell_offer: {
      title: "Upsell Automático - Oferta Extra",
      hero: "🎁 Bônus Exclusivo: +R$3k/mês Garantidos",
      subtitle: "Apenas R$97 (valor real R$497) | Aceita?",
      formTitle: "Adicionar bônus ao carrinho",
      cta: "Sim, Quero o Bônus!",
      color: "from-green-500 to-emerald-500",
      icon: "➡️",
      type: "form",
    },
    downsell_discount: {
      title: "Downsell - Recuperação de Venda",
