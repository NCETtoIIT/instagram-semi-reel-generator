import { GoogleGenAI } from '@google/genai';
import { config } from '../config';
import { ResearchBrief } from '../types';
import { getResearchPrompt } from '../prompts/researchPrompt';
import { withRetry } from '../utils/retryHelper';
import * as fs from 'fs';

export async function runResearchAgent(
  topic: string,
  service: string,
  pillar: string,
  historyTopics: string[]
): Promise<ResearchBrief> {
  console.log(`[Research Agent] Starting research for topic: "${topic}" (${service})`);
  
  // Read about me profile
  let aboutMeText = '';
  if (fs.existsSync(config.aboutMePath)) {
    aboutMeText = fs.readFileSync(config.aboutMePath, 'utf8');
  } else {
    console.warn(`[Research Agent] Warning: about_me file not found at ${config.aboutMePath}`);
  }

  const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
  const prompt = getResearchPrompt(topic, service, pillar, aboutMeText, historyTopics);

  try {
    const response = await withRetry(() =>
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      })
    );

    const text = response.text;
    if (!text) {
      throw new Error('Gemini returned an empty response.');
    }

    // Parse JSON safely
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-zA-Z]*/, '').replace(/```$/, '');
    }
    const brief: ResearchBrief = JSON.parse(cleaned.trim());
    console.log('[Research Agent] Research completed successfully.');
    return brief;
  } catch (error) {
    console.error('[Research Agent] Error during research:', error);
    throw error;
  }
}
