---
name: Image Frame Generation Style Guide
description: >
  Master reference for generating video frame images in the Instagram automation pipeline.
  Defines the Hybrid-D visual style (98% real photo + cartoon overlay + 3D caricature, 2% anime),
  dynamic character design system, prompt engineering framework, and quality checklist.
  Any agent generating image prompts for video frames MUST follow this skill.
  Applies to research agent, script agent, image agent, and video agent when writing
  visual descriptions or image generation prompts for Ravi Kumar's Instagram content.
---

# 🎨 Image Frame Generation — Master Style Guide

> **This skill is the SINGLE SOURCE OF TRUTH for all image generation in the Instagram automation pipeline.**
> Any agent generating image prompts MUST reference and follow this guide.

---

## 📌 VISUAL STYLE DEFINITION

### Style Formula

```
FINAL STYLE = 98% HYBRID-D + 2% STYLE-A

HYBRID-D = Mix of:
├── STYLE-B: Real Photo + Cartoon Character Overlay
│   → Real workplace/environment photo background
│   → 2D cartoon character placed naturally in the scene
│   → Comic-style speech bubbles, doodle elements
│   → Natural lighting, bright & colorful
│
└── STYLE-C: 3D Caricature Big-Head
    → Character with enlarged head (real face features) + small cartoon body
    → Bright, well-lit modern environments
    → Whiteboards, floating info cards, props with text
    → Professional yet fun, educational layout

STYLE-A: 2D Flat Cartoon/Anime — ONLY 2% usage
    → Used ONLY for deeply emotional/nostalgic scenes
    → Maximum 1 out of every 50 frames
```

### Style Selection Logic

```
IF scene is educational/informative/tips       → USE Style-C (3D Caricature)
IF scene is workplace/office humor/relatable   → USE Style-B (Photo + Overlay)
IF scene is introduction/branding/CTA          → USE Style-C (Caricature)
IF scene is problem/frustration                → USE Style-B (Real setting + cartoon)
IF scene is solution/success                   → USE Style-C (Caricature + info boards)
IF scene is deeply emotional/nostalgic (RARE)  → USE Style-A (2D flat cartoon)
DEFAULT                                        → USE Style-C (safest for branding)
```

---

## 📌 CHARACTER DESIGN SYSTEM

### Main Character — "Ravi" (Lead Protagonist)

**CORE IDENTITY (NEVER CHANGES):**
- Young Indian male, early 20s appearance
- Short dark hair, neatly styled
- Light facial hair — short beard/goatee (signature feature)
- Medium-slim build
- Confident, approachable expression

**Face Reference File:** `my face.png` — present in both automation project roots. This file is the MASTER REFERENCE for facial features in EVERY frame.

**DYNAMIC ELEMENTS — all change per topic/theme/scene:**

| Topic/Theme | Outfit | Colors |
|-------------|--------|--------|
| AI/Tech/Automation | Smart casual — polo/button-down + jeans | Blue, Electric blue, White |
| Web Design | Hoodie + cargo pants, developer look | Purple, Grey, Black |
| Graphics/Branding | Graphic tee + jacket | Yellow, Orange, Teal |
| Business/Professional | Formal shirt + trousers | Navy, White, Light Blue |
| Motivational/Success | Blazer + casual tee | Black, Gold, White |
| Casual/Relatable | T-shirt + jeans | Any bright/vibrant |
| Festival/Cultural | Kurta/ethnic wear | Saffron, green, maroon |
| Client Meeting | Button-down + chinos | Earth tones |

**Accessories:** Dynamic per context — laptop, headphones, whiteboard marker, coffee cup, trophy, magnifying glass, design tablet, briefcase, etc.

**Expressions & Poses:**

| Scene Mood | Expression | Pose |
|------------|-----------|------|
| Hook/Problem | Surprised, confused | Scratching head, arms crossed, facepalm |
| Pain/Frustration | Stressed, overwhelmed | Hands up, messy desk interaction |
| Solution | Confident smile, wink | Pointing at board, thumbs up |
| CTA | Friendly, inviting | Waving, pointing at viewer |
| Success/Results | Excited, proud | Arms up celebration |
| Teaching | Focused, authoritative | Explaining with gestures |

### Secondary Characters
- Appear ONLY when scene requires (client, team member, confused beginner, happy customer)
- NEVER overpower the main character — Ravi is ALWAYS the focal point

---

## 📌 VISUAL ELEMENTS LIBRARY

Every frame MUST deliver information visually using these elements contextually:

### Speech Bubbles
- Cloud-shaped, white/cream background, hand-written style font
- Hinglish text, max 2-3 lines, colored accent words
- Use when character is "speaking" a key point

### Whiteboards & Flipcharts
- Hand-written style text with bullet points, color-coded
- Character standing beside, pointing or writing
- Use for listing tips, steps, statistics, comparisons

### Floating Info Cards/Badges
- Rounded rectangles with 3D shadow, icon + short text (3-5 words)
- Float around character in arc/scatter, different color per card
- Use for showing multiple related points

### Sticky Notes
- Tilted pastel squares, handwritten text, curled corners
- For fun facts, side comments, humor

### Device Screens
- Bright, clearly visible content matching topic
- Growth graphs, chat interfaces, website designs

### Decorative Doodles (3-5 per frame, MANDATORY)
- ⭐ Stars/sparkles, 💡 Lightbulbs, 🚀 Rockets, ↗️ Arrows
- ❗ Exclamation marks, 🎯 Targets, ✨ Shine effects
- 📊 Mini charts, ❌✅ Check/cross marks, 💬 Thought clouds
- Style: Hand-drawn, sketch-like, white or accent color, organic placement

