import { runDashboardAgent } from './agents/dashboardAgent';
import { DashboardData, Script, ImageGenerationResult } from './types';
import * as fs from 'fs';
import * as path from 'path';

async function testMock() {
  console.log('🧪 Starting mock pipeline test...');

  const mockBrief = {
    topic: "AI Chatbot 200+ Conversations Daily — Bina Staff Ke",
    service: "AI Automation",
    pillar: "SHOW",
    stats: [
      "24/7 client response time down to 30 seconds - HubSpot",
      "Saves an average of 20+ hours per week on manual replies - McKinsey",
      "88% of customers expect an immediate response - Gartner"
    ],
    hooks: [
      "Kya aap bhi daily 50+ messages manually reply karte ho?",
      "AI chat bot jo bina team ke customer support handle karega",
      "Stop wasting 4 hours daily on customer DMs!"
    ],
    painPoints: [
      "Delayed replies lead to lost customers",
      "Stuck doing copy-paste replies all day",
      "No time to focus on business growth"
    ],
    psychTrigger: "Relief / Productivity Gain"
  };

  const mockScript: Script = {
    title: "AI Chatbot 200+ Conversations Daily",
    totalScenes: 6,
    scenes: [
      {
        sceneNumber: 1,
        part: 'A',
        duration: "3 sec",
        visual: "3D caricature illustration, vertical 9:16 (1080x1920px). Young Indian male caricature (enlarged expressive head — short dark hair, light goatee, big shocked eyes) with small cartoon body wearing sky-blue polo shirt and navy chinos. Pose: both hands on cheeks in shock, looking at a phone showing '47 missed calls'. Bright modern home office — white desk, green potted plant, bookshelf with colorful books. Natural daylight through large window. Bold text at top: 'Tumhare Kitne Leads Miss Ho Rahe Hain? 😱'. Red notification bubbles floating (99+ DMs, 23 missed calls). Hand-drawn exclamation marks, red warning triangles as doodles.",
        voiceover: "Har din 50+ customer messages aate hain aur reply karne mein ghanto waste hote hain...",
        overlay: "❌ Missed leads & messages daily",
        mood: "frustration",
        videoPrompt: "Starting from this image, animate the character's shocked expression with subtle head shake, notification bubbles floating upward one by one, and doodle exclamation marks popping in with bounce effect."
      },
      {
        sceneNumber: 2,
        part: 'A',
        duration: "3 sec",
        visual: "Real bright workplace photo with 2D cartoon character overlay, vertical 9:16 (1080x1920px). Young Indian male cartoon (short dark hair, goatee, stressed facepalm expression) placed in a bright but messy real desk photo — scattered papers, multiple browser tabs visible on monitor, phone buzzing. Comic-style speech bubble: 'Bhai 4 ghante roz manual reply? 😫'. Hand-drawn swirl marks around head (confusion), red ❌ marks near the mess, small lightning bolts showing stress. Warm natural lighting, bright background despite chaos.",
        voiceover: "Ek statistical fact: 40% leads sirf late reply ki wajah se lose ho jaate hain.",
        overlay: "⏰ Late reply = 40% lost leads",
        mood: "urgency",
        videoPrompt: "Starting from this image, animate the cartoon character's facepalm gesture, phone vibrating on desk, and speech bubble text appearing word-by-word with comic pop effect."
      },
      {
        sceneNumber: 3,
        part: 'A',
        duration: "3 sec",
        visual: "3D caricature illustration, vertical 9:16 (1080x1920px). Young Indian male caricature (same features — short dark hair, goatee, now with confident knowing wink) wearing slightly upgraded smart-casual shirt. Pose: pointing from left side to right side. Split-feel composition — LEFT side slightly faded/desaturated showing messy desk with red tint, RIGHT side vivid and bright showing clean organized workspace with blue/green glow. Floating comparison cards: '❌ Manual Way' (red tinted, left) vs '✅ Smart Way' (green/blue tinted, right). Lightbulb doodle above character's head, stars on the smart side. Transition from warm orange → cool blue/green.",
        voiceover: "Agar manually follow up karoge to scale kab karoge?",
        overlay: "❌ Manual → ✅ Smart Way",
        mood: "revelation",
        videoPrompt: "Starting from this image, animate the left side fading darker while the right side brightens with sparkle effects, lightbulb above head glowing on, and comparison cards sliding in from edges."
      },
      {
        sceneNumber: 4,
        part: 'B',
        duration: "3 sec",
        visual: "3D caricature illustration, vertical 9:16 (1080x1920px). Young Indian male caricature (same features, BIG confident smile, thumbs up) wearing crisp white shirt with rolled-up sleeves. Pose: standing beside a bright whiteboard, pointing with blue marker. Bright modern co-working space with large windows, plants, warm lighting. Whiteboard shows: 'AI Auto-Reply System ✅' with 3 points: '→ 30-second response ⚡', '→ 24/7 available 🕐', '→ 0 missed leads 🎯'. Green checkmarks, star sparkles around whiteboard. Robot emoji 🤖 doodle in corner. Handle '@ravi.digital.solutions' bottom-left (white, 70% opacity).",
        voiceover: "Maine isko solve karne ke liye lagaya ek Custom AI Chatbot jo 30 seconds mein reply karta hai.",
        overlay: "✅ AI chatbot: 30-sec response",
        mood: "relief",
        videoPrompt: "Starting from this image, animate the character writing on whiteboard with marker, checkmark points appearing one-by-one with green glow, and star sparkles bursting around each point."
      },
      {
        sceneNumber: 5,
        part: 'B',
        duration: "3 sec",
        visual: "3D caricature illustration, vertical 9:16 (1080x1920px). Young Indian male caricature (same features, excited proud expression, arms up in celebration) wearing smart polo. Clean minimal background — soft pastel blue-to-white gradient. Large bold stats in colorful cards: '200+ Daily Chats ✅' (blue card), '0 Missed Leads 🎯' (green card), '20+ Hours/Week Saved ⏰' (gold card). Growth chart arrow going up behind the cards. Doodles: stars, sparkles, confetti, upward arrows, trophy icon. Mood: impressive, celebratory.",
        voiceover: "Ye daily 200+ messages answer karta hai aur aapka 20+ hours/week bachata hai.",
        overlay: "📊 200+ chats daily | 24/7 active",
        mood: "proof",
        videoPrompt: "Starting from this image, animate stat cards popping in one-by-one with bounce effect, numbers counting up, confetti falling, and the growth arrow drawing itself upward."
      },
      {
        sceneNumber: 6,
        part: 'B',
        duration: "3 sec",
        visual: "3D caricature illustration, vertical 9:16 (1080x1920px). Young Indian male caricature (same features, warm friendly smile, waving at viewer) wearing clean memorable sky-blue jacket. Clean bright gradient background (soft blue → white). Minimal distractions — focus on character and CTA. Large bold text: 'DM karo \"AUTO\" 📩' (center, prominent). Handle '@ravi.digital.solutions' prominently displayed below. Subtext: 'Free Automation Audit milega! 🤖'. Doodles: pointing hand toward CTA, sparkles, DM envelope icon, small rocket. Mood: inviting, friendly.",
        voiceover: "Apne business ko auto-pilot pe daalne ke liye direct DM karo keyword 'AUTO' aur main free audit bhejunga.",
        overlay: "DM 'AUTO' for Free Audit 🤖",
        mood: "cta",
        videoPrompt: "Starting from this image, animate the character waving smoothly, 'DM AUTO' text pulsing with soft blue glow, envelope icon floating upward, and sparkles twinkling around the CTA."
      }
    ],
    caption: "Leads miss ho rahe hain? 🤦\n\nEk statistical fact: 40% leads sirf late reply ki wajah se lose ho jaate hain. Agar aap daily 4+ hours copy-paste message replies mein waste kar rahe ho, to business grow kab karoge?\n\nMaine setup kiya ek Custom AI Chatbot jo:\n✅ 30 seconds mein reply karta hai\n✅ Daily 200+ conversations automatic handle karta hai\n✅ Saves 20+ hours/week on support\n\nApna manual support system automated aur error-free banana chahte ho?\n\n↓ DM 'AUTO' right now aur main aapko ek free custom automation audit bhejunga! 🤖\n\n#AIAutomation #BusinessAutomation #AutomateYourBusiness #AIAgents #DigitalTransformation #BusinessGrowth",
    hashtags: ["#AIAutomation", "#BusinessAutomation", "#AutomateYourBusiness", "#AIAgents", "#DigitalTransformation", "#BusinessGrowth"]
  };

  const imagesDir = path.join(__dirname, '../docs/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Create mock image files (just tiny PNG placeholders)
  // Transparent 1x1 pixel PNG base64
  const mockPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const mockImages: ImageGenerationResult[] = [];

  for (let i = 1; i <= 6; i++) {
    const imgPath = path.join(imagesDir, `scene_${i}.png`);
    fs.writeFileSync(imgPath, Buffer.from(mockPngBase64, 'base64'));

    mockImages.push({
      sceneNumber: i,
      imagePath: `images/scene_${i}.png`,
      imageToVideoPrompt: `Starting from this image of Scene ${i}, create an 8-second cinematic animation. Slowly zoom in on the main subject. Maintain the premium dark-mode theme (#0A0A0A) with neon blue and purple accents. Smooth camera tracking with continuous motion. No sudden cuts.`,
      camera: i % 2 === 0 ? "Slow zoom in" : "Slight pan right",
      motion: "Character breathes naturally, screen glow flickers",
      duration: "8 seconds"
    });
  }

  const mockDashboardData: DashboardData = {
    date: "July 6, 2026",
    service: "AI Automation",
    pillar: "SHOW",
    topic: mockBrief.topic,
    script: mockScript,
    images: mockImages,
    stats: mockBrief.stats,
    painPoints: mockBrief.painPoints,
    hooks: mockBrief.hooks,
    psychTrigger: mockBrief.psychTrigger,
    history: [
      { date: "July 5, 2026", topic: "☕ Coffee Shop Menu Card Redesign — Premium Feel", service: "Graphics Design" },
      { date: "July 4, 2026", topic: "Slow Website = Lost Customers — Speed Kaise Badhayein", service: "Web Design" },
      { date: "July 3, 2026", topic: "Customer Support Automate Karo — 24/7 Bina Staff Ke", service: "AI Automation" }
    ]
  };

  const docsIndex = await runDashboardAgent(mockDashboardData);
  console.log(`✅ Mock pipeline completed! Dashboard saved to: ${docsIndex}`);
}

testMock().catch(console.error);
