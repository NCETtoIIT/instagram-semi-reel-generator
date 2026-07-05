export async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, delayMs = 5000): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      const isRateLimit = 
        error?.status === 429 || 
        error?.message?.includes('429') || 
        error?.message?.includes('quota') ||
        error?.message?.includes('RESOURCE_EXHAUSTED');
        
      if (isRateLimit && attempt <= maxRetries) {
        console.warn(`[Retry Helper] Rate limit hit (429/RESOURCE_EXHAUSTED). Waiting ${delayMs / 1000}s before retry attempt ${attempt}/${maxRetries}...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        // Exponential backoff
        delayMs *= 1.5;
        continue;
      }
      throw error;
    }
  }
}
