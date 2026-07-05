# 🎬 Implementation Plan B: Semi-Automated Reel Generator (Image + Manual Video)

> **Ye Plan A (Veo API) ka alternative hai.** Dono plans parallel chalenge — jab Plan A fully working hoga tab bhi Plan B active rahega as backup.

---

## 📌 OVERVIEW: Plan A vs Plan B

| Aspect | Plan A (Veo API — Full Auto) | Plan B (This Plan — Semi-Auto) |
|:---|:---|:---|
| **Video creation** | Veo 3 API automatically | Ravi manually (AI image-to-video tool se) |
| **Agent output** | Final .mp4 video | Images + prompts + instructions |
| **Ravi ka kaam** | Zero (fully automated) | Video create + Drive upload (~15-30 min) |
| **Quality control** | AI decides | Ravi decides (better quality possible) |
| **Cost** | Veo API charges | Free (image gen free tier) |
| **Deployment** | Local machine | **GitHub + GitHub Actions (cloud)** |
| **Dashboard** | Console logs | **Beautiful web dashboard** |
| **Status** | Build in progress | **Planning phase** |

---

## 📌 SECTION 1: SYSTEM ARCHITECTURE

### Complete Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              PLAN B: DAILY REEL CREATION PIPELINE               │
│                                                                 │
│  ⏰ 3:00 AM IST — GitHub Actions cron triggers the script      │
│                    (NO local machine needed — runs on cloud)     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🔍 AGENT 1: RESEARCH                                    │   │
│  │ ├── Gemini 3.5 Flash + Google Search grounding           │   │
│  │ ├── Finds: Trending topic, stats, hooks, pain points     │   │
│  │ └── Output: Research brief (JSON)                        │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ✍️ AGENT 2: SCRIPT WRITER                                │   │
│  │ ├── Hinglish 2-segment voiceover script                   │   │
│  │ ├── Scene-by-scene breakdown (4-6 scenes total)           │   │
│  │ ├── Each scene: visual description + dialogue             │   │
│  │ └── Output: Structured script with scene list (JSON)     │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🎨 AGENT 3: IMAGE GENERATOR + VIDEO PROMPT WRITER        │   │
│  │ ├── For EACH scene:                                       │   │
│  │ │   ├── Generate 1 high-quality image (1080×1920px, 9:16) │   │
│  │ │   ├── Write "Image-to-Video" prompt for that scene      │   │
│  │ │   └── Write motion/camera instructions                  │   │
│  │ ├── Group into 2 SETS:                                    │   │
│  │ │   ├── SET 1 (Video Part A): Scenes 1-3 (Hook+Problem)  │   │
│  │ │   └── SET 2 (Video Part B): Scenes 4-6 (Solution+CTA)  │   │
│  │ ├── Each set → 1 video clip → 8+ seconds                 │   │
│  │ └── Output: Images (PNG) + Prompts (text) + Instructions │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 📊 AGENT 4: DASHBOARD UPDATER                            │   │
│  │ ├── Collects ALL outputs from Agent 1, 2, 3              │   │
│  │ ├── Updates a beautiful HTML dashboard page               │   │
│  │ ├── Dashboard shows:                                      │   │
│  │ │   ├── Today's topic & service focus                     │   │
│  │ │   ├── Scene images (visual preview)                     │   │
│  │ │   ├── Image-to-video prompts (copy-paste ready)         │   │
│  │ │   ├── Voiceover script text                             │   │
│  │ │   ├── Instagram caption (copy-paste ready)              │   │
│  │ │   ├── Hashtags                                          │   │
│  │ │   └── Video creation instructions                       │   │
│  │ ├── Pushes dashboard to GitHub Pages (free hosting)       │   │
│  │ └── Output: Live dashboard URL                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ⏰ ~3:25 AM IST — Dashboard updated ✅                        │
│                                                                 │
│  ═══════════════════════════════════════════════════════════     │
│  RAVI KA MANUAL KAAM (anytime 5:00 AM - 2:00 PM):              │
│  ├── 1. Dashboard kholo → images + prompts dekho                │
│  ├── 2. AI image-to-video tool mein image upload karo           │
│  ├── 3. Prompt paste karo → 8+ sec video generate karo          │
│  ├── 4. Part A + Part B dono clips bana lo                      │
│  ├── 5. (Optional) merge karo ya separately upload karo         │
│  └── 6. Google Drive "Instagram Reels" folder mein upload karo  │
│  ═══════════════════════════════════════════════════════════     │
│                                                                 │
│  ⏰ 5:30 PM IST — Manus AI picks from Drive → Instagram post   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📌 SECTION 2: PROJECT STRUCTURE

