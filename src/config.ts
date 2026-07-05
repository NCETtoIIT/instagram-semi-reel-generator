import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export interface Config {
  geminiApiKey: string;
  aboutMePath: string;
}

if (!process.env.GEMINI_API_KEY) {
  throw new Error('FATAL: GEMINI_API_KEY environment variable is not defined.');
}

export const config: Config = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  aboutMePath: process.env.ABOUT_ME_PATH || path.join(__dirname, '../about_me.md'),
};
