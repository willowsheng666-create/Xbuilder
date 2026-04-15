'use client'
import { ModuleConfig, ModuleId, PageContent, StylePack } from '@/lib/types'
import { NavModule } from './modules/NavModule'
import { HeroModule } from './modules/HeroModule'
import { HowToModule } from './modules/HowToModule'
import { SceneryModule } from './modules/SceneryModule'
import { OtherToolsModule } from './modules/OtherToolsModule'
import { ReviewsModule } from './modules/ReviewsModule'
import { FAQModule } from './modules/FAQModule'
import { FooterModule } from './modules/FooterModule'

interface SitePreviewProps {
  content: PageContent
  modules: ModuleConfig[]
  moduleOrder: ModuleId[]
  stylePack: StylePack
  customPrimary?: string
  isMobile?: boolean
}

const MODULE_COMPONENTS: Record<ModuleId, React.ComponentType<{ content: PageContent }>> = {
  nav: NavModule,
  hero: HeroModule,
  howto: HowToModule,
  scenery: SceneryModule,
  othertools: OtherToolsModule,
  reviews: ReviewsModule,
  faq: FAQModule,
  footer: FooterModule,
}

export function SitePreview({
  content,
  modules,
  moduleOrder,
  stylePack,
  customPrimary,
  isMobile = false,
}: SitePreviewProps) {
  const enabledModules = moduleOrder.filter(id => {
    const mod = modules.find(m => m.id === id)
    return mod?.enabled
  })

  const css = { ...stylePack.css }
  if (customPrimary) {
    css['--color-primary'] = customPrimary
    css['--color-primary-hover'] = customPrimary
  }

  const cssVars = Object.entries(css)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ')

  return (
    <div
      className="min-h-full overflow-y-auto"
      style={{ ...(Object.fromEntries(Object.entries(css).map(([k, v]) => [k, v]))), fontFamily: css['--font-body'] }}
    >
      <style>{`
        .site-preview {
          ${cssVars}
          font-family: var(--font-body);
          background-color: var(--color-bg);
          color: var(--color-text);
        }
        .site-preview .btn-primary {
          background-color: var(--color-primary);
          border-radius: var(--radius-btn);
          color: white;
          transition: background-color 0.15s;
        }
        .site-preview .btn-primary:hover {
          background-color: var(--color-primary-hover);
        }
        .site-preview .card {
          background-color: var(--color-surface);
          border-radius: var(--radius-card);
          border: 1px solid var(--color-border);
        }
        .site-preview h1, .site-preview h2, .site-preview h3 {
          font-family: var(--font-heading);
          color: var(--color-text);
        }
        .site-preview .text-muted {
          color: var(--color-text-muted);
        }
        .site-preview .accent-bg {
          background-color: var(--color-accent);
        }
        .site-preview .surface-bg {
          background-color: var(--color-surface);
        }
        .site-preview .border-color {
          border-color: var(--color-border);
        }
        .site-preview .primary-color {
          color: var(--color-primary);
        }
      `}</style>
      <div className="site-preview" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100%' }}>
        {enabledModules.map(id => {
          const Component = MODULE_COMPONENTS[id]
          return Component ? <Component key={id} content={content} /> : null
        })}
      </div>
    </div>
  )
}
