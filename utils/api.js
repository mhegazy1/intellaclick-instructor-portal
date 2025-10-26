/**
 * Centralized API client
 * Single source of truth for all API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.intellaclick.com/api';

/**
 * Get authorization headers
 * @returns {Object} Headers with auth token
 */
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<any>} - Parsed JSON or error
 */
async function handleResponse(response) {
  if (!response.ok) {
    // Handle authentication errors (401 Unauthorized)
    if (response.status === 401) {
      const error = await response.json().catch(() => ({ error: 'Authentication failed' }));

      // Check if it's a token expiration error
      const isTokenExpired =
        error.error?.toLowerCase().includes('token') ||
        error.error?.toLowerCase().includes('expired') ||
        error.error?.toLowerCase().includes('jwt') ||
        error.message?.toLowerCase().includes('token') ||
        error.message?.toLowerCase().includes('expired');

      if (isTokenExpired) {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Show clear message to user
        alert('Your session has expired. Please log in again.');

        // Redirect to login page
        window.location.href = '/login.html';

        throw new Error('Session expired. Please log in again.');
      }
    }

    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      errorData: error
    });

    // Improve error messages for common errors
    let errorMessage = error.error || error.message || `HTTP ${response.status}`;

    // Handle duplicate key errors
    if (errorMessage.includes('E11000') || errorMessage.includes('duplicate key')) {
      if (errorMessage.includes('code_1') || errorMessage.includes('code:')) {
        errorMessage = 'A class with this code already exists. Please use a different class code.';
      } else {
        errorMessage = 'This record already exists in the database.';
      }
    }

    throw new Error(errorMessage);
  }
  return response.json();
}

/**
 * Make API request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ========================================
// Authentication API
// ========================================

export const auth = {
  async login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async register(userData) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  async getMe() {
    return request('/auth/me');
  }
};

// ========================================
// Sessions API
// ========================================

export const sessions = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return request(`/sessions${queryString ? `?${queryString}` : ''}`);
  },

  async getActive() {
    return request('/sessions/instructor/active');
  },

  async create(sessionData) {
    return request('/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  },

  async getById(id) {
    return request(`/sessions/${id}`);
  },

  async getByCode(code) {
    return request(`/sessions/code/${code}`);
  },

  async updateStatus(id, status) {
    return request(`/sessions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  async getCurrentQuestion(id) {
    return request(`/sessions/${id}/current-question`);
  },

  async nextQuestion(id) {
    return request(`/sessions/${id}/next-question`, {
      method: 'POST'
    });
  },

  async endQuestion(id) {
    return request(`/sessions/${id}/end-question`, {
      method: 'POST'
    });
  },

  async end(id) {
    return request(`/sessions/${id}/end`, {
      method: 'POST'
    });
  },

  async getResponses(id) {
    return request(`/sessions/${id}/responses`);
  },

  async delete(id) {
    return request(`/sessions/${id}`, {
      method: 'DELETE'
    });
  },

  async getCurrentQuestionByCode(code) {
    return request(`/sessions/code/${code}/current-question`);
  },

  async getByCodeFull(code) {
    return request(`/sessions/code/${code}`);
  },

  async startQuestionTimer(sessionId, questionId, timeLimit) {
    return request(`/sessions/${sessionId}/questions/${questionId}/timer`, {
      method: 'POST',
      body: JSON.stringify({ timeLimit })
    });
  },

  async addQuestionTime(sessionId, questionId, addSeconds) {
    return request(`/sessions/${sessionId}/questions/${questionId}/timer`, {
      method: 'POST',
      body: JSON.stringify({ addSeconds })
    });
  },

  async endQuestionSession(sessionId, questionId) {
    return request(`/sessions/${sessionId}/questions/${questionId}/end`, {
      method: 'POST'
    });
  },

  async addQuestions(sessionId, questions) {
    return request(`/sessions/${sessionId}/questions`, {
      method: 'POST',
      body: JSON.stringify({ questions })
    });
  }
};

// ========================================
// Gamified Sessions API
// ========================================

export const gamifiedSessions = {
  async endWithGamification(id) {
    return request(`/sessions-gamified/${id}/end-with-gamification`, {
      method: 'POST'
    });
  },

  async getResults(id) {
    return request(`/sessions-gamified/${id}/results`);
  }
};

// ========================================
// Classes API
// ========================================

export const classes = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return request(`/classes${queryString ? `?${queryString}` : ''}`);
  },

  async getById(id) {
    return request(`/classes/${id}`);
  },

  async create(classData) {
    return request('/classes', {
      method: 'POST',
      body: JSON.stringify(classData)
    });
  },

  async update(id, classData) {
    return request(`/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(classData)
    });
  },

  async delete(id, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return request(`/classes/${id}${queryString ? `?${queryString}` : ''}`, {
      method: 'DELETE'
    });
  },

  async getStudents(id) {
    return request(`/classes/${id}/students`);
  }
};

// ========================================
// Gamification API
// ========================================

export const gamification = {
  async getSettings(classId) {
    return request(`/gamification/settings/${classId}`);
  },

  async updateSettings(classId, settings) {
    return request(`/gamification/settings/${classId}`, {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  },

  async getLeaderboard(classId) {
    return request(`/gamification/leaderboard/${classId}`);
  },

  async getStudentStats(classId, studentId) {
    return request(`/gamification/stats/${classId}/${studentId}`);
  },

  async syncInstructorSessions(instructorId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return request(`/gamification/sync-instructor-sessions/${instructorId}${queryString ? `?${queryString}` : ''}`, {
      method: 'POST'
    });
  }
};

// ========================================
// Questions API
// ========================================

export const questions = {
  async getAll() {
    return request('/questions');
  },

  async getById(id) {
    return request(`/questions/${id}`);
  },

  async create(questionData) {
    return request('/questions', {
      method: 'POST',
      body: JSON.stringify(questionData)
    });
  },

  async update(id, questionData) {
    return request(`/questions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(questionData)
    });
  },

  async delete(id) {
    return request(`/questions/${id}`, {
      method: 'DELETE'
    });
  }
};

// ========================================
// Quizzes API
// ========================================

export const quizzes = {
  async getAll() {
    return request('/quizzes');
  },

  async getById(id) {
    return request(`/quizzes/${id}`);
  },

  async create(quizData) {
    return request('/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData)
    });
  },

  async update(id, quizData) {
    return request(`/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quizData)
    });
  },

  async delete(id) {
    return request(`/quizzes/${id}`, {
      method: 'DELETE'
    });
  },

  async duplicate(id) {
    return request(`/quizzes/${id}/duplicate`, {
      method: 'POST'
    });
  }
};

// ========================================
// Question Sets API
// ========================================

export const questionSets = {
  async getAll() {
    return request('/question-sets');
  },

  async getById(id) {
    return request(`/question-sets/${id}`);
  },

  async create(questionSetData) {
    return request('/question-sets', {
      method: 'POST',
      body: JSON.stringify(questionSetData)
    });
  },

  async update(id, questionSetData) {
    return request(`/question-sets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(questionSetData)
    });
  },

  async delete(id) {
    return request(`/question-sets/${id}`, {
      method: 'DELETE'
    });
  }
};

// Default export for convenience
export default {
  auth,
  sessions,
  gamifiedSessions,
  classes,
  gamification,
  questions,
  questionSets,
  quizzes
};
