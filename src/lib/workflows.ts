import { Workflow } from './types'

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'outfit-swap',
    name: 'Outfit Swap',
    description: 'Swap clothing or outfits on any person photo using AI',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 12,
    category: 'Fashion & Style',
  },
  {
    id: 'hairstyle-changer',
    name: 'Hairstyle Changer',
    description: 'Try different hairstyles and hair colors on any portrait',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 8,
    category: 'Beauty',
  },
  {
    id: 'photo-to-sketch',
    name: 'Photo to Sketch',
    description: 'Convert any photo into a pencil sketch or line art style',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 5,
    category: 'Art & Design',
  },
  {
    id: 'background-replacer',
    name: 'Background Replacer',
    description: 'Remove and replace backgrounds with AI-generated scenes',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 10,
    category: 'Photography',
  },
  {
    id: 'super-resolution',
    name: 'Super Resolution',
    description: 'Upscale and enhance image quality up to 4x resolution',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 15,
    category: 'Enhancement',
  },
  {
    id: 'portrait-retouching',
    name: 'Portrait Retouching',
    description: 'Professional-grade skin retouching and portrait enhancement',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 7,
    category: 'Photography',
  },
  {
    id: 'object-removal',
    name: 'Object Removal',
    description: 'Remove unwanted objects from photos with seamless inpainting',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 18,
    category: 'Editing',
  },
  {
    id: 'colorize-photo',
    name: 'Colorize Old Photos',
    description: 'Add vibrant color to black and white vintage photographs',
    inputType: 'image',
    outputType: 'image',
    estimatedSeconds: 20,
    category: 'Restoration',
  },
]

export function getWorkflowById(id: string): Workflow | undefined {
  return MOCK_WORKFLOWS.find(w => w.id === id)
}
