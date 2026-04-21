import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildDefaultContent } from '@/lib/defaultContent'
import { Workflow, PageContent } from '@/lib/types'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { workflow, stylePackId, chatPrompt, figmaUrl } = await req.json() as {
      workflow: Workflow
      stylePackId: string
      chatPrompt?: string
      figmaUrl?: string
    }

    if (!workflow) {
      return NextResponse.json({ error: 'workflow is required' }, { status: 400 })
    }

    const defaultContent = buildDefaultContent(workflow)

    if (!process.env.ANTHROPIC_API_KEY) {
      // No API key — return the default content immediately
      return NextResponse.json({ content: defaultContent })
    }

    const systemPrompt = `You are a professional copywriter specializing in AI tool landing pages.
You will generate page content for a web tool page.
Always respond with a single valid JSON object matching the PageContent schema — no markdown, no explanation, no code fences.
The content must be professional, concise, and focused on user value.`

    const figmaContext = figmaUrl
      ? `\nThe user has provided a Figma design file for reference: ${figmaUrl}\nPlease generate content that would complement a design with this Figma file — infer brand tone, naming style, and product focus from the URL path if possible.`
      : ''

    const userPrompt = (chatPrompt || figmaUrl)
      ? `Generate page content for an AI tool called "${workflow.name}".
Tool description: ${workflow.description}
Category: ${workflow.category}
Processing time: ~${workflow.estimatedSeconds} seconds
Visual style: ${stylePackId}${figmaContext}${chatPrompt ? `\nAdditional requirements from the user: ${chatPrompt}` : ''}

Return a JSON object with these exact keys:
- nav: { logo, links: [{label, href}], ctaText }
- hero: { title, subtitle, uploadHint, ctaText }
- howto: [{icon (emoji), title, description}] (exactly 3 steps)
- scenery: [{label, description, imageHint}] (4 use cases)
- faq: [{category, question, answer}] (5 items)
- reviews: [{name, role, avatar (2-letter initials), text}] (3 items)
- otherTools: [{name, description, href: "#"}] (3 items)
- footerLinks: [{label, href: "#"}] (4 items)

Keep copy concise, benefit-focused, and professional.`
      : null

    if (!userPrompt) {
      return NextResponse.json({ content: defaultContent })
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const content: PageContent = JSON.parse(raw)
    return NextResponse.json({ content })
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
