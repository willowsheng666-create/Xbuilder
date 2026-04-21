import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  BuilderState,
  BuilderStep,
  ModuleConfig,
  ModuleId,
  PageContent,
  PublishedSite,
  StylePackId,
  Workflow,
} from './types'

const DEFAULT_MODULES: ModuleConfig[] = [
  { id: 'nav', label: 'Navigation', enabled: true, required: false, defaultEnabled: true },
  { id: 'hero', label: 'Hero + Interactive Area', enabled: true, required: true, defaultEnabled: true },
  { id: 'howto', label: 'How To Use', enabled: true, required: false, defaultEnabled: true },
  { id: 'scenery', label: 'Use Cases / Scenery', enabled: true, required: false, defaultEnabled: true },
  { id: 'othertools', label: 'Other Tools', enabled: false, required: false, defaultEnabled: false },
  { id: 'reviews', label: 'User Reviews', enabled: false, required: false, defaultEnabled: false },
  { id: 'faq', label: 'FAQ', enabled: true, required: false, defaultEnabled: true },
  { id: 'footer', label: 'Footer', enabled: true, required: false, defaultEnabled: true },
]

const DEFAULT_ORDER: ModuleId[] = ['nav', 'hero', 'howto', 'scenery', 'othertools', 'reviews', 'faq', 'footer']

interface BuilderActions {
  setStep: (step: BuilderStep) => void
  selectWorkflow: (workflow: Workflow) => void
  setFigmaUrl: (url: string | null) => void
  toggleModule: (id: ModuleId) => void
  setModuleOrder: (order: ModuleId[]) => void
  setStylePack: (id: StylePackId) => void
  setCustomPrimary: (color: string) => void
  setPageContent: (content: PageContent) => void
  setIsGenerating: (v: boolean) => void
  setPublished: (url: string, siteId: string) => void
  setViewPort: (v: 'desktop' | 'mobile') => void
  setConfigMode: (m: 'modules' | 'chat') => void
  reset: () => void
}

interface SitesState {
  sites: PublishedSite[]
  addSite: (site: PublishedSite) => void
  updateSiteAnalytics: (id: string, delta: Partial<PublishedSite['analytics']>) => void
}

const initialBuilder: BuilderState = {
  currentStep: 1,
  selectedWorkflow: null,
  figmaUrl: null,
  modules: DEFAULT_MODULES,
  moduleOrder: DEFAULT_ORDER,
  stylePackId: 'clean-professional',
  customPrimary: '',
  pageContent: null,
  isGenerating: false,
  publishedUrl: null,
  siteId: null,
  configMode: 'modules',
  viewPort: 'desktop',
}

export const useBuilderStore = create<BuilderState & BuilderActions>()(
  (set) => ({
    ...initialBuilder,

    setStep: (step) => set({ currentStep: step }),

    selectWorkflow: (workflow) => set({ selectedWorkflow: workflow }),

    setFigmaUrl: (url) => set({ figmaUrl: url }),

    toggleModule: (id) =>
      set((s) => ({
        modules: s.modules.map((m) =>
          m.id === id && !m.required ? { ...m, enabled: !m.enabled } : m
        ),
      })),

    setModuleOrder: (order) => set({ moduleOrder: order }),

    setStylePack: (id) => set({ stylePackId: id }),

    setCustomPrimary: (color) => set({ customPrimary: color }),

    setPageContent: (content) => set({ pageContent: content }),

    setIsGenerating: (v) => set({ isGenerating: v }),

    setPublished: (url, siteId) => set({ publishedUrl: url, siteId }),

    setViewPort: (v) => set({ viewPort: v }),

    setConfigMode: (m) => set({ configMode: m }),

    reset: () => set({ ...initialBuilder }),
  })
)

export const useSitesStore = create<SitesState>()(
  persist(
    (set) => ({
      sites: [],
      addSite: (site) => set((s) => ({ sites: [site, ...s.sites] })),
      updateSiteAnalytics: (id, delta) =>
        set((s) => ({
          sites: s.sites.map((site) =>
            site.id === id
              ? { ...site, analytics: { ...site.analytics, ...delta } }
              : site
          ),
        })),
    }),
    { name: 'xbuilder-sites' }
  )
)
