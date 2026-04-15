import { PageContent, Workflow } from './types'

export function buildDefaultContent(workflow: Workflow): PageContent {
  const name = workflow.name

  return {
    nav: {
      logo: name,
      links: [
        { label: 'How To', href: '#howto' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#footer' },
      ],
      ctaText: 'Try Free',
    },
    hero: {
      title: `${name} — Powered by AI`,
      subtitle: `Transform your photos in seconds with our ${name.toLowerCase()} tool. No editing skills needed.`,
      uploadHint: `Drop your image here, or click to browse\nSupports JPG, PNG, WEBP · Max 10MB`,
      ctaText: 'Process Image',
    },
    howto: [
      {
        icon: '📁',
        title: 'Upload Your Photo',
        description: `Choose any photo from your device. We support JPG, PNG, and WEBP up to 10MB.`,
      },
      {
        icon: '⚡',
        title: 'AI Processes It',
        description: `Our AI model applies the ${name.toLowerCase()} effect automatically. Usually takes ${workflow.estimatedSeconds}–${workflow.estimatedSeconds + 5} seconds.`,
      },
      {
        icon: '⬇️',
        title: 'Download Your Result',
        description: 'Preview the before/after comparison, then download your enhanced image in full quality.',
      },
    ],
    scenery: [
      {
        label: 'Portraits',
        description: `Perfect for enhancing personal portraits and profile photos with ${name.toLowerCase()} effects.`,
        imageHint: 'portrait photo',
      },
      {
        label: 'Product Photos',
        description: 'Elevate your product imagery for e-commerce listings and marketing materials.',
        imageHint: 'product photo',
      },
      {
        label: 'Social Media',
        description: 'Create eye-catching content for Instagram, Twitter, and other platforms.',
        imageHint: 'social media content',
      },
      {
        label: 'Creative Projects',
        description: 'Explore artistic possibilities for design projects, mood boards, and creative work.',
        imageHint: 'creative design',
      },
    ],
    faq: [
      {
        category: 'General',
        question: `What is ${name}?`,
        answer: `${name} is an AI-powered tool that lets you ${workflow.description.toLowerCase()}. Simply upload a photo and our AI does the rest.`,
      },
      {
        category: 'General',
        question: 'What image formats are supported?',
        answer: 'We support JPG, JPEG, PNG, and WEBP files up to 10MB in size.',
      },
      {
        category: 'General',
        question: 'How long does processing take?',
        answer: `Most images are processed in ${workflow.estimatedSeconds}–${workflow.estimatedSeconds + 10} seconds, depending on the image size and current server load.`,
      },
      {
        category: 'General',
        question: 'Is my data kept private?',
        answer: 'Yes. Uploaded images are processed securely and deleted from our servers within 24 hours. We never share your data with third parties.',
      },
      {
        category: 'General',
        question: 'Can I use the results commercially?',
        answer: 'Yes, the processed images belong to you and can be used for personal or commercial purposes.',
      },
    ],
    reviews: [
      {
        name: 'Sarah K.',
        role: 'Photographer',
        avatar: 'SK',
        text: `The ${name} tool saved me hours of editing. The results are surprisingly good for an automated tool.`,
      },
      {
        name: 'Marcus T.',
        role: 'Product Designer',
        avatar: 'MT',
        text: "I was skeptical at first, but the quality blew me away. This is now part of my regular workflow.",
      },
      {
        name: 'Lena W.',
        role: 'Social Media Manager',
        avatar: 'LW',
        text: 'Fast, clean results. Perfect for batch processing content for our clients.',
      },
    ],
    otherTools: [
      { name: 'Background Replacer', description: 'Remove and replace photo backgrounds instantly', href: '#' },
      { name: 'Super Resolution', description: 'Upscale images up to 4× without losing quality', href: '#' },
      { name: 'Portrait Retouching', description: 'Professional-grade skin and portrait enhancement', href: '#' },
    ],
    footerLinks: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  }
}
