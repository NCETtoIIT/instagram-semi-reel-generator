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
3. The motion of characters or environmental elements (e.g., blinking lights, screen values updating, slight facial movement like a sigh or smile).
4. Keeping the style consistent (premium cinematic lighting, dark background, smooth transition).

Your response must contain ONLY the prompt text, without any introductory or concluding remarks, explanations, or quotes. Just output the final prompt.
`;
}

export function getImagenPrompt(sceneVisual: string): string {
  return `Generate a vertical 9:16 aspect ratio image (1080x1920px). 
Scene content: ${sceneVisual}.
Visual Style Rules:
- Dark mode theme with pure dark background (#0A0A0A).
- Electric blue (#00D4FF) and purple (#7B2FFF) neon ambient accents.
- Modern 3D elements, sleek glassmorphism dashboard UI elements if screens are shown.
- Premium cinematic lighting, dramatic shadows, clean and minimal composition.
- Photorealistic or high-quality modern 3D render (avoid flat vectors or cheap cartoons).
- Vertical poster format suited for mobile screens.
`;
}
