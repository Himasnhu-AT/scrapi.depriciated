import { Logger } from '@app/global';

const socialMediaBlocklist = [
  'facebook.com',
  'x.com',
  'twitter.com',
  'instagram.com',
  'linkedin.com',
  'snapchat.com',
  'tiktok.com',
  'reddit.com',
  'tumblr.com',
  'flickr.com',
  'whatsapp.com',
  'wechat.com',
  'telegram.org',
  'researchhub.com',
  'youtube.com',
  'corterix.com',
  'southwest.com',
  'ryanair.com',
];

const allowedKeywords = [
  'pulse',
  'privacy',
  'terms',
  'policy',
  'user-agreement',
  'legal',
  'help',
  'policies',
  'support',
  'contact',
  'about',
  'careers',
  'blog',
  'press',
  'conditions',
  'tos',
  '://ads.tiktok.com',
  '://tiktok.com/business',
  '://developers.facebook.com',
];

export function isUrlBlocked(url: string): boolean {
  const lowerCaseUrl = url.toLowerCase();

  // Check if the URL contains any allowed keywords as whole words
  if (
    allowedKeywords.some((keyword) =>
      new RegExp(`\\b${keyword}\\b`, 'i').test(lowerCaseUrl),
    )
  ) {
    return false;
  }

  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check if the URL matches any domain in the blocklist
    const isBlocked = socialMediaBlocklist.some((domain) => {
      const domainPattern = new RegExp(
        `(^|\\.)${domain.replace('.', '\\.')}(\\.|$)`,
        'i',
      );
      return domainPattern.test(hostname);
    });

    return isBlocked;
  } catch (e) {
    // If an error occurs (e.g., invalid URL), return false
    Logger.error(`Error parsing the following URL: ${url}`, e.toString());
    return false;
  }
}
