/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosResponse } from "axios";
import { create } from "domain";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";

// API Base URLs
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.senavia.com";
const API_LOCAL = "http://localhost:3000/api";

// Use local API for development, production API for production
const API = process.env.NODE_ENV === "development" ? API_LOCAL : API_BASE;

/**
 * Endpoints for the Senavia API
 * Organized by resource/feature
 */
export const endpoints = {
  // Contact form endpoints
  contact: {
    submit: `${API}/contact`,
  },
  blog: {
    getPosts: `https://6818f3a05a4b07b9d1d17bbc.mockapi.io/blog`,
    createPost: `https://6818f3a05a4b07b9d1d17bbc.mockapi.io/blog`,
    updatePost: (id: string) => `https://6818f3a05a4b07b9d1d17bbc.mockapi.io/blog${id}`,
    deletePost: (id: string) => `https://6818f3a05a4b07b9d1d17bbc.mockapi.io/blog${id}`,
  },
  // Add authentication endpoints
  auth: {
    registerUser: `${API}/auth/register`, // Endpoint for user registration (POST)
    loginUser: `${API}/auth/login`, // Endpoint for user login (POST)
    logoutUser: `${API}/logOut`, // Endpoint for user logout (POST)
  },

  // Test endpoint for checking API connectivity
  
  //StudyCase endpoints 
  studycase: {
    getCases: `${API}/studycase`, // Endpoint to get all study cases (GET)
    getCase: (id: string) => `${API}/studycase/${id}`, // Endpoint to get a specific study case by ID (GET)
    createCase: `${API}/studycase`, // Endpoint to create a new study case (POST)
    updateCase: (id: string) => `${API}/studycase/${id}`, // Endpoint to update a specific study case by ID (PATCH)
    DeleteCase: (id: string) => `${API}/studycase/${id}`, // Endpoint to delete a specific study case by ID (DELETE)
  },
};

// Header configurations
const CONFIG_JSON = {
  headers: {
    accept: "/",
    "Content-Type": "application/json",
  },
};

const CONFIG_FORM = {
  headers: {
    accept: "/",
    "Content-Type": "multipart/form-data",
  },
};

/* const CONFIG_FORM_TOKEN = {
  headers: {
    accept: "/",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
}; */

export interface FetchResponse<T> {
  response: T | null;
  loading: boolean;
  status: number | null;
  errorLogs: any;
}

export const useFetch = () => {
  const configTypes: Record<string, object> = {
    json: CONFIG_JSON,
    form: CONFIG_FORM,
    // token: CONFIG_FORM_TOKEN,
  };

  type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

  const isValidHttpMethod = (method: string): method is HttpMethod => {
    return ["get", "post", "put", "delete", "patch"].includes(method);
  };

  /**
   * Function to make HTTP requests using Axios
   * @param {string} url - Endpoint URL
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
   * @param {object|null} body - Data to send in the request (optional)
   * @param {string} typeConfig - Configuration type ("json" or "form")
   * @param {object|null} formFiles - Files to send in the form (optional)
   * @param {boolean} withCredentials - Whether to send cookies (optional)
   * @returns {Promise<FetchResponse<T>>} - Object with response, loading state, status code and errors
   */
  const fetchData = async <T>(
    url: string,
    method: string,
    body: object | null = null,
    typeConfig: "json" | "form" = "json",
    withCredentials: boolean = false, // <-- Move withCredentials here
    formFiles?: object                // <-- Make formFiles last and optional
  ): Promise<FetchResponse<T>> => {
    let response: T | null = null;
    let loading = true;
    let status: number | null = null;
    let errorLogs: any = null;

    try {
      let axiosConfig = { ...configTypes[typeConfig] };

      if (formFiles) {
        axiosConfig = { ...axiosConfig, data: formFiles };
      }

      if (withCredentials) {
        axiosConfig = { ...axiosConfig, withCredentials: true };
      }

      if (isValidHttpMethod(method)) {
        const res: AxiosResponse<T> = await Axios[method](url, body ?? {}, axiosConfig);
        response = res.data;
        status = res.status;
      } else {
        throw new Error(`Método HTTP no válido: ${method}`);
      }
    } catch (error: any) {
      if (Axios.isCancel(error)) {
        console.log("Request canceled by Axios");
      } else {
        console.error("Error in request:", error);
        try {
          //toast.error(error.message);
        } catch (error) {
          console.error("Error in toast:", error);
        }
        status = error.response ? error.response.status : 500;
        response = error.response?.data;
        errorLogs = error.response ? error.response.data : "Unknown error";
      }
    } finally {
      loading = false;
    }

    return { response, loading, status, errorLogs };
  };

  return { fetchData };
};

export default endpoints;

/* 

const { fetchData } = useFetch();

const { response, status } = await fetchData(endpoints.contact.submit, "post", {
      name: "John Doe",
      email: "john@example.com"
});

*/
