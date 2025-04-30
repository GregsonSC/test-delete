import { useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { AuthUser, RegisterApiResponse, LoginApiResponse, LoginCredentials } from "@/components/interface/modules/Auth";
import { setCookie, deleteCookie } from "cookies-next";

const AuthViewModel = () => {
  const { fetchData } = useFetch();
  const [loading, setLoading] = useState(false);

  /**
   * Registers a new user.
   * @param userData - The user data conforming to the AuthUser interface.
   */
  const register = async (userData: AuthUser) => {
    setLoading(true);
    
    try {
      const { response, status, errorLogs } = await fetchData<RegisterApiResponse>(
        endpoints.auth.registerUser,
        "post",
        userData,
        "json"
      );
      
      console.log("Registration Response:", response);
      console.log("Registration Status:", status);
      console.log("Registration Error Logs:", errorLogs);
      
      const apiResponse = response as RegisterApiResponse;
      
      if (status === 200 || status === 201) {
        return apiResponse; // Return the API response directly
      } else {
        // For HTTP errors, return the error from the API or a generic message
        return {
          success: false,
          message: errorLogs?.message || response?.message || "Registration failed",
        };
      }
    } catch (err: any) {
      console.error("Error during registration:", err);
      // For exceptions, return a simple error object with a generic message
      return {
        success: false,
        message: err.message || "An unexpected error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs in a user.
   * @param credentials - Object containing email and password
   */
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    
    try {
      const { response, status, errorLogs } = await fetchData<LoginApiResponse>(
        endpoints.auth.loginUser,
        "post",
        credentials,
        "json"
      );
      
      console.log("Login Response:", response);
      console.log("Login Status:", status);
      
      const apiResponse = response as LoginApiResponse;
      
      if (status === 200) {
        // Store the token in cookies if it exists in the response
        if (apiResponse.data?.[0]?.token) {
          setCookie('auth_token', apiResponse.data[0].token);
        }
        return apiResponse; // Return the API response directly
      } else {
        return apiResponse; // Return the API response directly with error messages
      }
    } catch (err: any) {
      console.error("Error during login:", err);
      return {
        success: false,
        message: err.message || "An unexpected error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out the current user by removing the token
   */
  const logout = () => {
    deleteCookie('auth_token');
    return {
      success: true,
      message: "Logged out successfully"
    };
  };

  return {
    register,
    login,
    logout,
    loading,
  };
};

export default AuthViewModel;