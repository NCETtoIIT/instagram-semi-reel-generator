import { GoogleGenAI } from '@google/genai';
import { config } from '../config';
import { ResearchBrief, Script } from '../types';
import { getScriptPrompt } from '../prompts/scriptPrompt';
import * as fs from 'fs';

export async function runScriptAgent(brief: ResearchBrief): Promise<Script> {
  console.log(`[Script Agent] Starting script generation for: "${brief.topic}"`);

  // Read about me profile
  let aboutMeText = '';
  if (fs.existsSync(config.aboutMePath)) {
    aboutMeText = fs.readFileSync(config.aboutMePath, 'utf8');
  }

  const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
  const prompt = getScriptPrompt(brief, aboutMeText);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini returned an empty response.');
    }

    // Parse JSON safely
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-zA-Z]*/, '').replace(/```$/, '');
    }
    const script: Script = JSON.parse(cleaned.trim());
    console.log('[Script Agent] Script generated successfully.');
    return script;
  } catch (error) {
    console.error('[Script Agent] Error during script writing:', error);
    throw error;
  }
}