```
d:\antigravity 2.0\instagram as a business\video automation plan-b\
├── .github/
│   └── workflows/
│       └── daily-reel-prep.yml       ← GitHub Actions cron job
├── src/
│   ├── index.ts                      ← Main orchestrator
│   ├── config.ts                     ← Environment config loader
│   ├── agents/
│   │   ├── researchAgent.ts          ← Agent 1: Gemini + Search
│   │   ├── scriptAgent.ts            ← Agent 2: Hinglish script
│   │   ├── imageAgent.ts             ← Agent 3: Image gen + video prompts
│   │   └── dashboardAgent.ts         ← Agent 4: HTML dashboard builder
│   ├── prompts/
│   │   ├── researchPrompt.ts         ← Research prompt templates
│   │   ├── scriptPrompt.ts           ← Script prompt templates
│   │   └── imagePrompt.ts            ← Image generation prompts
│   ├── templates/
│   │   └── dashboard.html            ← Dashboard HTML template
│   ├── types/
│   │   └── index.ts                  ← TypeScript interfaces
│   └── utils/
│       └── dayHelper.ts              ← Day → service mapping
├── docs/                             ← GitHub Pages dashboard output
│   ├── index.html                    ← Live dashboard (auto-updated daily)
│   └── images/                       ← Today's generated scene images
│       ├── scene_1.png
│       ├── scene_2.png
│       ├── scene_3.png
│       └── ...
├── data/
│   └── history.json                  ← Last 30 days topic log (uniqueness check)
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

---

## 📌 SECTION 3: AGENT DEEP DIVES

### 🔍 Agent 1: Research Agent (`researchAgent.ts`)

```
SAME AS PLAN A — no changes.

PURPOSE: Aaj ke service focus ke liye trending topic + stats research karna.
TECH: Gemini 3.5 Flash + Google Search grounding
INPUT: Day of week → service mapping
OUTPUT: ResearchBrief JSON (topic, stats, hooks, painPoints, psychTrigger)
```

### ✍️ Agent 2: Script Writer (`scriptAgent.ts`)

```
CHANGE: Ab sirf 2-segment script nahi — SCENE-BY-SCENE breakdown hoga.

PURPOSE: Research se Hinglish video script banana — scene-by-scene.

INPUT: ResearchBrief from Agent 1

