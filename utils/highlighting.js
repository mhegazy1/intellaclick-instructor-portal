/**
 * Answer highlighting utilities
 * Reusable functions for highlighting correct answers
 */

import { compareAnswers } from './answerComparison.js';

/**
 * Highlight correct answer in MCQ options
 * @param {HTMLElement} container - Container element with options
 * @param {*} correctAnswer - Correct answer value
 */
export function highlightMCQAnswer(container, correctAnswer) {
  if (correctAnswer === undefined || correctAnswer === null) {
    console.warn('No correct answer to highlight');
    return;
  }

  const options = container.querySelectorAll('.option, [class*="option"]');

  options.forEach((option, index) => {
    // Check if this option is correct
    const isCorrect = compareAnswers(index, correctAnswer, 'multiple_choice');

    if (isCorrect) {
      option.style.background = 'rgba(76, 175, 80, 0.2)';
      option.style.borderColor = '#4caf50';
      option.style.borderWidth = '2px';
      option.style.fontWeight = '600';

      // Add checkmark if not already present
      if (!option.querySelector('.correct-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'correct-indicator';
        indicator.textContent = '✓';
        indicator.style.cssText = `
          color: #4caf50;
          font-weight: bold;
          margin-left: 10px;
          font-size: 1.2em;
        `;
        option.appendChild(indicator);
      }
    }
  });
}

/**
 * Highlight correct answer for any question type
 * @param {Object} question - Question object
 * @param {HTMLElement} container - Container element
 */
export function highlightCorrectAnswer(question, container) {
  if (!question || question.correctAnswer === undefined || question.correctAnswer === null) {
    console.warn('No correct answer to highlight');
    return;
  }

  const questionType = question.questionType || question.type || 'multiple_choice';

  switch (questionType) {
    case 'multiple_choice':
    case 'true_false':
      highlightMCQAnswer(container, question.correctAnswer);
      break;

    case 'fill_blank':
      showFillBlankAnswer(container, question.correctAnswer);
      break;

    case 'matching':
      showMatchingAnswer(container, question.correctAnswer);
      break;

    case 'ordering':
      showOrderingAnswer(container, question.correctAnswer);
      break;

    default:
      console.log('No highlighting implemented for type:', questionType);
  }
}

/**
 * Show correct answer for fill-in-blank questions
 * @param {HTMLElement} container - Container element
 * @param {string} correctAnswer - Correct answer text
 */
function showFillBlankAnswer(container, correctAnswer) {
  // Check if answer already shown
  if (container.querySelector('.correct-answer-display')) {
    return;
  }

  const answerDiv = document.createElement('div');
  answerDiv.className = 'correct-answer-display';
  answerDiv.style.cssText = `
    padding: 1rem;
    margin-top: 1rem;
    background: rgba(76, 175, 80, 0.1);
    border: 2px solid #4caf50;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2e7d32;
  `;
  answerDiv.innerHTML = `
    <div style="margin-bottom: 0.5rem;">Correct Answer:</div>
    <div style="font-size: 1.2rem;">${correctAnswer}</div>
  `;

  container.appendChild(answerDiv);
}

/**
 * Show correct answer for matching questions
 * @param {HTMLElement} container - Container element
 * @param {Object} correctAnswer - Correct matching pairs
 */
function showMatchingAnswer(container, correctAnswer) {
  // Implementation depends on matching question structure
  console.log('Showing matching answer:', correctAnswer);
  // TODO: Implement based on matching question format
}

/**
 * Show correct answer for ordering questions
 * @param {HTMLElement} container - Container element
 * @param {Array} correctAnswer - Correct order
 */
function showOrderingAnswer(container, correctAnswer) {
  // Implementation depends on ordering question structure
  console.log('Showing ordering answer:', correctAnswer);
  // TODO: Implement based on ordering question format
}

/**
 * Remove all answer highlighting
 * @param {HTMLElement} container - Container element
 */
export function clearHighlighting(container) {
  // Remove MCQ highlighting
  const options = container.querySelectorAll('.option, [class*="option"]');
  options.forEach(option => {
    option.style.background = '';
    option.style.borderColor = '';
    option.style.borderWidth = '';
    option.style.fontWeight = '';

    const indicator = option.querySelector('.correct-indicator');
    if (indicator) {
      indicator.remove();
    }
  });

  // Remove answer displays
  const answerDisplays = container.querySelectorAll('.correct-answer-display');
  answerDisplays.forEach(display => display.remove());
}

export default {
  highlightMCQAnswer,
  highlightCorrectAnswer,
  clearHighlighting
};
