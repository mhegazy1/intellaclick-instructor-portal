/**
 * Confirmation dialog utility
 * Provides consistent confirmation dialogs for destructive actions
 */

let confirmDialog = null;
let confirmResolve = null;

/**
 * Initialize confirmation dialog
 */
function initConfirmDialog() {
  if (confirmDialog) return;

  confirmDialog = document.createElement('div');
  confirmDialog.id = 'confirm-dialog';
  confirmDialog.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  confirmDialog.innerHTML = `
    <div style="
      background: white;
      padding: 32px;
      border-radius: 12px;
      max-width: 500px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: scaleIn 0.2s ease-out;
    ">
      <div id="confirm-icon" style="
        width: 48px;
        height: 48px;
        margin: 0 auto 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      "></div>
      <h3 id="confirm-title" style="
        margin: 0 0 12px;
        font-size: 20px;
        font-weight: 600;
        color: #111827;
        text-align: center;
      "></h3>
      <p id="confirm-message" style="
        margin: 0 0 24px;
        font-size: 14px;
        color: #6B7280;
        text-align: center;
        line-height: 1.5;
      "></p>
      <div style="
        display: flex;
        gap: 12px;
        justify-content: center;
      ">
        <button id="confirm-cancel" style="
          padding: 10px 24px;
          border: 1px solid #D1D5DB;
          background: white;
          color: #374151;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        ">Cancel</button>
        <button id="confirm-ok" style="
          padding: 10px 24px;
          border: none;
          background: #EF4444;
          color: white;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        "></button>
      </div>
    </div>
  `;

  document.body.appendChild(confirmDialog);

  // Add animation
  if (!document.getElementById('confirm-animations')) {
    const style = document.createElement('style');
    style.id = 'confirm-animations';
    style.textContent = `
      @keyframes scaleIn {
        from {
          transform: scale(0.9);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      #confirm-cancel:hover {
        background: #F3F4F6;
      }

      #confirm-ok:hover {
        background: #DC2626;
      }
    `;
    document.head.appendChild(style);
  }

  // Event listeners
  document.getElementById('confirm-cancel').addEventListener('click', () => {
    closeConfirmDialog(false);
  });

  document.getElementById('confirm-ok').addEventListener('click', () => {
    closeConfirmDialog(true);
  });

  // Close on overlay click
  confirmDialog.addEventListener('click', (e) => {
    if (e.target === confirmDialog) {
      closeConfirmDialog(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmDialog.style.display === 'flex') {
      closeConfirmDialog(false);
    }
  });
}

/**
 * Close confirmation dialog
 */
function closeConfirmDialog(result) {
  if (!confirmDialog) return;

  confirmDialog.style.display = 'none';

  if (confirmResolve) {
    confirmResolve(result);
    confirmResolve = null;
  }
}

/**
 * Show confirmation dialog
 * @param {Object} options - Confirmation options
 * @returns {Promise<boolean>} - User's choice
 */
export function confirm({
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // danger, warning, info
}) {
  initConfirmDialog();

  return new Promise((resolve) => {
    confirmResolve = resolve;

    // Set content
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    document.getElementById('confirm-ok').textContent = confirmText;
    document.getElementById('confirm-cancel').textContent = cancelText;

    // Set icon and colors based on type
    const iconEl = document.getElementById('confirm-icon');
    const okBtn = document.getElementById('confirm-ok');

    const types = {
      danger: {
        icon: '⚠️',
        bgColor: '#FEE2E2',
        btnColor: '#EF4444',
        btnHover: '#DC2626'
      },
      warning: {
        icon: '⚠',
        bgColor: '#FEF3C7',
        btnColor: '#F59E0B',
        btnHover: '#D97706'
      },
      info: {
        icon: 'ℹ',
        bgColor: '#DBEAFE',
        btnColor: '#3B82F6',
        btnHover: '#2563EB'
      }
    };

    const config = types[type] || types.danger;
    iconEl.textContent = config.icon;
    iconEl.style.background = config.bgColor;
    okBtn.style.background = config.btnColor;

    // Show dialog
    confirmDialog.style.display = 'flex';
  });
}

/**
 * Show delete confirmation
 */
export async function confirmDelete(itemName = 'this item') {
  return confirm({
    title: 'Delete Confirmation',
    message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
    confirmText: 'Delete',
    type: 'danger'
  });
}

/**
 * Show archive confirmation
 */
export async function confirmArchive(itemName = 'this item') {
  return confirm({
    title: 'Archive Confirmation',
    message: `Are you sure you want to archive ${itemName}?`,
    confirmText: 'Archive',
    type: 'warning'
  });
}

/**
 * Show action confirmation
 */
export async function confirmAction(action, itemName = '') {
  return confirm({
    title: `${action} Confirmation`,
    message: `Are you sure you want to ${action.toLowerCase()} ${itemName}?`,
    confirmText: action,
    type: 'info'
  });
}

// Default export
export default {
  confirm,
  delete: confirmDelete,
  archive: confirmArchive,
  action: confirmAction
};
