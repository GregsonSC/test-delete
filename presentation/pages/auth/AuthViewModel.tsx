import { useState } from "react";
import { useFetch } from "@/lib/services/endpoints";
import { endpoints } from "@/lib/services/endpoints";
import {
  AuthUser,
  RegisterApiResponse,
  LoginApiResponse,
  LoginCredentials,
  UpdateUserApiResponse,
  UpdatedUser,
} from "@/components/interface/modules/Auth";
import { useUser } from "@/context/UserContext";

const AuthViewModel = () => {
  const { fetchData } = useFetch();
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn, user } = useUser();

  /**
   * Registers a new user.
   * @param userData - The user data conforming to the AuthUser interface.
   */
  const register = async (userData: AuthUser) => {
    setLoading(true);
    try {
      // Convert userData to FormData
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const { response, status, errorLogs } = await fetchData<RegisterApiResponse>(
        endpoints.auth.registerUser,
        "post",
        formData,
        "form"
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
        console.log("Login Response:", response);
        setUser({
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          phone: response.data.phone,
          address: response.data.address,
          imageUrl: response.data.imageUrl,
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
        setUser(null);
        setIsLoggedIn(false);
        return {
          success: true,
          message: response?.message || "Logged out successfully",
        };
      } else {
        return {
          success: false,
          message: errorLogs?.message || "Logout failed",
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "An unexpected error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates a user's information by ID.
   * @param id - The ID of the user to update.
   * @param updateData - Object with fields to update (name, phone, password, imageUrl, address, roleId)
   */
  const updateUser = async (
    id: string,
    updateData: Partial<AuthUser> & { password?: string; imageUrl?: File | string }
  ) => {
    setLoading(true);
    try {
      // Build FormData only with provided fields
      const formData = new FormData();
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (
            key === "imageUrl" &&
            value &&
            Object.prototype.toString.call(value) === "[object File]"
          ) {
            formData.append("imageUrl", value as File);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      // PATCH to /user?id=ID
      const url = endpoints.auth.updateUser(id);
      const { response, status, errorLogs } = await fetchData<UpdateUserApiResponse>(
        url,
        "patch",
        formData,
        "form",
        true // withCredentials
      );
      if ((status === 200 || status === 201) && response?.success && response?.data?.[0]) {
        // Actualiza el contexto de usuario aquí
        setUser({
          ...response.data[0],
          id: String(response.data[0].id),
          email: user?.email || "",
        });
        return response as UpdateUserApiResponse;
      } else {
        return {
          success: false,
          message: errorLogs?.message || response?.message || "Update failed",
          data: [],
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "An unexpected error occurred",
        data: [],
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene los datos actuales del usuario autenticado
   */
  const getUser = async () => {
    setLoading(true);
    try {
      if (!user?.id) return null;
      const { response, status, errorLogs } = await fetchData<any>(
        endpoints.auth.getUser(user.id),
        "get",
        null,
        "json",
        true // withCredentials
      );
      if (status === 200 && response?.success && response?.data?.length > 0) {
        return response.data[0];
      } else {
        return null;
      }
    } catch (err: any) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    updateUser,
    getUser,
    loading,
  };
};

export default AuthViewModel;
