import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
export class StringHelper {
  constructor() {}

  private static secretKey = StringHelper.generateSecretKey();

  private static generateSecretKey(): string {
    const keyLength = 32; // 32 bytes = 256 bits (AES-256)
    const buffer = new Uint8Array(keyLength);
    crypto.getRandomValues(buffer);

    return Array.from(buffer, (byte) =>
      byte.toString(16).padStart(2, process.env.JWT_SECRET),
    ).join('');
  }

  static encryptData(data = null): string {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey,
    ).toString();
    return encryptedData;
  }

  static decryptData(encryptedData: string) {
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      this.secretKey,
    ).toString(CryptoJS.enc.Utf8);
    return decryptedData ? JSON.parse(decryptedData) : {};
  }

  static randomDigit(length: number) {
    return this.random(length, '0123456789');
  }

  static randomString(length: number) {
    return this.random(
      length,
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    );
  }

  static isEmail(str: string) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str.toLowerCase());
  }

  static isPhone(str: string) {
    return /^[1-9][0-9]{7,}$/m.test(str);
  }

  private static random(length: number, characters: string) {
    let result = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  static toTimeFormat(totalMilliseconds: number) {
    const totalSeconds = totalMilliseconds / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);
    return (
      (hours > 0 ? ('0' + hours).slice(-2) + ':' : '') +
      ('0' + minutes).slice(-2) +
      ':' +
      ('0' + seconds).slice(-2)
    );
  }
  static uuid() {
    return crypto.randomBytes(16).toString('hex');
  }
  static async getDeviceNameToUserAgent(userAgent: string) {
    let device = 'Unknown';
    const ua = {
      'Generic Linux': /Linux|ubuntu/i,
      Android: /Android/i,
      BlackBerry: /BlackBerry/i,
      Bluebird: /EF500/i,
      'Chrome OS': /CrOS/i,
      Datalogic: /DL-AXIS/i,
      Honeywell: /CT50/i,
      iPad: /iPad/i,
      iPhone: /iPhone/i,
      iPod: /iPod/i,
      macOS: /Macintosh|mac_powerpc/i,
      'Windows 10': /Windows NT 10.0/i,
      'Windows 8.1': /Windows NT 6.3/i,
      'Windows 8': /Windows NT 6.2/i,
      'Windows 7': /Windows NT 6.1/i,
      'Windows Vista': /Windows NT 6.0/i,
      'Windows XP': /Windows NT 5.1/i,
      'Windows 2000': /Windows NT 5.0/i,
      'Windows xp': /windows xp/i,
      'windows me': /windows me/i,
      win98: /win98/i,
      win95: /win95/i,
      winwin168: /win16/i,
      Zebra: /TC70|TC55/i,
      webOS: /webOS/i,
      IEMobile: /IEMobile/i,
    };
    Object.keys(ua).map((v) => userAgent.match(ua[v]) && (device = v));
    const browser = this.getBrowser(userAgent);
    return {
      name: device,
      browser,
    };
  }
  static getBrowser(userAgent: string) {
    const browsers = [
      { name: 'Edge (Chromium)', regex: /\bEdg\/(\d+)/ },
      { name: 'Opera', regex: /\bOPR\/(\d+)/ },
      { name: 'Chrome', regex: /\bChrome\/(\d+)/ },
      { name: 'Safari', regex: /\bSafari\/(\d+)/ },
      { name: 'Firefox', regex: /\bFirefox\/(\d+)/ },
      { name: 'MSIE', regex: /\bMSIE (\d+)/ }, // IE <= 10
      { name: 'Trident', regex: /\brv:(\d+)/ }, // IE 11+
    ];

    for (const browser of browsers) {
      const match = userAgent.match(browser.regex);
      if (match) {
        return { name: browser.name, version: match[1] };
      }
    }

    return { name: 'Unknown', version: 'Unknown' };
  }

  static hashCode(value) {
    let hash = 0,
      i,
      chr;
    if (value.length === 0) return hash;
    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  static getFormatDate(date: Date) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    const day = ('0' + currentDate.getDate()).slice(-2);
    return year + '/' + month + '/' + day;
  }

  static checkEven(number) {
    if (number % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }

  static dateToString(timestamp) {
    const a = new Date(timestamp);
    const year = a.getFullYear();
    const month = a.getMonth() + 1;
    const date = a.getDate();
    const hour = a.getUTCHours();
    const min = a.getUTCMinutes();
    const sec = a.getUTCSeconds();
    const time =
      year +
      '-' +
      (month < 10 ? 0 : '') +
      month +
      '-' +
      (date < 10 ? 0 : '') +
      date +
      'T' +
      (hour < 10 ? 0 : '') +
      hour +
      ':' +
      (min < 10 ? 0 : '') +
      min +
      ':' +
      (sec < 10 ? 0 : '') +
      sec;
    return time;
  }

  static convertPersianToEnglishNumber(persianNumber) {
    const persianToEnglishMap = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
    };

    return persianNumber.replace(
      /[۰-۹]/g,
      (match) => persianToEnglishMap[match],
    );
  }
}