OUTPUT (JSON):
{
  "title": "AI Chatbot 200+ Conversations Handle Karta Hai",
  "totalScenes": 6,
  "videoPartA": {
    "label": "HOOK + PROBLEM (8-10 seconds)",
    "scenes": [
      {
        "sceneNumber": 1,
        "duration": "3 seconds",
        "visualDescription": "Dark office, frustrated business owner 
          staring at phone with 47 unread message notifications. 
          Orange warning tint. Stressed expression. Papers scattered 
          on desk. Close-up shot of phone screen showing missed leads.",
        "voiceoverText": "Har din 50+ customer messages aate hain...",
        "textOverlay": "❌ 50+ messages daily — koi reply nahi",
        "mood": "frustration/problem"
      },
      {
        "sceneNumber": 2,
        "duration": "3 seconds",
        "visualDescription": "Split screen — left side shows clock 
          spinning fast (time wasting), right side shows lead count 
          dropping. Red downward arrows. Dark background with orange 
          accents.",
        "voiceoverText": "4 ghante lagte hain manually reply karne mein...",
        "textOverlay": "⏰ 4 hours daily wasted",
        "mood": "pain/urgency"
      },
      {
        "sceneNumber": 3,
        "duration": "3 seconds",
        "visualDescription": "Sad business owner looking at competitor's 
          thriving Instagram with lots of engagement. Comparison shot. 
          Dark moody lighting.",
        "voiceoverText": "Aur tab tak lead kisi aur ke paas chala jaata hai",
        "textOverlay": "❌ 40% leads MISSED",
        "mood": "loss/fomo"
      }
    ]
  },
  "videoPartB": {
    "label": "SOLUTION + CTA (8-10 seconds)",
    "scenes": [
      {
        "sceneNumber": 4,
        "duration": "3 seconds",
        "visualDescription": "Same office but now glowing with electric 
          blue #00D4FF neon. Clean desk. Modern dashboard on screen 
          showing 'All 50 leads auto-replied ✅'. Happy business owner 
          smiling. Premium tech aesthetic.",
        "voiceoverText": "Ab AI chatbot 30 seconds mein har lead ko reply karta hai",
        "textOverlay": "✅ 30 sec auto-reply",
        "mood": "solution/relief"
      },
      {
        "sceneNumber": 5,
        "duration": "3 seconds",
        "visualDescription": "Dashboard zoomed in showing real-time stats: 
          200+ conversations, 0 missed leads, 24/7 active status. 
          Green success colors #00FF88. Numbers animating upward.",
        "voiceoverText": "200+ conversations daily, zero missed leads",
        "textOverlay": "📊 200+ daily | 0 missed | 24/7",
        "mood": "proof/results"
      },
      {
        "sceneNumber": 6,
        "duration": "3 seconds",
        "visualDescription": "Ravi Kumar (or professional avatar) facing 
          camera. Clean dark background. Electric blue accent lights. 
          @ravi.digital.solutions handle visible. Professional, 
          confident pose. CTA text prominent on screen.",
        "voiceoverText": "Apna business automate karo — DM karo AUTO",
        "textOverlay": "DM 'AUTO' → Free Audit 🤖",
        "mood": "cta/confidence"
      }
    ]
  },
  "caption": "Har din 50+ leads miss ho rahe hain? 🤦\n\n...(full caption)...",
  "hashtags": ["#AIAutomation", "#BusinessAutomation", ...]
}
```

### 🎨 Agent 3: Image Generator + Video Prompt Writer (`imageAgent.ts`)

```
PURPOSE: Har scene ke liye:
  1. Ek high-quality image generate karo (9:16, 1080×1920px)
  2. Us image ke liye "image-to-video" prompt likho
  3. Motion/camera instructions likho

TECH: Gemini Imagen 3 API (image generation) via @google/genai SDK

INPUT: Scene list from Agent 2 (6 scenes)

PROCESS:

FOR EACH SCENE (1 to 6):
├── Step 1: IMAGE GENERATION
│   ├── Call Gemini Imagen 3 API
│   ├── Prompt: Scene ka visualDescription + brand style rules
│   │   Example prompt:
│   │   "Generate a vertical 9:16 image (1080x1920px). 
│   │    Dark office scene, frustrated Indian business owner 
│   │    staring at phone with 47 unread notifications. 
│   │    Orange warning tint #FF6B35. Stressed expression. 
│   │    Papers scattered. Premium cinematic lighting. 
│   │    Dark background #0A0A0A. Professional quality. 
│   │    Photorealistic, high detail, dramatic lighting."
│   ├── Save: docs/images/scene_1.png
│   └── Size: 1080×1920px (vertical for Reels)
│
├── Step 2: IMAGE-TO-VIDEO PROMPT
│   ├── Write a prompt specifically for AI image-to-video tools
│   │   (like Runway Gen-3, Kling, Pika, Hailuo, LumaLabs)
│   │   
│   │   Example output:
│   │   ┌────────────────────────────────────────────────┐
│   │   │ 🎬 IMAGE-TO-VIDEO PROMPT (Scene 1):           │
│   │   │                                                │
│   │   │ "Starting from this image, create an 8-second  │
│   │   │  cinematic video. The business owner slowly    │
│   │   │  looks down at the phone, the notification     │
│   │   │  count increases from 47 to 52. Camera slowly  │
│   │   │  zooms in on the phone screen. Papers on desk  │
│   │   │  shift slightly. Orange ambient light flickers  │
│   │   │  subtly. Maintain dark moody atmosphere.       │
│   │   │  No camera cuts. Smooth continuous motion."    │
│   │   └────────────────────────────────────────────────┘
│   │
│   └── This prompt is COPY-PASTE ready for any video tool
│
└── Step 3: MOTION INSTRUCTIONS
    ├── Camera movement: "Slow zoom in" / "Pan left to right" / "Static"
    ├── Character motion: "Head turns slowly" / "Typing on keyboard"
    ├── Element animation: "Numbers count up" / "Notification pop"
    └── Timing: "First 3 sec: zoom, Last 5 sec: hold"

