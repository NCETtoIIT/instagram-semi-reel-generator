import { getTodayISTDetails } from './utils/dayHelper';
import { runResearchAgent } from './agents/researchAgent';
import { runScriptAgent } from './agents/scriptAgent';
import { runImageAgent } from './agents/imageAgent';
import { runDashboardAgent } from './agents/dashboardAgent';
import { ContentCalendarEntry, DashboardData } from './types';
import { config } from './config';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('==================================================');
  console.log('🎬 INSTAGRAM REEL PREP PIPELINE STARTING');
  console.log(`Time (Local): ${new Date().toISOString()}`);
  console.log('==================================================');

  try {
    // 1. Get today's IST day details
    const todayDetails = getTodayISTDetails();
    console.log(`IST Date: ${todayDetails.formattedDate}`);
    console.log(`IST Day: ${todayDetails.dayOfWeek}`);
    console.log(`Focus Service: ${todayDetails.service} (${todayDetails.pillar})`);

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const calendarPath = path.join(dataDir, 'content-calendar.json');
    const historyPath = path.join(dataDir, 'history.json');

    if (!fs.existsSync(calendarPath)) {
      throw new Error(`Content calendar not found at ${calendarPath}`);
    }

    // Load calendar and history
    const calendar: ContentCalendarEntry[] = JSON.parse(fs.readFileSync(calendarPath, 'utf8'));
    const history: { date: string; topic: string; service: string }[] = fs.existsSync(historyPath)
      ? JSON.parse(fs.readFileSync(historyPath, 'utf8'))
      : [];

    console.log(`Loaded calendar: ${calendar.length} topics. Loaded history: ${history.length} posts.`);

    // 2. Select today's topic from calendar matching day of week and not in history
    const usedTopics = new Set(history.map((h) => h.topic));
    let todayEntry = calendar.find(
      (entry) => entry.dayOfWeek === todayDetails.dayOfWeek && !usedTopics.has(entry.topic)
    );

    // Fallback if all topics for this weekday are exhausted
    if (!todayEntry) {
      console.warn(`[Orchestrator] All topics for ${todayDetails.dayOfWeek} have been used. Re-using first topic.`);
      todayEntry = calendar.find((entry) => entry.dayOfWeek === todayDetails.dayOfWeek);
    }

    if (!todayEntry) {
      throw new Error(`No topic entry found in content-calendar.json for ${todayDetails.dayOfWeek}`);
    }

    console.log(`Selected Topic: "${todayEntry.topic}" (Calendar Day ${todayEntry.dayNumber})`);

    // 3. Agent 1: Research Agent (Gemini + Search Grounding)
    const historyTopics = history.map((h) => h.topic);
    const researchBrief = await runResearchAgent(
      todayEntry.topic,
      todayEntry.service,
      todayEntry.pillar,
      historyTopics
    );

    // 4. Agent 2: Script Writer
    const script = await runScriptAgent(researchBrief);

    // 5. Agent 3: Image Generator & Video Prompt Writer
    const images = await runImageAgent(script);

    // 6. Agent 4: Dashboard Updater
    const dashboardData: DashboardData = {
      date: todayDetails.formattedDate,
      service: todayDetails.service,
      pillar: todayDetails.pillar,
      topic: todayEntry.topic,
      script,
      images,
      stats: researchBrief.stats,
      painPoints: researchBrief.painPoints,
      hooks: researchBrief.hooks,
      psychTrigger: researchBrief.psychTrigger,
      // Keep history log to last 30 items for dashboard readability
      history: history.slice(-30).reverse(),
    };

    const dashboardFile = await runDashboardAgent(dashboardData);

    // 7. Save today's topic to history.json
    history.push({
      date: todayDetails.formattedDate,
      topic: todayEntry.topic,
      service: todayEntry.service,
    });
    
    // Write back history log
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf8');
    console.log('[Orchestrator] Saved topic to history.json');

    console.log('==================================================');
    console.log('🎬 PIPELINE RUN COMPLETED SUCCESSFULLY');
    console.log(`Dashboard generated at: ${dashboardFile}`);
    console.log('==================================================');
  } catch (error) {
    console.error('❌ FATAL ERROR IN PIPELINE:', error);
    process.exit(1);
  }
}

main();
