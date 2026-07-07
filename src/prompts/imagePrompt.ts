export function getVideoPromptGenerationPrompt(
  sceneVisual: string,
  mood: string,
  voiceover: string
): string {
  return `You are an expert AI Video Producer. Your job is to write a highly detailed "Image-to-Video" prompt for AI video generation tools like Kling AI, Runway Gen-3, or Luma Dream Machine.

The video will start from a static reference image (which is already generated) and animate it.

INPUT DETAILS:
- Static Image Content (Reference): "${sceneVisual}"
- Scene Mood: "${mood}"
- Voiceover Context: "${voiceover}"

Write a concise, copy-paste-ready Image-to-Video prompt (1-3 sentences) detailing:
1. The starting state (referencing the image).
2. The specific motion/camera movement (e.g., slow zoom-in, pan, subtle tracking shot). Do not use rapid cuts.
3. The motion of characters or environmental elements (e.g., character gestures, doodle elements animating, info cards/speech bubbles popping in, sparkle effects).
4. Keeping the style consistent (bright colorful 3D caricature aesthetic, natural lighting, energetic mood — NO dark/noir transitions).

Your response must contain ONLY the prompt text, without any introductory or concluding remarks, explanations, or quotes. Just output the final prompt.
`;
}

export function getImagenPrompt(sceneVisual: string): string {
  return `${sceneVisual}.

Additional Style Enforcement:
- Bright, vibrant, colorful composition — NEVER dark/black backgrounds.
- 3D caricature or cartoon overlay style (enlarged expressive head, smaller body proportions).
- Young Indian male character: short dark hair, light goatee/beard, medium-slim build.
- Include 3-5 hand-drawn doodle elements (sparkles, arrows, exclamation marks, lightbulbs).
- Include at least ONE information delivery element (speech bubble, whiteboard, floating card, sticky note).
- Instagram handle '@ravi.digital.solutions' semi-transparent at bottom-left.
- Brand accent colors: Electric Blue #00D4FF, Purple #7B2FFF, Green #00FF88, Orange #FF6B35 (problems only), Yellow #FFD700.
- Vertical 9:16 format (1080x1920px), high-resolution, professional social media quality.
- Natural daylight lighting, clean minimal composition, premium feel.
`;
}