OUTPUT (for each scene):
{
  "sceneNumber": 1,
  "imagePath": "docs/images/scene_1.png",
  "imageToVideoPrompt": "Starting from this image, create an 8-second...",
  "cameraInstruction": "Slow zoom in on phone screen",
  "characterMotion": "Business owner slowly looks down, stressed sigh",
  "duration": "8 seconds",
  "mood": "frustration/problem",
  "videoToolTip": "Best results: Runway Gen-3 ya Kling AI mein upload karo"
}

GROUPING:
├── SET 1 (for Video Part A — 8+ sec):
│   ├── Scene 1 image + prompt
│   ├── Scene 2 image + prompt  
│   └── Scene 3 image + prompt
│   └── INSTRUCTION: "In 3 images ko ek-ek karke video tool mein 
│       dalo. Har ek se 3-4 sec ka clip generate karo. Phir teeno 
│       clips ko merge karo = Part A (~8-10 sec)"
│
└── SET 2 (for Video Part B — 8+ sec):
    ├── Scene 4 image + prompt
    ├── Scene 5 image + prompt
    └── Scene 6 image + prompt
    └── INSTRUCTION: "Same process — 3 clips merge = Part B (~8-10 sec).
        Part A + Part B merge karo = Final Reel (16-20 sec)"
```

### 📊 Agent 4: Dashboard Updater (`dashboardAgent.ts`)

```
PURPOSE: Sab data collect karke ek beautiful HTML dashboard page 
         mein organize karna. GitHub Pages pe host hoga — Ravi 
         phone/laptop se kahi se bhi access kar sake.

TECH: HTML/CSS generation → Save to docs/index.html → Git push → 
      GitHub Pages automatically update ho jayega

INPUT: All outputs from Agent 1, 2, 3

DASHBOARD SECTIONS:

┌─────────────────────────────────────────────────────────────┐
│  📊 RAVI'S DAILY REEL DASHBOARD                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                             │
│  📅 Date: July 6, 2026 (Sunday)                             │
│  🎯 Service: AI Automation | Pillar: CONNECT                │
│  🎬 Format: REEL (9:16 vertical)                            │
│  ⏰ Last Updated: 3:22 AM IST                               │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  📝 TODAY'S TOPIC                                           │
│  "AI Chatbot 200+ Conversations Daily Handle Karta Hai"     │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  🎬 VIDEO PART A: HOOK + PROBLEM (8-10 sec)                 │
│                                                             │
│  ┌──────────┐  Scene 1 (3 sec)                              │
│  │  IMAGE   │  📋 Image-to-Video Prompt: [COPY BUTTON]      │
│  │ scene_1  │  "Starting from this image, create 8-sec..."  │
│  │  .png    │  🎥 Camera: Slow zoom in                      │
│  └──────────┘  👤 Motion: Owner looks at phone              │
│                                                             │
│  ┌──────────┐  Scene 2 (3 sec)                              │
│  │  IMAGE   │  📋 Image-to-Video Prompt: [COPY BUTTON]      │
│  │ scene_2  │  "From this frame, animate the clock..."      │
│  │  .png    │  🎥 Camera: Static wide shot                  │
│  └──────────┘  👤 Motion: Clock spinning, numbers drop      │
│                                                             │
│  ┌──────────┐  Scene 3 (3 sec)                              │
│  │  IMAGE   │  📋 Image-to-Video Prompt: [COPY BUTTON]      │
│  │ scene_3  │  "Animate comparison, left side fades..."     │
│  │  .png    │  🎥 Camera: Slight pan right                  │
│  └──────────┘  👤 Motion: Sad expression                    │
│                                                             │
│  ⚡ PART A INSTRUCTIONS:                                    │
│  "Scene 1,2,3 images ko ek-ek karke video tool mein dalo.  │
│   Har ek se 3 sec clip generate karo. Teeno merge karo.     │
│   Total Part A = ~9 seconds."                               │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  🎬 VIDEO PART B: SOLUTION + CTA (8-10 sec)                 │
│                                                             │
│  ┌──────────┐  Scene 4 (3 sec)                              │
│  │  IMAGE   │  📋 Image-to-Video Prompt: [COPY BUTTON]      │
│  │ scene_4  │  "Transform scene to success mode..."          │
│  └──────────┘                                               │
│                                                             │
│  ... (Scene 5, Scene 6 same format)                         │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  🗣️ VOICEOVER SCRIPT                                       │
│  [COPY BUTTON]                                              │
│  "Har din 50+ customer messages aate hain aur main..."      │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  📝 INSTAGRAM CAPTION                                       │
│  [COPY BUTTON]                                              │
│  "Har din 50+ leads miss ho rahe hain? 🤦..."              │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  #️⃣ HASHTAGS                                               │
│  [COPY BUTTON]                                              │
│  #AIAutomation #BusinessAutomation ...                      │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  📊 STATS USED TODAY                                        │
│  • 88% enterprises use AI — Source: Gartner                 │
│  • 30 sec response time — Source: McKinsey                  │
│  • 40% leads missed without automation — Source: HubSpot    │
│                                                             │
│  ────────────────────────────────────────────────────────    │
│  📅 LAST 7 DAYS HISTORY                                     │
│  Jul 5 (Sat) — Graphics: Dental Clinic Branding ✅          │
│  Jul 4 (Fri) — Automation: Response Time Case Study ✅      │
│  Jul 3 (Thu) — Web: Mobile-First Website Tips ✅            │
│  ...                                                        │
└─────────────────────────────────────────────────────────────┘

