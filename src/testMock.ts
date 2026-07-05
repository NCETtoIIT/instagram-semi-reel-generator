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
        visual: "Stressed business owner looking at screen with 50 unread notifications, dark office environment with warm warning light, cinematic shot, 9:16",
        voiceover: "Har din 50+ customer messages aate hain aur reply karne mein ghanto waste hote hain...",
        overlay: "❌ Missed leads & messages daily",
        mood: "frustration"
      },
      {
        sceneNumber: 2,
        part: 'A',
        duration: "3 sec",
        visual: "Split screen: left side shows a clock spinning fast, right side shows a customer drop down chart, dark theme with red warning accents, 9:16",
        voiceover: "Ek statistical fact: 40% leads sirf late reply ki wajah se lose ho jaate hain.",
        overlay: "⏰ Late reply = 40% lost leads",
        mood: "urgency"
      },
      {
        sceneNumber: 3,
        part: 'A',
        duration: "3 sec",
        visual: "Stressed business owner walking away from desk, dark office atmosphere, blue and red accent lights, 9:16",
        voiceover: "Agar manually follow up karoge to scale kab karoge?",
        overlay: "❌ Manual reply is expensive",
        mood: "frustration"
      },
      {
        sceneNumber: 4,
        part: 'B',
        duration: "3 sec",
        visual: "Same business owner looking relaxed, smiling at a clean desk, glowing neon blue chatbot dashboard on the screen, 9:16",
        voiceover: "Maine isko solve karne ke liye lagaya ek Custom AI Chatbot jo 30 seconds mein reply karta hai.",
        overlay: "✅ AI chatbot: 30-sec response",
        mood: "relief"
      },
      {
        sceneNumber: 5,
        part: 'B',
        duration: "3 sec",
        visual: "Close up of a sleek, premium dark interface showing dashboard metrics: '200+ chats resolved, 0 missed', glowing electric blue neon, 9:16",
        voiceover: "Ye daily 200+ messages answer karta hai aur aapka 20+ hours/week bachata hai.",
        overlay: "📊 200+ chats daily | 24/7 active",
        mood: "proof"
      },
      {
        sceneNumber: 6,
        part: 'B',
        duration: "3 sec",
        visual: "Ravi Kumar personal brand visual, confident pose facing camera, dark background with blue and purple neon rim lights, CTA overlay 'DM AUTO', 9:16",
        voiceover: "Apne business ko auto-pilot pe daalne ke liye direct DM karo keyword 'AUTO' aur main free audit bhejunga.",
        overlay: "DM 'AUTO' for Free Audit 🤖",
        mood: "cta"
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
