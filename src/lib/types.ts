// ─── Workflow Types ───────────────────────────────────────────────────────────
export type WorkflowIOType = 'image' | 'video' | 'text'

export interface Workflow {
  id: string
  name: string
  description: string
  inputType: WorkflowIOType
  outputType: WorkflowIOType
  estimatedSeconds: number
  category: string
  exampleBefore?: string
  exampleAfter?: string
}

// ─── Module Types ─────────────────────────────────────────────────────────────
export type ModuleId =
  | 'nav'
  | 'hero'
  | 'howto'
  | 'scenery'
  | 'othertools'
  | 'reviews'
  | 'faq'
  | 'footer'

export interface ModuleConfig {
  id: ModuleId
  label: string
  enabled: boolean
  required: boolean
  defaultEnabled: boolean
}

export interface HeroContent {
  title: string
  subtitle: string
  uploadHint: string
  ctaText: string
}

export interface NavContent {
  logo: string
  links: { label: string; href: string }[]
  ctaText: string
}

export interface HowToStep {
  icon: string
  title: string
  description: string
}

export interface SceneryItem {
  label: string
  description: string
  imageHint: string
}

export interface FAQItem {
  question: string
  answer: string
  category: string
}

export interface ReviewItem {
  name: string
  role: string
  avatar: string
  text: string
}

export interface OtherTool {
  name: string
  description: string
  href: string
}

export interface PageContent {
  nav: NavContent
  hero: HeroContent
  howto: HowToStep[]
  scenery: SceneryItem[]
  faq: FAQItem[]
  reviews: ReviewItem[]
  otherTools: OtherTool[]
  footerLinks: { label: string; href: string }[]
}

// ─── Style Types ──────────────────────────────────────────────────────────────
export type StylePackId =
  | 'minimalist'
  | 'tech-dark'
  | 'bold-energetic'
  | 'clean-professional'
  | 'soft-friendly'

export interface StylePack {
  id: StylePackId
  name: string
  description: string
  preview: {
    bg: string
    text: string
    primary: string
    accent: string
  }
  css: {
    '--color-bg': string
    '--color-surface': string
    '--color-text': string
    '--color-text-muted': string
    '--color-primary': string
    '--color-primary-hover': string
    '--color-accent': string
    '--color-border': string
    '--radius-btn': string
    '--radius-card': string
    '--font-heading': string
    '--font-body': string
  }
}

// ─── Builder State ────────────────────────────────────────────────────────────
export type BuilderStep = 1 | 2 | 3 | 4 | 6

export interface BuilderState {
  currentStep: BuilderStep
  selectedWorkflow: Workflow | null
  modules: ModuleConfig[]
  moduleOrder: ModuleId[]
  stylePackId: StylePackId
  customPrimary: string
  pageContent: PageContent | null
  isGenerating: boolean
  publishedUrl: string | null
  siteId: string | null
  configMode: 'modules' | 'chat'
  viewPort: 'desktop' | 'mobile'
}

// ─── Published Site ───────────────────────────────────────────────────────────
export interface PublishedSite {
  id: string
  name: string
  url: string
  workflowId: string
  workflowName: string
  stylePackId: StylePackId
  pageContent: PageContent
  modules: ModuleConfig[]
  moduleOrder: ModuleId[]
  stylePackCss: StylePack['css']
  customPrimary: string
  publishedAt: string
  analytics: SiteAnalytics
}

export interface SiteAnalytics {
  visits: number
  workflowCalls: number
  conversionRate: number
  topDropoff: string
}
