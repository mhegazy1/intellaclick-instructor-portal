/**
 * Toast notification system
 * Simple, reusable toast notifications
 */

let toastContainer = null;

/**
 * Initialize toast container
 */
function initToastContainer() {
  if (toastContainer) return;

  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
    max-width: calc(100vw - 40px);
  `;
  document.body.appendChild(toastContainer);
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export function showToast(message, type = 'info', duration = 3000) {
  initToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  // Icon based on type
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };

  // Colors based on type
  const colors = {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6'
  };

  toast.innerHTML = `
    <div style="
      background: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 250px;
      max-width: min(400px, calc(100vw - 60px));
      pointer-events: auto;
      border-left: 4px solid ${colors[type]};
      animation: slideIn 0.3s ease-out;
    ">
      <span style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${colors[type]};
        color: white;
        font-weight: bold;
        flex-shrink: 0;
      ">${icons[type]}</span>
      <span style="color: #374151; font-size: 14px; word-wrap: break-word; overflow-wrap: break-word;">${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Auto-remove after duration
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Show success toast
 * @param {string} message - Success message
 */
export function showSuccess(message) {
  showToast(message, 'success');
}

/**
 * Show error toast
 * @param {string} message - Error message
 */
export function showError(message) {
  showToast(message, 'error', 4000); // Errors shown longer
}

/**
 * Show warning toast
 * @param {string} message - Warning message
 */
export function showWarning(message) {
  showToast(message, 'warning');
}

/**
 * Show info toast
 * @param {string} message - Info message
 */
export function showInfo(message) {
  showToast(message, 'info');
}

// Add CSS animations if not already present
if (!document.getElementById('toast-animations')) {
  const style = document.createElement('style');
  style.id = 'toast-animations';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px) translateY(0);
        opacity: 0;
      }
      to {
        transform: translateX(0) translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0) translateY(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px) translateY(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Default export
export default {
  show: showToast,
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo
};
