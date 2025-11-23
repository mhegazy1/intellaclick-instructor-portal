/**
 * Clipboard utility for copying text to clipboard
 * Provides modern clipboard API with fallback for older browsers
 */

import toast from './toast.js';

/**
 * Copy text to clipboard with fallback support
 * @param {string} text - Text to copy to clipboard
 * @param {string} label - Label for success message (e.g., "Session code", "Join link")
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text, label = 'Text') {
    try {
        await navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            toast.success(`${label} copied to clipboard!`);
        } catch (fallbackErr) {
            toast.error(`Failed to copy ${label.toLowerCase()}`);
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

/**
 * Default export for convenience
 */
export default {
    copy: copyToClipboard
};
