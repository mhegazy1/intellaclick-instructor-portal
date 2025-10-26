/**
 * Loading state utility
 * Provides consistent loading indicators across the application
 */

let loadingOverlay = null;
let loadingCount = 0;

/**
 * Initialize loading overlay
 */
function initLoadingOverlay() {
  if (loadingOverlay) return;

  loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loading-overlay';
  loadingOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  loadingOverlay.innerHTML = `
    <div style="
      background: white;
      padding: 30px 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    ">
      <div class="spinner"></div>
      <div id="loading-message" style="
        color: #374151;
        font-size: 16px;
        font-weight: 500;
      ">Loading...</div>
    </div>
  `;

  document.body.appendChild(loadingOverlay);

  // Add spinner CSS if not present
  if (!document.getElementById('spinner-styles')) {
    const style = document.createElement('style');
    style.id = 'spinner-styles';
    style.textContent = `
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #E5E7EB;
        border-top: 4px solid #3B82F6;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .btn-loading {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
      }

      .btn-loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Show loading overlay
 * @param {string} message - Optional loading message
 */
export function showLoading(message = 'Loading...') {
  initLoadingOverlay();
  loadingCount++;

  const messageEl = document.getElementById('loading-message');
  if (messageEl) {
    messageEl.textContent = message;
  }

  loadingOverlay.style.display = 'flex';
}

/**
 * Hide loading overlay
 * Uses counter to handle multiple simultaneous requests
 */
export function hideLoading() {
  if (!loadingOverlay) return;

  loadingCount = Math.max(0, loadingCount - 1);

  if (loadingCount === 0) {
    loadingOverlay.style.display = 'none';
  }
}

/**
 * Force hide loading (reset counter)
 */
export function forceHideLoading() {
  if (!loadingOverlay) return;
  loadingCount = 0;
  loadingOverlay.style.display = 'none';
}

/**
 * Add loading state to button
 * @param {HTMLElement} button - Button element
 * @param {boolean} loading - Loading state
 */
export function setButtonLoading(button, loading) {
  if (!button) return;

  if (loading) {
    button.dataset.originalText = button.textContent;
    button.classList.add('btn-loading');
    button.disabled = true;
  } else {
    button.classList.remove('btn-loading');
    button.disabled = false;
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  }
}

/**
 * Wrap async function with loading indicator
 * @param {Function} asyncFn - Async function to wrap
 * @param {string} message - Loading message
 */
export async function withLoading(asyncFn, message = 'Loading...') {
  showLoading(message);
  try {
    return await asyncFn();
  } finally {
    hideLoading();
  }
}

/**
 * Wrap async function with button loading state
 * @param {HTMLElement} button - Button element
 * @param {Function} asyncFn - Async function to wrap
 */
export async function withButtonLoading(button, asyncFn) {
  setButtonLoading(button, true);
  try {
    return await asyncFn();
  } finally {
    setButtonLoading(button, false);
  }
}

/**
 * Show inline loading spinner
 * @param {HTMLElement} container - Container element
 */
export function showInlineLoading(container) {
  if (!container) return;

  const spinner = document.createElement('div');
  spinner.className = 'inline-spinner';
  spinner.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;
  spinner.innerHTML = '<div class="spinner"></div>';

  container.innerHTML = '';
  container.appendChild(spinner);
}

// Default export
export default {
  show: showLoading,
  hide: hideLoading,
  forceHide: forceHideLoading,
  setButton: setButtonLoading,
  withLoading,
  withButtonLoading,
  showInline: showInlineLoading
};
