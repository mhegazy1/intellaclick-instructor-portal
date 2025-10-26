/**
 * Professional logging utility
 * Replaces console.log with configurable logging levels
 * In production, only errors are shown to users via toast
 */

import { showError, showWarning } from './toast.js';

// Log levels
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Current log level (can be set via environment or config)
const CURRENT_LEVEL = import.meta.env.MODE === 'production'
  ? LOG_LEVELS.WARN
  : LOG_LEVELS.DEBUG;

// Enable/disable console output
const CONSOLE_ENABLED = import.meta.env.MODE !== 'production';

/**
 * Log error message
 * Shows toast notification in production
 */
export function logError(message, error = null, context = {}) {
  if (LOG_LEVELS.ERROR <= CURRENT_LEVEL) {
    const timestamp = new Date().toISOString();
    const logData = {
      level: 'ERROR',
      timestamp,
      message,
      context,
      ...(error && {
        error: error.message,
        stack: error.stack
      })
    };

    // Always log errors to console for debugging
    console.error('[ERROR]', message, error || '', context);

    // In production, show user-friendly error message
    if (!CONSOLE_ENABLED) {
      showError(message);
    }

    // Could send to error tracking service here
    // sendToErrorTracking(logData);

    return logData;
  }
}

/**
 * Log warning message
 */
export function logWarning(message, context = {}) {
  if (LOG_LEVELS.WARN <= CURRENT_LEVEL) {
    const timestamp = new Date().toISOString();
    const logData = {
      level: 'WARN',
      timestamp,
      message,
      context
    };

    if (CONSOLE_ENABLED) {
      console.warn('[WARN]', message, context);
    }

    // Optionally show warning toast in production
    // showWarning(message);

    return logData;
  }
}

/**
 * Log info message
 * Only shown in development
 */
export function logInfo(message, context = {}) {
  if (LOG_LEVELS.INFO <= CURRENT_LEVEL && CONSOLE_ENABLED) {
    console.info('[INFO]', message, context);
  }
}

/**
 * Log debug message
 * Only shown in development
 */
export function logDebug(message, data = null) {
  if (LOG_LEVELS.DEBUG <= CURRENT_LEVEL && CONSOLE_ENABLED) {
    console.log('[DEBUG]', message, data || '');
  }
}

/**
 * Log API request
 */
export function logApiRequest(method, url, data = null) {
  logDebug(`API ${method} ${url}`, data);
}

/**
 * Log API response
 */
export function logApiResponse(method, url, status, data = null) {
  if (status >= 400) {
    logError(`API ${method} ${url} failed with status ${status}`, null, { data });
  } else {
    logDebug(`API ${method} ${url} succeeded (${status})`, data);
  }
}

/**
 * Log user action for analytics
 */
export function logUserAction(action, details = {}) {
  logInfo(`User action: ${action}`, details);
  // Could send to analytics service here
  // sendToAnalytics({ action, details });
}

// Default export
export default {
  error: logError,
  warn: logWarning,
  info: logInfo,
  debug: logDebug,
  apiRequest: logApiRequest,
  apiResponse: logApiResponse,
  userAction: logUserAction
};
