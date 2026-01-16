import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";

/**
 * Custom API Error class for typed error handling in production
 * Provides structured error information for better error handling
 */
export class ApiError extends Error {
  public readonly status?: number;
  public readonly data?: unknown;
  public readonly code?: string;
  public readonly timestamp: string;

  constructor(
    message: string,
    status?: number,
    data?: unknown,
    code?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.code = code;
    this.timestamp = new Date().toISOString();
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    const ErrorConstructor = Error as unknown as {
      captureStackTrace?: (error: Error, constructor: typeof ApiError) => void;
    };
    if (typeof ErrorConstructor.captureStackTrace === "function") {
      ErrorConstructor.captureStackTrace(this, ApiError);
    }
    
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Check if error is a client error (4xx)
   */
  isClientError(): boolean {
    return this.status !== undefined && this.status >= 400 && this.status < 500;
  }

  /**
   * Check if error is a server error (5xx)
   */
  isServerError(): boolean {
    return this.status !== undefined && this.status >= 500 && this.status < 600;
  }

  /**
   * Check if error is a network error
   */
  isNetworkError(): boolean {
    return this.status === undefined;
  }
}

/**
 * Type for API response wrapper (if your API wraps responses)
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

/**
 * Type for error response from API
 */
interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  code?: string;
}

/**
 * Generic GET request
 * 
 * @template T - The expected response data type
 * @param url - API endpoint URL (relative to baseURL)
 * @param params - Optional query parameters as key-value pairs
 * @param config - Optional additional Axios request configuration
 * @returns Promise resolving to response data of type T
 * @throws {ApiError} For HTTP errors, network errors, or request failures
 * 
 * @example
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 * }
 * 
 * const users = await get<User[]>('/users', { page: 1, limit: 10 });
 * ```
 */
export async function get<T>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      ...(params && { params }),
    };
    
    const response: AxiosResponse<T> = await axiosInstance.get<T>(
      url,
      requestConfig
    );
    
    return response.data;
  } catch (error) {
    throw handleError(error, url, "GET");
  }
}

/**
 * Generic POST request
 * 
 * @template T - The expected response data type
 * @template B - The request body type (defaults to unknown)
 * @param url - API endpoint URL (relative to baseURL)
 * @param body - Request body data
 * @param config - Optional additional Axios request configuration
 * @returns Promise resolving to response data of type T
 * @throws {ApiError} For HTTP errors, network errors, or request failures
 * 
 * @example
 * ```tsx
 * interface CreateUserDto {
 *   name: string;
 *   email: string;
 * }
 * 
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * const newUser = await post<User, CreateUserDto>('/users', {
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * });
 * ```
 */
export async function post<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      url,
      body,
      config
    );
    
    return response.data;
  } catch (error) {
    throw handleError(error, url, "POST");
  }
}

/**
 * Generic PUT request
 * 
 * @template T - The expected response data type
 * @template B - The request body type (defaults to unknown)
 * @param url - API endpoint URL (relative to baseURL)
 * @param body - Request body data
 * @param config - Optional additional Axios request configuration
 * @returns Promise resolving to response data of type T
 * @throws {ApiError} For HTTP errors, network errors, or request failures
 * 
 * @example
 * ```tsx
 * interface UpdateUserDto {
 *   name?: string;
 *   email?: string;
 * }
 * 
 * const updated = await put<User, UpdateUserDto>('/users/1', {
 *   name: 'Jane Doe'
 * });
 * ```
 */
export async function put<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put<T>(
      url,
      body,
      config
    );
    
    return response.data;
  } catch (error) {
    throw handleError(error, url, "PUT");
  }
}

/**
 * Generic PATCH request
 * 
 * @template T - The expected response data type
 * @template B - The request body type (defaults to unknown)
 * @param url - API endpoint URL (relative to baseURL)
 * @param body - Request body data
 * @param config - Optional additional Axios request configuration
 * @returns Promise resolving to response data of type T
 * @throws {ApiError} For HTTP errors, network errors, or request failures
 */
export async function patch<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.patch<T>(
      url,
      body,
      config
    );
    
    return response.data;
  } catch (error) {
    throw handleError(error, url, "PATCH");
  }
}

/**
 * Generic DELETE request
 * 
 * @template T - The expected response data type
 * @param url - API endpoint URL (relative to baseURL)
 * @param config - Optional additional Axios request configuration
 * @returns Promise resolving to response data of type T
 * @throws {ApiError} For HTTP errors, network errors, or request failures
 * 
 * @example
 * ```tsx
 * await del<void>('/users/1');
 * ```
 */
export async function del<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      url,
      config
    );
    
    return response.data;
  } catch (error) {
    throw handleError(error, url, "DELETE");
  }
}

/**
 * Export delete as 'delete' for convenience
 * Note: Users can import as: import { delete as del } from './api/apiService'
 * or use the 'del' function directly
 */
export { del as delete };

/**
 * Production-ready error handler that converts Axios errors to typed ApiError
 * Handles all error scenarios: network errors, HTTP errors, timeout errors, etc.
 * 
 * @param error - Error from axios request (unknown type for safety)
 * @param _url - The URL that was requested (for future logging/debugging)
 * @param _method - The HTTP method used (for future logging/debugging)
 * @returns ApiError with appropriate status, message, and data
 */
function handleError(
  error: unknown,
  _url: string,
  _method: string
): ApiError {
  // Handle Axios errors
  if (error instanceof Error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    // Server responded with error status (4xx, 5xx)
    if (axiosError.response) {
      const { status, data } = axiosError.response;
      const errorResponse = data as ErrorResponse;
      
      // Extract error message from various possible response formats
      let message = "Request failed";
      
      if (errorResponse) {
        if (errorResponse.message) {
          message = errorResponse.message;
        } else if (errorResponse.error) {
          message = errorResponse.error;
        } else if (errorResponse.errors) {
          // Handle validation errors (e.g., Laravel format)
          const errorMessages = Object.values(errorResponse.errors)
            .flat()
            .join(", ");
          message = errorMessages || message;
        }
      }
      
      // Fallback to status text if available
      if (!message || message === "Request failed") {
        message = axiosError.response.statusText || axiosError.message || message;
      }
      
      return new ApiError(
        message,
        status,
        errorResponse,
        errorResponse?.code
      );
    }
    
    // Request was made but no response received (network error, timeout, etc.)
    if (axiosError.request) {
      // Check for timeout
      if (axiosError.code === "ECONNABORTED" || axiosError.message.includes("timeout")) {
        return new ApiError(
          "Request timeout: The server did not respond in time",
          undefined,
          undefined,
          "TIMEOUT"
        );
      }
      
      // Check for network errors
      if (axiosError.code === "ERR_NETWORK" || axiosError.message.includes("Network Error")) {
        return new ApiError(
          "Network error: Unable to connect to the server. Please check your internet connection.",
          undefined,
          undefined,
          "NETWORK_ERROR"
        );
      }
      
      // Generic request error
      return new ApiError(
        "Network error: No response from server",
        undefined,
        undefined,
        "NO_RESPONSE"
      );
    }
    
    // Axios configuration error or other Axios-specific errors
    if (axiosError.message) {
      return new ApiError(
        axiosError.message,
        undefined,
        undefined,
        axiosError.code || "AXIOS_ERROR"
      );
    }
  }
  
  // Handle non-Error objects (shouldn't happen, but safety first)
  if (typeof error === "string") {
    return new ApiError(error);
  }
  
  // Unknown error type
  return new ApiError(
    "An unexpected error occurred while processing your request",
    undefined,
    error,
    "UNKNOWN_ERROR"
  );
}
