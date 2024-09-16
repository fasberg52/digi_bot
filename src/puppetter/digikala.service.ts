import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { TOKEN_DIGIKALA } from './constant/token.constant';

@Injectable()
export class DigikalaLoginService {
  private readonly logger = new Logger(DigikalaLoginService.name);

  async loginToDigikala(): Promise<string> {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: process.env.CHROME_PATH,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await browser.newPage();

    await page.goto('https://www.digikala.com/');

    await page.setCookie({
      name: 'Digikala:User:Token:new',
      value: TOKEN_DIGIKALA,
      domain: '.digikala.com',
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
    });

    const cookies = await page.cookies();
    const tokenCookie = cookies.find(
      (cookie) => cookie.name === 'Digikala:User:Token:new',
    );
    if (tokenCookie) {
      this.logger.log(`Token cookie set: ${tokenCookie.value}`);
    } else {
      this.logger.error('Token cookie was not set correctly.');
      await browser.close();
      throw new Error('Failed to set token cookie.');
    }

    await page.waitForNavigation();

    await page.goto('https://www.digikala.com/profile/');
    await this.delay(5000);
    console.log(`wait 5 seconds...`);

    await page.goto('https://www.digikala.com/profile/lists/');
    await this.delay(10000);
    this.logger.log('Login process completed. No need for manual redirection.');

    await browser.close();
    return 'Login completed';
  }

  async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
