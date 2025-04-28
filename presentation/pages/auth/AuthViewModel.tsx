import { useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { AuthUser } from "@/components/interface/modules/Auth";

// Define a potential structure for the registration API response
interface RegisterApiResponse {
  success: boolean;
  data?: AuthUser;
  message: string;
  errors?: string[];
  token?: string;
}

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
        // Removed the status code from the error message
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

  return {
    register,
    loading,
  };
};

export default AuthViewModel;