import fs from 'fs';

interface Idata {
  events: Ievent[];
}

interface Ievent {
  type: string;
}

/**
 * Gets data from file
 * @param {string} url
 * @returns {Idata}
 */
export default function getData (url: string): Idata | boolean {
  if (!fs.existsSync(url)) {
    return false;
  }

  return JSON.parse(fs.readFileSync(url, 'utf8'));
}
