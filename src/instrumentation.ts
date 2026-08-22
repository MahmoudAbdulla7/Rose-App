export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { EventEmitter } = await import('node:events');

    // Next.js production compression attaches one drain listener per parallel
    // streamed response; Partial Prerender can exceed Node's default limit of 10.
    EventEmitter.defaultMaxListeners = 20;
  }
}
