import { DashboardData, Scene, ImageGenerationResult } from '../types';
import * as fs from 'fs';
import * as path from 'path';

export async function runDashboardAgent(data: DashboardData): Promise<string> {
  console.log('[Dashboard Agent] Compiling outputs and generating dashboard...');

  const templatePath = path.join(__dirname, '../templates/dashboard.html');
  const outputPath = path.join(__dirname, '../../docs/index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Dashboard template not found at ${templatePath}`);
  }

  let html = fs.readFileSync(templatePath, 'utf8');

  // Generate Part A & Part B HTML blocks
  let partAHTML = '';
  let partBHTML = '';

  for (const scene of data.script.scenes) {
    const imgResult = data.images.find((img) => img.sceneNumber === scene.sceneNumber);
    const imagePath = imgResult?.imagePath || '';
    const videoPrompt = imgResult?.imageToVideoPrompt || 'Animate this scene maintaining the mood.';
    const camera = imgResult?.camera || 'Slow zoom in';
    const motion = imgResult?.motion || scene.mood;

    const fullImagePrompt = `${scene.visual}. QUALITY: High-resolution, vivid colors, clean composition, professional social media content quality, vertical 9:16 format (1080x1920px). Include hand-drawn doodle elements (sparkles, arrows, exclamation marks). Instagram handle '@ravi.digital.solutions' semi-transparent at bottom-left.`;

    const imageTag = imagePath
      ? `<img src="${imagePath}" alt="Scene ${scene.sceneNumber} Preview">`
      : `<div class="scene-img-error">No Image<br>Generated</div>`;

    const downloadLink = imagePath
      ? `<a href="${imagePath}" download="scene_${scene.sceneNumber}.png" class="btn-download-img">Download Image</a>`
      : '';

    const sceneHTML = `
      <div class="scene-item">
        <div class="scene-visual-preview">
          <div class="scene-image-wrapper">
            ${imageTag}
          </div>
          ${downloadLink}
        </div>
        <div class="scene-content">
          <div class="scene-meta">
            <span class="scene-badge idx">Scene ${scene.sceneNumber}</span>
            <span class="scene-badge">Part: ${scene.part}</span>
            <span class="scene-badge">Duration: ${scene.duration}</span>
            <span class="scene-badge">Mood: ${scene.mood}</span>
          </div>
          <div class="scene-info-row">
            <div class="info-label">Voiceover (Hinglish)</div>
            <div class="prompt-box">
              <button class="btn-copy" onclick="copyText('voiceover-s${scene.sceneNumber}', this)" title="Copy Voiceover">
                <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
              </button>
              <div class="prompt-text" id="voiceover-s${scene.sceneNumber}">${scene.voiceover}</div>
            </div>
          </div>
          <div class="scene-info-row">
            <div class="info-label">Text Overlay</div>
            <div class="prompt-box">
              <button class="btn-copy" onclick="copyText('overlay-s${scene.sceneNumber}', this)" title="Copy Text Overlay">
                <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
              </button>
              <div class="prompt-text overlay-val" id="overlay-s${scene.sceneNumber}">${scene.overlay}</div>
            </div>
          </div>
          <div class="scene-info-row">
            <div class="info-label">Image Generation Prompt (Copy to Midjourney/Imagen)</div>
            <div class="prompt-box">
              <button class="btn-copy" onclick="copyText('image-prompt-s${scene.sceneNumber}', this)" title="Copy Image Prompt">
                <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
              </button>
              <div class="prompt-text" id="image-prompt-s${scene.sceneNumber}">${fullImagePrompt}</div>
            </div>
          </div>
          <div class="scene-info-row" style="margin-bottom: 0;">
            <div class="info-label">Animate Video Prompt (Copy to Kling/Runway)</div>
            <div class="prompt-box">
              <button class="btn-copy" onclick="copyText('prompt-s${scene.sceneNumber}', this)" title="Copy Video Prompt">
                <svg viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
              </button>
              <div class="prompt-text" id="prompt-s${scene.sceneNumber}">${videoPrompt}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (scene.part === 'A') {
      partAHTML += sceneHTML;
    } else {
      partBHTML += sceneHTML;
    }
  }

  // Generate full voiceover script text
  const fullVoiceover = data.script.scenes
    .map((scene) => `Scene ${scene.sceneNumber} (${scene.part}): ${scene.voiceover}`)
    .join('\n\n');

  // Generate Stats HTML
  const statsHTML = data.stats.map((stat) => `<li>${stat}</li>`).join('\n');

  // Generate Pain Points & Hooks HTML
  const painPointsHTML = data.painPoints.map((pt) => `<li>${pt}</li>`).join('\n');
  const hooksHTML = data.hooks.map((hook) => `<li>${hook}</li>`).join('\n');

  // Generate History HTML
  let historyHTML = '';
  if (data.history && data.history.length > 0) {
    historyHTML = data.history
      .map(
        (item) => `
      <div class="history-item">
        <div class="history-date">${item.date}</div>
        <div class="history-topic">"${item.topic}"</div>
        <div class="history-service">${item.service}</div>
      </div>
    `
      )
      .join('\n');
  } else {
    historyHTML = '<div style="color: var(--text-dark); font-size: 0.85rem;">No history log found.</div>';
  }

  // Generate Full Production Sheet text (scene-wise prompts & copy text)
  let productionSheetText = '';
  for (const scene of data.script.scenes) {
    const imgResult = data.images.find((img) => img.sceneNumber === scene.sceneNumber);
    const videoPrompt = imgResult?.imageToVideoPrompt || 'Animate this scene maintaining the mood.';
    
    productionSheetText += `=== SCENE ${scene.sceneNumber} (${scene.part}) ===\n`;
    productionSheetText += `[Video Prompt for Kling/Runway]\n${videoPrompt}\n\n`;
    productionSheetText += `[Voiceover Dialogue]\n"${scene.voiceover}"\n\n`;
    productionSheetText += `[Text Overlay on Screen]\n${scene.overlay}\n\n`;
    productionSheetText += `----------------------------------------\n\n`;
  }

  // Format Hashtags
  const hashtagsHTML = data.script.hashtags.join(' ');

  // Replace placeholders
  html = html
    .replace(/{{DATE}}/g, data.date)
    .replace(/{{SERVICE}}/g, data.service)
    .replace(/{{PILLAR}}/g, data.pillar)
    .replace(/{{TOPIC}}/g, data.topic)
    .replace(/{{PART_A_SCENES}}/g, partAHTML)
    .replace(/{{PART_B_SCENES}}/g, partBHTML)
    .replace(/{{VOICEOVER}}/g, fullVoiceover)
    .replace(/{{PRODUCTION_SHEET}}/g, productionSheetText)
    .replace(/{{CAPTION}}/g, data.script.caption)
    .replace(/{{HASHTAGS}}/g, hashtagsHTML)
    .replace(/{{STATS}}/g, statsHTML)
    .replace(/{{PAIN_POINTS}}/g, painPointsHTML)
    .replace(/{{HOOKS}}/g, hooksHTML)
    .replace(/{{PSYCH_TRIGGER}}/g, data.psychTrigger)
    .replace(/{{HISTORY_LOG}}/g, historyHTML);

  // Ensure output directory exists
  const docsDir = path.dirname(outputPath);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // Write index.html
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`[Dashboard Agent] Dashboard successfully generated and saved to docs/index.html`);

  return outputPath;
}
