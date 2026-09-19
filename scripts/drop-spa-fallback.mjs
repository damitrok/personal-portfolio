// Runs after `nuxt generate` (npm `postgenerate` hook).
//
// Nitro's static preset writes a 200.html SPA-fallback shell next to the
// prerendered pages. Vercel serves it for any unknown path *with HTTP 200*
// (a soft-404: search engines can index junk URLs). Every real route on
// this site is prerendered, so the fallback is never needed — removing it
// makes Vercel fall through to the prerendered 404.html with a real 404.
import { rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
await rm(path.join(rootDir, '.output/public/200.html'), { force: true })
console.log('Removed .output/public/200.html (SPA fallback not needed: all routes are prerendered)')
