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
        await page.goto("https://trainvy.vercel.app/", wait_until="networkidle", timeout=30000)
        
        # Locate section with "VEJA. GIRE. ENTENDA." or "MOVEMENT LAB"
        loc = page.locator("text=MOVEMENT LAB").first
        if await loc.count() == 0:
            loc = page.locator("text=VEJA. GIRE. ENTENDA.").first

        if await loc.count() > 0:
            print("Found movement lab heading!")
            await loc.scroll_into_view_if_needed()
            await page.wait_for_timeout(3000)
            
            # Find the parent section or container
            parent = loc.locator("xpath=./ancestor::section | ./ancestor::div[contains(@class, 'relative')]").first
            await page.wait_for_timeout(2000)
            await page.screenshot(path="public/trainvy_3d_real.png")
            print("Captured view with 3D!")
        else:
            print("Heading not found")

        await browser.close()

asyncio.run(run())
