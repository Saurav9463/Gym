/**
 * Vercel Serverless Function entry point.
 *
 * Vercel accepts an Express app directly as the default export — it wraps the
 * app in a serverless handler automatically.  No `app.listen()` is needed here;
 * that lives in `src/index.ts` for traditional Node.js hosting.
 */
import app from "../src/app";

export default app;
