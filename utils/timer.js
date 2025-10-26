/**
 * Timer utility for question timing
 * Reusable countdown timer with callbacks
 */

export class QuestionTimer {
  constructor(duration, onTick, onComplete) {
    this.duration = duration; // in seconds
    this.remaining = duration;
    this.onTick = onTick || (() => {});
    this.onComplete = onComplete || (() => {});
    this.intervalId = null;
    this.isRunning = false;
  }

  /**
   * Start the timer
   */
  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.remaining--;

      // Call tick callback
      this.onTick(this.remaining);

      // Check if complete
      if (this.remaining <= 0) {
        this.stop();
        this.onComplete();
      }
    }, 1000);
  }

  /**
   * Stop the timer
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  /**
   * Reset the timer
   * @param {number} newDuration - New duration (optional)
   */
  reset(newDuration) {
    this.stop();
    if (newDuration !== undefined) {
      this.duration = newDuration;
    }
    this.remaining = this.duration;
    this.onTick(this.remaining);
  }

  /**
   * Add time to the timer
   * @param {number} seconds - Seconds to add
   */
  addTime(seconds) {
    this.remaining += seconds;
    this.duration += seconds;
    this.onTick(this.remaining);
  }

  /**
   * Get time remaining
   * @returns {number} - Seconds remaining
   */
  getRemaining() {
    return this.remaining;
  }

  /**
   * Get formatted time string (MM:SS)
   * @returns {string} - Formatted time
   */
  getFormattedTime() {
    return formatTime(this.remaining);
  }

  /**
   * Check if timer is running
   * @returns {boolean}
   */
  isActive() {
    return this.isRunning;
  }
}

/**
 * Format seconds to MM:SS
 * @param {number} seconds - Seconds to format
 * @returns {string} - Formatted time string
 */
export function formatTime(seconds) {
  const mins = Math.floor(Math.abs(seconds) / 60);
  const secs = Math.abs(seconds) % 60;
  const sign = seconds < 0 ? '-' : '';
  return `${sign}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Create and bind a timer to a display element
 * @param {number} duration - Duration in seconds
 * @param {HTMLElement} displayElement - Element to display timer
 * @param {Function} onComplete - Callback when timer completes
 * @returns {QuestionTimer} - Timer instance
 */
export function createTimerDisplay(duration, displayElement, onComplete) {
  const timer = new QuestionTimer(
    duration,
    (remaining) => {
      if (displayElement) {
        displayElement.textContent = formatTime(remaining);

        // Add visual warnings
        if (remaining <= 10 && remaining > 0) {
          displayElement.style.color = '#F59E0B'; // Warning color
        }
        if (remaining <= 5 && remaining > 0) {
          displayElement.style.color = '#EF4444'; // Danger color
        }
        if (remaining <= 0) {
          displayElement.style.color = '#EF4444';
          displayElement.textContent = 'TIME UP!';
        }
      }
    },
    onComplete
  );

  // Initial display
  if (displayElement) {
    displayElement.textContent = formatTime(duration);
  }

  return timer;
}

export default {
  QuestionTimer,
  formatTime,
  createTimerDisplay
};
