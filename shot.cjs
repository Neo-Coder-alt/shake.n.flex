const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: (process.env.AGENT_BROWSER_ARGS || '').split(' ').filter(Boolean).concat(['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']),
    headless: 'new',
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto('http://127.0.0.1:8899/', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise(r => setTimeout(r, 1500))
  await page.screenshot({ path: 'preview-hero.png', fullPage: false })
  await page.evaluate(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'instant', block: 'start' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: 'preview-menu.png', fullPage: false })
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')]
    const add = btns.find(b => b.querySelector('svg path[d="M12 5v14M5 12h14"]'))
    add?.click()
  })
  await new Promise(r => setTimeout(r, 500))
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')]
    const cart = btns.find(b => b.textContent?.includes('Cart'))
    cart?.click()
  })
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: 'preview-cart.png', fullPage: false })
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')]
    const co = btns.find(b => b.textContent?.includes('Checkout'))
    co?.click()
  })
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: 'preview-checkout.png', fullPage: false })
  await browser.close()
  console.log('done')
})().catch(e => { console.error(e); process.exit(1) })
