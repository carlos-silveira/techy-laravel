import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "TechyNews",
  description: "Comprehensive documentation for the TechyNews CMS",
  srcExclude: ['AI_ACTIVITY.md', 'Antigravity conv.md', 'BUG_LOG.md', 'AGENT_SKILLS_SYSTEM.md', 'GEMINI.md', '../GEMINI.md'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Backend', link: '/backend/laravel-core' },
      { text: 'Frontend', link: '/frontend/react-inertia' },
      { text: 'AI & Pipeline', link: '/ai/pipeline' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Architecture', link: '/guide/architecture' }
        ]
      },
      {
        text: 'Backend (Laravel)',
        items: [
          { text: 'Core Structure', link: '/backend/laravel-core' },
          { text: 'Database Rules', link: '/backend/database' },
          { text: 'Services Overview', link: '/backend/services' },
          {
            text: 'Controllers Reference',
            collapsed: false,
            items: [
              { text: 'Public & Frontend', link: '/backend/controllers/public-facing' },
              { text: 'Admin & Dashboard', link: '/backend/controllers/admin-dashboard' },
              { text: 'API & SEO Utils', link: '/backend/controllers/api-utility' },
              { text: 'Authentication', link: '/backend/controllers/auth' },
              { text: 'Studio CRUD', link: '/backend/controllers/studio-crud' }
            ]
          },
          {
            text: 'Models Reference',
            collapsed: false,
            items: [
              { text: 'Article', link: '/backend/models/article' },
              { text: 'FactCheck', link: '/backend/models/fact-check' },
              { text: 'ScoutedArticle', link: '/backend/models/scouted-article' },
              { text: 'User & Subscriber', link: '/backend/models/user-subscriber' }
            ]
          },
          {
            text: 'Services Reference',
            collapsed: false,
            items: [
              { text: 'GeminiService', link: '/backend/services/gemini-service' },
              { text: 'NewsAgent', link: '/backend/services/news-agent' },
              { text: 'FactCheckService', link: '/backend/services/fact-check-service' },
              { text: 'JinaReaderService', link: '/backend/services/jina-reader' },
              { text: 'SocialMediaService', link: '/backend/services/social-media' },
              { text: 'LlamaService', link: '/backend/services/llama-service' }
            ]
          }
        ]
      },
      {
        text: 'Frontend (React + Inertia)',
        items: [
          { text: 'React & Inertia Setup', link: '/frontend/react-inertia' },
          { text: 'Theme System', link: '/frontend/theme-system' },
          {
            text: 'Pages Reference',
            collapsed: false,
            items: [
              { text: 'Welcome & Archive', link: '/frontend/pages/welcome-archive' },
              { text: 'ArticleShow', link: '/frontend/pages/article-show' },
              { text: 'Dashboard', link: '/frontend/pages/dashboard' },
              { text: 'About & Legal', link: '/frontend/pages/about-pages' },
              { text: 'Auth Views', link: '/frontend/pages/auth-pages' },
              { text: 'Studio Views', link: '/frontend/pages/studio-pages' }
            ]
          },
          {
            text: 'Components Reference',
            collapsed: false,
            items: [
              { text: 'AI Interfaces', link: '/frontend/components/ai-interfaces' },
              { text: 'Analytics & Observability', link: '/frontend/components/analytics-observability' },
              { text: 'Layout & Navigation', link: '/frontend/components/layout-navigation' },
              { text: 'Content Rendering', link: '/frontend/components/content-rendering' },
              { text: 'Atomic UI Primitives', link: '/frontend/components/atomic-ui' }
            ]
          }
        ]
      },
      {
        text: 'AI & Workflows',
        items: [
          { text: 'Data Pipeline', link: '/ai/pipeline' },
          { text: 'Local LLM (MLX)', link: '/ai/local-llm' },
          { text: 'AI Agents Rules', link: '/ai/agents' },
          { text: 'Workflow: Generating News', link: '/workflows/generating-news' },
          { text: 'Workflow: Feature to PR', link: '/workflows/feature-to-pr' }
        ]
      },
      {
        text: 'Deployment & QA',
        items: [
          { text: 'GitHub Actions (CI/CD)', link: '/deployment/github-actions' },
          { text: 'Testing', link: '/deployment/testing' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/carlos-silveira/techy-laravel' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © TechyNews Contributors'
    }
  }
})