### Branding (EVERY FRAME)
1. **Handle:** "@ravi.digital.solutions" — bottom-left or top-right, 70-80% opacity
2. **Character:** Main focal point, at least 40-60% of frame height
3. **Brand Color Accent** (at least one): Blue #00D4FF, Purple #7B2FFF, Green #00FF88, Orange #FF6B35, Yellow #FFD700

> For detailed element descriptions, see [references/visual_elements.md](references/visual_elements.md)

---

## 📌 BACKGROUND SELECTION

| Scene Purpose | Background | Lighting |
|---------------|-----------|----------|
| Educational/Tips | Modern bright office | Warm daylight |
| Problem/Frustration | Cluttered real workspace (still LIGHT) | Slightly warm |
| Solution/Success | Clean modern workspace | Bright, cheerful |
| Tech/AI | Modern co-working space | Cool white/blue |
| Creative/Design | Design studio, colorful | Warm, accent lights |
| Client Meeting | Conference room / café | Natural, warm |
| CTA/Branding | Gradient abstract (pastel) | Even, bright |
| Stats/Results | Minimal/clean, blurred office | Neutral, bright |
| Casual/Relatable | Home office / room | Warm, cozy |
| Festival/Cultural | Decorated space | Warm, vibrant |

### Background Rules
```
✅ DO: Light, bright, well-lit, natural daylight, pastel accents, vibrant pops
❌ DON'T: Pure black (#000000), dark moody/noir, neon-only on dark, depressing
```

---

## 📌 PROMPT ENGINEERING FRAMEWORK

### Universal Prompt Template

```
[STYLE TYPE], [ASPECT RATIO & SIZE].

CHARACTER: [Face features + dynamic outfit + expression + pose + accessories]

SCENE: [Bright environment + specific props + setting details]

INFORMATION ELEMENTS: [Speech bubbles / whiteboard / cards with EXACT Hinglish text]

DECORATIVE: [3-5 doodle elements, hand-drawn style]

BRANDING: [Handle position, brand color accents]

MOOD: [Emotional tone]

COLOR PALETTE: [3-4 BRIGHT/LIGHT dominant colors]

QUALITY: High-resolution, vivid colors, clean composition, vertical 9:16 (1080x1920px).
```

### Style-Specific Modifiers

**Style-B (Real Photo + Cartoon):**
> Prefix: "A bright, real-life photograph of a [SETTING] with a 2D cartoon character of a young Indian male naturally composited into the scene..."

**Style-C (3D Caricature):**
> Prefix: "3D caricature illustration — character with enlarged expressive head (young Indian male, short dark hair, light beard/goatee, [EXPRESSION]) and proportionally smaller cartoon body wearing [OUTFIT]..."

**Style-A (2D Flat — RARE):**
> Prefix: "2D flat cartoon illustration in warm anime-inspired style. Young Indian male character with short dark hair and light beard..."
> Use ONLY for emotional/nostalgic content. Max 1 in 50 frames.

### Face Reference Rules
1. Face photo is MASTER REFERENCE for every frame
2. Always describe: "Young Indian male, early 20s, short dark hair, light beard/goatee"
3. Style-C: Enlarged head (2-3x body proportion), real features, exaggerated expression
4. Style-B: Cartoon-styled but same recognizable features
5. 100% consistency across all frames of a video

> For complete scene-by-scene templates, see [references/scene_templates.md](references/scene_templates.md)
> For content-type specific adaptations, see [references/content_adaptations.md](references/content_adaptations.md)
> For full prompt examples, see [examples/prompt_examples.md](examples/prompt_examples.md)

---

## 📌 QUALITY CHECKLIST

Every generated image prompt MUST pass:

```
□  1. Background is LIGHT and BRIGHT (not dark/noir/black)
□  2. Main character clearly visible and recognizable
□  3. Character outfit matches topic/theme
□  4. At least ONE information element (bubble/board/card)
□  5. Info element has SPECIFIC Hinglish text
□  6. 3-5 decorative doodle elements present
□  7. Instagram handle included
□  8. Colors are VIBRANT and ATTRACTIVE
□  9. Aspect ratio is vertical 9:16 (1080x1920)
□ 10. Scene mood matches script's scene purpose
□ 11. Correct style used (B, C, or rarely A)
□ 12. Visual variety from previous scene
□ 13. Character expression matches voiceover emotion
□ 14. No technical jargon in visible text
□ 15. Clear focal point (character first, then info)
```

### Anti-Patterns (NEVER DO)

```
❌ Pure dark/black backgrounds
❌ Neon-only lighting on dark backgrounds
❌ Generic images without character
❌ Faceless/anonymous characters
❌ Boring flat icons without personality
❌ Too much text crammed in one frame
❌ Inconsistent character between frames
❌ Tech jargon visible ("API", "webhook", "n8n")
❌ Small unreadable text
❌ Generic "business person at desk" without storytelling
❌ Same background for all scenes
❌ Missing doodle elements
❌ Dark moody depressing environments
❌ Cheap clipart or flat vectors (except rare Style-A)
```

---

## 📌 KEY NUMBERS

```
Aspect Ratio:          9:16 (vertical)
Resolution:            1080 x 1920 px
Scenes per reel:       6 (3 Part A + 3 Part B)
Style ratio:           98% Hybrid-D (B+C) : 2% Style-A
Doodles per frame:     3-5
Max bubble text:       2-3 lines
Max info cards:        4-6 per frame
Face consistency:      100% across all frames
```
