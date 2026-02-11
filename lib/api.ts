// API client with fetch wrapper, timeout handling, and typed responses

import type {
  ApiInfo,
  HealthResponse,
  ModelInfo,
  PredictionRequest,
  PredictionResponse,
} from './types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://54.87.178.118:8000';
const DEFAULT_TIMEOUT = 10000; // 10 seconds

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(
    baseUrl: string = API_BASE_URL,
    timeout: number = DEFAULT_TIMEOUT,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.timeout = timeout;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          } else if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail
              .map((err: any) => err.msg || JSON.stringify(err))
              .join(', ');
          }
        }
      } catch {
        // If parsing fails, use default error message
      }
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return response.json();
  }

  // GET / - API info
  async getApiInfo(): Promise<ApiInfo> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/`);
    return this.handleResponse<ApiInfo>(response);
  }

  // GET /health - Health check
  async getHealth(): Promise<HealthResponse> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/health`);
    return this.handleResponse<HealthResponse>(response);
  }

  // GET /model/info - Model metadata
  async getModelInfo(): Promise<ModelInfo> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/model/info`);
    return this.handleResponse<ModelInfo>(response);
  }

  // POST /predict - Make prediction
  async predict(data: PredictionRequest): Promise<PredictionResponse> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<PredictionResponse>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
