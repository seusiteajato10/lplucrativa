/**
 * Helper central de rotas para URLs de projetos.
 * Usar este helper em todos os lugares que geram/mostram links públicos de projetos.
 */

/**
 * Retorna o caminho público de um projeto
 * @param slug - O slug do projeto
 * @returns O caminho completo (ex: /p/meu-projeto)
 */
export const getProjectPublicPath = (slug: string): string => {
  return `/p/${slug}`;
};

/**
 * Retorna a URL completa do preview de um projeto (para exibição)
 * @param slug - O slug do projeto
 * @returns A URL de exibição para o usuário
 */
export const getProjectDisplayUrl = (slug: string): string => {
  return `seudominio.com/p/${slug}`;
};
