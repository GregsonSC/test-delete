/**
 * Interface representing the data structure for user authentication,
 * particularly for registration.
 */
interface AuthUser {
  name: string;
  email: string;
  password?: string; // Password might be optional depending on context (e.g., fetching user data vs. registering)
  phone?: string; // Phone might be optional
  imageUrl?: string; // Image URL might be optional
  roleId: number; // Assuming roleId is always required
  address?: string; // Address might be optional
  // You might want to add other fields like id, createdAt, updatedAt if they exist in your user model
  // id?: string | number;
  // createdAt?: string; // Or Date
  // updatedAt?: string; // Or Date
}

/**
 * Interface for login credentials
 */
interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interface for auth API responses
 */
interface AuthApiResponse {
  success: boolean;
  message: string;
  data: Array<{ token?: string }>;
  errors: string[];
}

/**
 * Interface for registration API response
 */
interface RegisterApiResponse {
  success: boolean;
  data?: AuthUser;
  message: string;
  errors?: string[];
  token?: string;
}

/**
 * Interface for login API response
 */
interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    phone: string;
    address: string;
    imageUrl?: string; // <-- Add this line
  };
  errors: string[];
}

interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  imageUrl?: string;
  role?: UserRole;
}

interface UserContextProps {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

/**
 * Interface for the role object in the update user response
 */
interface UserRole {
  id: number;
  name: string;
}

/**
 * Interface for the updated user object in the update user response
 */
interface UpdatedUser {
  id: number;
  name: string;
  phone: string;
  imageUrl: string;
  address: string;
  role: UserRole;
}

/**
 * Interface for update user API response
 */
interface UpdateUserApiResponse {
  success: boolean;
  message: string;
  data: UpdatedUser[];
}

// Estructura de respuesta del endpoint GET /user
interface UserApiData {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  address: string;
  role: UserRole;
}

interface GetUserApiResponse {
  success: boolean;
  data: UserApiData[];
  message: string;
  errors: any[];
}

export type {
  AuthUser,
  LoginCredentials,
  AuthApiResponse,
  RegisterApiResponse,
  LoginApiResponse,
  UserData,
  UserContextProps,
  UpdateUserApiResponse,
  UpdatedUser,
  UserRole,
  GetUserApiResponse,
  UserApiData,
};
