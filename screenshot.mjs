import { chromium } from 'playwright-chromium'

const URL = 'http://127.0.0.1:8899/'
const browser = await chromium.launch({ executablePath: '/usr/local/bin/chrome-headless-shell', args: ['--no-sandbox'] })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// hero
await page.screenshot({ path: 'preview-hero.png' })

// menu
await page.evaluate(() => document.getElementById('menu')?.scrollIntoView())
await page.waitForTimeout(1000)
await page.screenshot({ path: 'preview-menu.png' })

// cart - click add button for first item
await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button')]
  btns.find(b => b.closest('article') && b.querySelector('path[d="M12 5v14M5 12h14"]'))?.click()
})
await page.waitForTimeout(400)
await page.click('button:has-text("Cart")')
await page.waitForTimeout(800)
await page.screenshot({ path: 'preview-cart.png' })

// checkout
await page.click('button:has-text("Checkout")')
await page.waitForTimeout(800)
await page.screenshot({ path: 'preview-checkout.png' })

await browser.close()
console.log('screenshots done')
