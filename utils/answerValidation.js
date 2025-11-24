/**
 * Answer Validation Utility
 * Shared answer comparison and validation logic to prevent code duplication
 *
 * CRITICAL: This is the SINGLE SOURCE OF TRUTH for answer comparison.
 * DO NOT duplicate this logic anywhere else in the codebase.
 */

/**
 * Check if a value represents a valid answer (not null/undefined)
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a valid answer
 */
export function hasValidAnswer(value) {
    return value !== undefined && value !== null;
}

/**
 * Check if a question has answer data (handles all question types)
 * @param {Object} question - Question object
 * @param {string} questionType - Question type (mcq, tf, matching, ordering, fillblank)
 * @returns {boolean} True if question has answer data
 */
export function hasAnswerData(question, questionType) {
    if (!question) return false;

    // MCQ/True-False: check correctAnswer field
    if (hasValidAnswer(question.correctAnswer)) {
        return true;
    }

    // Matching: check pairs field
    if (questionType === 'matching' && question.pairs && question.pairs.length > 0) {
        return true;
    }

    // Ordering: check correctOrder field
    if (questionType === 'ordering' && question.correctOrder && question.correctOrder.length > 0) {
        return true;
    }

    return false;
}

/**
 * Convert letter to number (A=0, B=1, C=2, etc.)
 * @param {string|number} value - Value to convert
 * @returns {number|null} Converted number or null if not a letter
 */
function letterToNumber(value) {
    if (typeof value === 'string' && value.length === 1 && /^[A-Z]$/i.test(value)) {
        return value.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, C=2, etc.
    }
    return null;
}

/**
 * Convert number to letter (0=A, 1=B, 2=C, etc.)
 * @param {string|number} value - Value to convert
 * @returns {string|null} Converted letter or null if not a valid number
 */
function numberToLetter(value) {
    const num = typeof value === 'number' ? value : parseInt(value);
    if (!isNaN(num) && num >= 0 && num < 26) {
        return String.fromCharCode(65 + num); // 0=A, 1=B, 2=C, etc.
    }
    return null;
}

/**
 * Compare two answers for equality (handles all question types and formats)
 *
 * This function handles:
 * - Numeric answers (including 0 for option A)
 * - Letter answers (A, B, C, D)
 * - String answers (text, case-insensitive)
 * - Array answers (ordering questions)
 * - Object answers (matching questions)
 *
 * @param {any} studentAnswer - Student's answer
 * @param {any} correctAnswer - Correct answer
 * @param {string} questionType - Question type (mcq, tf, matching, ordering, fillblank)
 * @returns {boolean} True if answers match
 */
export function compareAnswers(studentAnswer, correctAnswer, questionType) {
    // Handle null/undefined
    if (studentAnswer === null || studentAnswer === undefined || correctAnswer === null || correctAnswer === undefined) {
        return false;
    }

    // Helper to convert letter to number (A=0, B=1, C=2, D=3, etc.)
    const letterToNum = letterToNumber;

    // For MCQ/True-False with numeric or letter answers
    if (typeof studentAnswer === 'number' || typeof correctAnswer === 'number') {
        let studentNum = typeof studentAnswer === 'number' ? studentAnswer : parseInt(studentAnswer);
        let correctNum = typeof correctAnswer === 'number' ? correctAnswer : parseInt(correctAnswer);

        // If parseInt fails, try letter-to-number conversion
        if (isNaN(studentNum)) {
            const converted = letterToNum(studentAnswer);
            if (converted !== null) {
                studentNum = converted;
            }
        }

        if (isNaN(correctNum)) {
            const converted = letterToNum(correctAnswer);
            if (converted !== null) {
                correctNum = converted;
            }
        }

        // If both are valid numbers, compare them
        if (!isNaN(studentNum) && !isNaN(correctNum)) {
            return studentNum === correctNum;
        }
    }

    // For matching/ordering (objects/arrays) - need structural comparison
    if (questionType === 'matching' || questionType === 'ordering') {
        try {
            const studentStr = typeof studentAnswer === 'object' ? JSON.stringify(studentAnswer) : studentAnswer;
            const correctStr = typeof correctAnswer === 'object' ? JSON.stringify(correctAnswer) : correctAnswer;
            return studentStr === correctStr;
        } catch (e) {
            return false;
        }
    }

    // For string answers (fill-in-blank, text-based MCQ)
    if (typeof studentAnswer === 'string' && typeof correctAnswer === 'string') {
        return studentAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    }

    // Fallback: try string comparison
    return String(studentAnswer).toLowerCase().trim() === String(correctAnswer).toLowerCase().trim();
}

/**
 * Calculate points earned for a response
 *
 * @param {Object} response - Student response object
 * @param {Object} question - Question object
 * @returns {number} Points earned
 */
export function calculatePoints(response, question) {
    // If backend already calculated points, use that
    if (response.points !== undefined) {
        return response.points;
    }

    if (response.score !== undefined) {
        return response.score;
    }

    // Otherwise, calculate based on correctness
    const questionType = question.questionType || question.type;
    const correctAnswer = response.correctAnswer || question.correctAnswer;
    const isCorrect = compareAnswers(response.answer, correctAnswer, questionType);

    return isCorrect ? (question.points || 10) : 0;
}

/**
 * Normalize answer format for comparison (handles legacy formats)
 *
 * @param {any} answer - Answer to normalize
 * @param {string} questionType - Question type
 * @returns {any} Normalized answer
 */
export function normalizeAnswer(answer, questionType) {
    if (answer === null || answer === undefined) {
        return answer;
    }

    // For MCQ, normalize letters to numbers
    if (questionType === 'mcq' || questionType === 'tf') {
        const num = letterToNumber(answer);
        if (num !== null) {
            return num;
        }
    }

    return answer;
}

/**
 * Default export
 */
export default {
    hasValidAnswer,
    hasAnswerData,
    compareAnswers,
    calculatePoints,
    normalizeAnswer
};
