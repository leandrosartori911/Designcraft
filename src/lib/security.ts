import DOMPurify from 'dompurify';

export const SecurityUtils = {
  /**
   * Sanitizes generic text input against XSS
   */
  sanitizeInput: (input: string): string => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [], // Strip all tags strictly for generic text
      ALLOWED_ATTR: []
    });
  },

  /**
   * Sanitizes rich text (HTML) against XSS while allowing basic formatting
   */
  sanitizeHTML: (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel']
    });
  }
};

