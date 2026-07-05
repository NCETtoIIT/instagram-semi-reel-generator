import { GoogleGenAI } from '@google/genai';
import { config } from '../config';
import { Script, ImageGenerationResult } from '../types';
import { getImagenPrompt, getVideoPromptGenerationPrompt } from '../prompts/imagePrompt';
import * as fs from 'fs';
import * as path from 'path';

export async function runImageAgent(script: Script): Promise<ImageGenerationResult[]> {
  console.log('[Image Agent] Starting image and video prompt generation for 6 scenes...');
  const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
  const results: ImageGenerationResult[] = [];

  // Ensure docs/images folder exists
  const imagesDir = path.join(__dirname, '../../docs/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const scene of script.scenes) {
    console.log(`[Image Agent] Processing Scene ${scene.sceneNumber}/6 (Part ${scene.part})...`);

    // 1. Generate Image using Imagen 3
    const imagenPrompt = getImagenPrompt(scene.visual);
    console.log(`[Image Agent] Generating image for Scene ${scene.sceneNumber}...`);
    
    let imagePath = `docs/images/scene_${scene.sceneNumber}.png`;
    const absoluteImagePath = path.join(imagesDir, `scene_${scene.sceneNumber}.png`);

    try {
      const imageResponse = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: imagenPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '9:16',
        },
      });

      const base64Bytes = imageResponse.generatedImages?.[0]?.image?.imageBytes;
      if (base64Bytes) {
        fs.writeFileSync(absoluteImagePath, Buffer.from(base64Bytes, 'base64'));
        console.log(`[Image Agent] Image saved to ${imagePath}`);
      } else {
        throw new Error('No image bytes returned from Imagen API.');
      }
    } catch (imageError) {
      console.error(`[Image Agent] Failed to generate image for Scene ${scene.sceneNumber}:`, imageError);
      // Fallback: save a placeholder or empty file to avoid breaking the dashboard completely
      fs.writeFileSync(absoluteImagePath, Buffer.from(''));
      imagePath = ''; // Mark as empty/error
    }

    // 2. Generate Image-to-Video Prompt using Gemini
    console.log(`[Image Agent] Writing Image-to-Video prompt for Scene ${scene.sceneNumber}...`);
    const videoPromptInput = getVideoPromptGenerationPrompt(scene.visual, scene.mood, scene.voiceover);
    
    let imageToVideoPrompt = '';
    try {
      const videoResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: videoPromptInput,
      });
      imageToVideoPrompt = videoResponse.text?.trim() || '';
    } catch (videoError) {
      console.error(`[Image Agent] Failed to generate video prompt for Scene ${scene.sceneNumber}:`, videoError);
      imageToVideoPrompt = `Starting from this image, animate the scene maintaining the ${scene.mood} mood.`;
    }

    // 3. Extract camera and motion details from generated prompt
    const camera = scene.part === 'A' ? 'Slow zoom in' : 'Slight pan / Static';
    const motion = scene.mood;

    results.push({
      sceneNumber: scene.sceneNumber,
      imagePath: imagePath ? `images/scene_${scene.sceneNumber}.png` : '', // Relative to docs/
      imageToVideoPrompt,
      camera,
      motion,
      duration: '8 seconds',
    });
  }

  console.log('[Image Agent] All images and video prompts generated.');
  return results;
}
