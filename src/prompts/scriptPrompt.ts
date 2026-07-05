import { ResearchBrief } from '../types';

export function getScriptPrompt(brief: ResearchBrief, aboutMeText: string): string {
  return `You are a professional Script Writer for "Ravi Kumar".
Ravi is a solo digital creator helping businesses grow using AI Automation, Web Design, and Premium Branding.

Here is Ravi's Brand Identity and Voice Profile:
${aboutMeText}

Use this Research Brief to write a 6-scene, 2-segment Instagram Reel script:
---
RESEARCH BRIEF:
${JSON.stringify(brief, null, 2)}
---

### SCRIPT REQUIREMENTS:
1. **Total Scenes:** Exactly 6 scenes (approx. 3 seconds each).
2. **Video Part A (Hook + Problem):** Scenes 1, 2, and 3.
3. **Video Part B (Solution + CTA):** Scenes 4, 5, and 6.
4. **Visual Style Rules (Must enforce for each scene's visual description):**
   - **Background:** Dark mode (#0A0A0A near black or #1A1A2E dark navy).
   - **Primary Accent:** Electric Blue #00D4FF (highlights, CTAs, success elements).
   - **Secondary Accent:** Purple #7B2FFF (gradients, glows, decorative).
   - **Style:** 3D rendered premium tech aesthetic (isometric icons, glowing devices, clean minimal composition with 1 focal point). No generic stock photos, clipart, or cheap cartoons.
   
5. **Scene-by-Scene Visual Flow (Follow this structure strictly for the visual prompts):**
   - **Scene 1 (PROBLEM scene - Hook):** Dark room, orange tint (#FF6B35), stressed business owner, cluttered desk, phone notifications overflowing, red warning icons, dimly lit.
   - **Scene 2 (PAIN scene):** Dark room, orange tint (#FF6B35), clock spinning rapidly, leads dropping or warning lights, red down arrows, high anxiety.
   - **Scene 3 (TRANSITION scene):** Split screen contrast or transition, dull old manual way (orange tint) vs premium automated way (electric blue/green glow), competitor looking happy, growing graph.
   - **Scene 4 (SOLUTION scene):** Clean room, electric blue neon glow (#00D4FF), organized dashboard on a glowing screen, smiling owner, bright professional lighting.
   - **Scene 5 (PROOF/STATS scene):** Big bold numbers in green (#00FF88) glowing center screen on dark background, minimal text showing growth/savings (e.g. "37 hrs/week saved" or "0 missed messages").
   - **Scene 6 (CTA scene):** Ravi's face/avatar, clean dark background, electric blue accents, "@ravi.digital.solutions" visible, with "DM 'AUTO' 🤖" text prominent.

6. **Voiceover Dialogue:** Written in natural, conversational Hinglish (Hindi written in Roman script mixed with English words).
   - Use first-person perspective ("Main", "Maine", "Mera").
   - NEVER use corporate or technical jargon (do NOT say: "n8n", "API", "webhook", "React", "Next.js", "database", "workflow").
   - HAMESHA benefits/results bolna (time saved, money, leads, auto-replies).
   - NEVER say "Sir", "Madam", "We", "Our", or mention exact prices or phone numbers.
7. **Text Overlay:** Clear, short overlay text on the screen for each scene (max 5-6 words).
8. **Kling/Runway Video Prompt:** For EACH scene, generate a copy-paste ready video generation prompt in the \`videoPrompt\` field. The prompt must start with "Starting from this image..." or "Animate this static image..." and describe the camera motion (e.g. slow zoom, pan) and subject movement (typing, screen elements glowing) keeping it under 40-50 words. Ensure it maintains a premium tech aesthetic.
9. **Instagram Caption & Hashtags:** A compelling caption in Hinglish explaining the value proposition, listing key statistics, and ending with a DM CTA. Provide 5-8 relevant hashtags.

Return your response in STRICT JSON format. Do not wrap it in anything other than markdown code block. The JSON must exactly match this TypeScript interface:

interface Scene {
  sceneNumber: number;
  part: 'A' | 'B';
  duration: string;
  visual: string;
  voiceover: string;
  overlay: string;
  mood: string;
  videoPrompt: string;
}

interface Script {
  title: string;
  totalScenes: number;
  scenes: Scene[];
  caption: string;
  hashtags: string[];
}
`;
}
