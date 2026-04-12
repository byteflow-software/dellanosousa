/** @type {import('next-sitemap').IConfig} */

const serviceSlugs = [
  'provas-digitais',
  'defesa-criminal',
  'investigacao-defensiva',
  'assistencia-tecnica',
  'cadeia-custodia',
  'consultoria-urgente',
]

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dellanosousa.com.br',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  exclude: ['/obrigado', '/api/*'],
  additionalPaths: async () => {
    return serviceSlugs.map((slug) => ({
      loc: `/areas-de-atuacao/${slug}`,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }))
  },
}
