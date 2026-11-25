import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            channel="chrome",
            headless=True,
            args=["--disable-web-security", "--no-sandbox"]
        )
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = await context.new_page()
        print("Navigating to trainvy.vercel.app...")
        await page.goto("https://trainvy.vercel.app/", wait_until="networkidle", timeout=30000)
        
        # Capture Hero
        await page.wait_for_timeout(2000)
        await page.screenshot(path="public/trainvy_hero_hq.png")
        print("Hero captured!")

        # Scroll to 3D section
        # Look for section with id movimento or experiencia or 3D canvas
        mov_sec = page.locator("#movimento, #experiencia, section:has(canvas)")
        if await mov_sec.count() > 0:
            print("Found 3D section, scrolling...")
            target = mov_sec.first
            await target.scroll_into_view_if_needed()
            await page.wait_for_timeout(4000)  # Wait for 3D model/canvas to render
            await target.screenshot(path="public/trainvy_3d_section.png")
            print("3D section captured!")
        else:
            print("Scrolling 1600px down...")
            await page.evaluate("window.scrollTo(0, 1800)")
            await page.wait_for_timeout(4000)
            await page.screenshot(path="public/trainvy_3d_section.png")
            print("Scrolled view captured!")

        await browser.close()

asyncio.run(run())
