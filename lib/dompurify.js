import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export const sanitizeContent = (content) => {
  return purify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'p', 'img'],
    ALLOWED_ATTR: {
      'a': ['href','rel','target'],
      'img': ['src', 'alt']
    },
    USE_PROFILES: { html: true }
  });
};
