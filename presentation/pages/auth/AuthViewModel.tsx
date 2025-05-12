import { useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import { AuthUser, RegisterApiResponse, LoginApiResponse, LoginCredentials } from "@/components/interface/modules/Auth";
import { useUser } from "@/context/UserContext";

const AuthViewModel = () => {
  const { fetchData } = useFetch();
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useUser();

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
        "json",
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
        "json",
        true // withCredentials
      );
  
      console.log("Login Response:", response);
      console.log("Login Status:", status);
  
      // If login is successful, update the user context
      if (response?.success && response?.data) {
        setUser({
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
        });
        setIsLoggedIn(true);
      }
  
      return response as LoginApiResponse;
  
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
   * Logs out the current user by calling the API endpoint to clear the cookie server-side
   */
  const logout = async () => {
    setLoading(true);
    try {
      const { response, status, errorLogs } = await fetchData<any>(
        endpoints.auth.logoutUser,
        "post",
        null,
        "json",
        true // withCredentials
      );
      if (status === 200) {
        console.log("Logout Response:", response);
        return {
          success: true,
          message: response?.message || "Logged out successfully"
        };
      } else {
        return {
          success: false,
          message: errorLogs?.message || "Logout failed"
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "An unexpected error occurred"
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    loading,
  };
};

export default AuthViewModel;