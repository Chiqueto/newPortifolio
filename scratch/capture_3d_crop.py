import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="chrome", headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = await context.new_page()
        await page.goto("https://trainvy.vercel.app/", wait_until="networkidle", timeout=30000)
        
        loc = page.locator("text=MOVEMENT LAB").first
        await loc.scroll_into_view_if_needed()
        await page.wait_for_timeout(3500)
        
        # Scroll up slightly by 80px so the section header is nicely centered
        await page.evaluate("window.scrollBy(0, -50)")
        await page.wait_for_timeout(1000)
        
        await page.screenshot(path="public/trainvy_3d_crop.png")
        print("Captured cropped view!")
        await browser.close()

asyncio.run(run())