DASHBOARD DESIGN:
├── Dark mode (#0A0A0A background)
├── Electric blue (#00D4FF) accents
├── Card-based layout (glassmorphism cards)
├── COPY BUTTONS on every text block (one-click copy)
├── Image previews inline
├── Mobile responsive (Ravi phone se bhi dekh sake)
├── Hosted on GitHub Pages — free, always accessible
└── URL: https://[github-username].github.io/reel-generator/
```

---

## 📌 SECTION 4: GITHUB DEPLOYMENT (No Local Machine Dependency)

### Why GitHub?

```
PROBLEM: Antigravity 2.0 se agent banaya → locally run hota hai 
         → desktop ON rakhna padta hai → internet ON rakhna padta hai
         → agar raat ko PC band kia to agent nahi chalega

SOLUTION: Code ko GitHub pe push karo → GitHub Actions cron job 
          set karo → GitHub ke servers pe daily 3:00 AM IST pe 
          automatically chalegi → tera PC band bhi ho to koi farak nahi
```

### GitHub Repository Setup

```
STEP 1: GitHub pe new repo create karo
├── Repo name: "instagram-reel-generator"
├── Visibility: Private (API keys sensitive hain)
└── README: Add

STEP 2: Local code push karo
├── cd "d:\antigravity 2.0\instagram as a business\video automation plan-b"
├── git init
├── git add .
├── git commit -m "Initial reel generator setup"
├── git remote add origin https://github.com/[username]/instagram-reel-generator.git
└── git push -u origin main

STEP 3: GitHub Secrets mein API keys dalo
├── Repo → Settings → Secrets and variables → Actions
├── Add these secrets:
│   ├── GEMINI_API_KEY → tera Gemini API key
│   ├── GOOGLE_PROJECT_ID → GCP project ID
│   ├── GOOGLE_APPLICATION_CREDENTIALS_JSON → service account key 
│   │   (poori JSON file ka content paste karo)
│   └── GOOGLE_DRIVE_FOLDER_ID → Drive folder ID
└── Secrets encrypted hain — koi dekh nahi sakta
```

### GitHub Actions Workflow (`.github/workflows/daily-reel-prep.yml`)

```yaml
name: 🎬 Daily Reel Preparation

# Trigger: Daily at 3:00 AM IST (= 9:30 PM UTC previous day)
on:
  schedule:
    - cron: '30 21 * * *'  # 21:30 UTC = 3:00 AM IST
  workflow_dispatch:  # Manual trigger bhi kar sakte ho

jobs:
  generate-reel-content:
    runs-on: ubuntu-latest
    
    steps:
      # Step 1: Code checkout
      - uses: actions/checkout@v4
      
      # Step 2: Node.js setup
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      # Step 3: Install dependencies
      - run: npm install
      
      # Step 4: Create .env from secrets
      - run: |
          echo "GEMINI_API_KEY=${{ secrets.GEMINI_API_KEY }}" >> .env
          echo "GOOGLE_PROJECT_ID=${{ secrets.GOOGLE_PROJECT_ID }}" >> .env
          echo "GOOGLE_LOCATION=us-central1" >> .env
          echo "GOOGLE_DRIVE_FOLDER_ID=${{ secrets.GOOGLE_DRIVE_FOLDER_ID }}" >> .env
          echo '${{ secrets.GOOGLE_APPLICATION_CREDENTIALS_JSON }}' > service-account-key.json
          echo "GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json" >> .env
      
      # Step 5: Run the generator
      - run: npm start
      
      # Step 6: Push updated dashboard to GitHub Pages
      - run: |
          git config user.name "Reel Bot"
          git config user.email "bot@reel-generator.com"
          git add docs/ data/
          git commit -m "📊 Dashboard updated: $(date +%Y-%m-%d)" || true
          git push
```

### GitHub Pages Setup (Dashboard Hosting)

```
STEP 1: Repo → Settings → Pages
STEP 2: Source: "Deploy from a branch"
STEP 3: Branch: main | Folder: /docs
STEP 4: Save

RESULT: Dashboard live at:
https://[username].github.io/instagram-reel-generator/

Har raat 3 AM pe GitHub Actions chalegi → docs/index.html update hoga 
→ GitHub Pages automatically naya dashboard show karega
→ Ravi subah uthke phone pe URL khol ke sab dekh sakta hai
```

---

## 📌 SECTION 5: RAVI KA DAILY MANUAL WORKFLOW

```
⏰ SUBAH UTHKE (7:00 AM - 2:00 PM, anytime):

Step 1: DASHBOARD KHOLO
├── Phone ya laptop pe URL kholo:
│   https://[username].github.io/instagram-reel-generator/
├── Aaj ka topic, images, prompts sab dikhega
└── Time: 1 minute

Step 2: VIDEO PART A BANAO
├── Scene 1 image download karo (ya dashboard se directly copy)
├── AI image-to-video tool kholo (Kling / Runway / Hailuo / Pika)
├── Image upload karo
├── Dashboard se "Image-to-Video Prompt" COPY karo → Paste karo
├── Generate karo → 8 sec clip download karo
├── Scene 2 aur 3 ke liye same repeat karo
├── (Optional) 3 clips ko CapCut/VN se merge karo = Part A
└── Time: ~10 minutes

Step 3: VIDEO PART B BANAO
├── Scene 4, 5, 6 ke liye same process
├── Part B clips merge karo
└── Time: ~10 minutes

Step 4: FINAL MERGE + VOICEOVER
├── Part A + Part B merge karo (CapCut/VN mein)
├── Voiceover add karo:
│   ├── Option 1: Khud record karo (dashboard se script copy karo)
│   ├── Option 2: AI TTS tool use karo (ElevenLabs free tier)
│   └── Option 3: Background music ke saath text overlay rakho
├── Export karo: 1080×1920px, .mp4
└── Time: ~5-10 minutes

Step 5: GOOGLE DRIVE PE UPLOAD
├── Google Drive app ya website kholo
├── "Instagram Reels" folder mein video upload karo
├── Caption.txt bhi upload karo (dashboard se copy karke)
└── Time: 2 minutes

TOTAL TIME: ~25-35 minutes

Step 6: RELAX 😎
├── 5:30 PM IST pe Manus AI Drive se pick karega
└── Instagram pe automatically post ho jayega
```

---

## 📌 SECTION 6: RECOMMENDED IMAGE-TO-VIDEO TOOLS (Free)

| Tool | Free Tier | Quality | Best For |
|:---|:---|:---|:---|
| **Kling AI** | 66 credits/day (5 videos) | ⭐⭐⭐⭐ | Best free quality |
| **Hailuo AI (MiniMax)** | 3 free videos/day | ⭐⭐⭐⭐ | Smooth motion |
| **Runway Gen-3** | 125 credits (limited) | ⭐⭐⭐⭐⭐ | Premium quality |
| **Pika** | 150 credits/month | ⭐⭐⭐ | Quick generation |
| **LumaLabs Dream Machine** | 5 free/day | ⭐⭐⭐⭐ | Cinematic look |

> [!TIP]
> **Recommended:** Kling AI use karo — 66 credits/day free = 5+ videos daily. Quality bhi acchi hai. Humare 6 scenes ke liye 6 videos = enough.

---

## 📌 SECTION 7: REQUIREMENTS CHECKLIST

| # | Requirement | For What | How to Get | Status |
|:---|:---|:---|:---|:---|
| 1 | **GitHub Account** | Code hosting + Actions + Pages | github.com pe sign up | ⬜ |
| 2 | **Gemini API Key** | Research + Script agents | aistudio.google.com/apikey | ⬜ |
| 3 | **Google Cloud Project** | Image generation (Imagen 3) | console.cloud.google.com | ⬜ |
| 4 | **Service Account Key** | API authentication | GCP Console → IAM | ⬜ |
| 5 | **Google Drive Folder** | Video upload destination | drive.google.com | ⬜ |
| 6 | **Node.js 18+** | Script runtime | nodejs.org | ✅ |
| 7 | **Image-to-Video Tool** | Manual video creation | Kling AI / Runway / Hailuo | ⬜ |
| 8 | **Video Editor (optional)** | Merge clips + voiceover | CapCut (free) / VN editor | ⬜ |
| 9 | **about-me-and-business.md** | Brand knowledge base | Already created | ✅ |

> [!IMPORTANT]
> **GCS Bucket NOT needed** in Plan B — because hum video generate nahi kar rahe (sirf images). Images directly code mein save hoti hain aur dashboard mein embed ho jaati hain.

---

## 📌 SECTION 8: COST ANALYSIS

| Service | Cost | Notes |
|:---|:---|:---|
| **Gemini 3.5 Flash** | Free | 1500 req/day free — hum 10-15 use karenge |
| **Imagen 3 (image gen)** | Free tier available | Limited free images/day |
| **GitHub Actions** | Free | 2000 min/month free — hum ~5 min/day use karenge |
| **GitHub Pages** | Free | Dashboard hosting free |
| **Kling AI** | Free | 66 credits/day |
| **CapCut** | Free | Video editing free |
| **Google Drive** | Free | 15 GB free |
| **TOTAL** | **$0/month** | Poora system FREE chal sakta hai! |

---

## 📌 SECTION 9: EXECUTION ORDER

```
PHASE 1: SETUP (One-time, ~1 hour)
[ ] 1. GitHub repo create karo (private)
[ ] 2. Gemini API key generate karo
[ ] 3. GCP project create karo + Imagen API enable karo
[ ] 4. Service Account + key download karo
[ ] 5. Google Drive folder banao + share karo
[ ] 6. Kling AI pe account banao (image-to-video ke liye)
[ ] 7. CapCut download karo (video merge ke liye)

PHASE 2: BUILD (Code creation)
[ ] 8. Project initialize (package.json + tsconfig)
[ ] 9. Config + Types + Utils build karo
[ ] 10. Prompts build karo (research + script + image)
[ ] 11. Agent 1: researchAgent.ts build karo
[ ] 12. Agent 2: scriptAgent.ts build karo
[ ] 13. Agent 3: imageAgent.ts build karo
[ ] 14. Agent 4: dashboardAgent.ts + dashboard.html template
[ ] 15. index.ts orchestrator build karo

PHASE 3: TEST
[ ] 16. npm run build (compile check)
[ ] 17. npm run dev (dry run)
[ ] 18. npm start (full run)
[ ] 19. Dashboard check karo — images + prompts sahi hain?

PHASE 4: DEPLOY
[ ] 20. GitHub pe push karo
[ ] 21. GitHub Secrets mein API keys dalo
[ ] 22. GitHub Actions workflow test karo (manual trigger)
[ ] 23. GitHub Pages enable karo → Dashboard URL verify karo
[ ] 24. Cron job active karo (daily 3:00 AM IST)

PHASE 5: DAILY USE
[ ] 25. Subah dashboard kholo → images + prompts dekho
[ ] 26. Kling AI se videos banao → merge karo → Drive pe upload
[ ] 27. 5:30 PM pe Manus AI Instagram pe post karega
```
