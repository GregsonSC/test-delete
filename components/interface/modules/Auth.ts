/**
 * Interface representing the data structure for user authentication,
 * particularly for registration.
 */
interface AuthUser {
  name: string;
  email: string;
  password?: string; // Password might be optional depending on context (e.g., fetching user data vs. registering)
  phone?: string;    // Phone might be optional
  imageUrl?: string; // Image URL might be optional
  roleId: number;   // Assuming roleId is always required
  // You might want to add other fields like id, createdAt, updatedAt if they exist in your user model
  // id?: string | number;
  // createdAt?: string; // Or Date
  // updatedAt?: string; // Or Date
}

// You can also define interfaces for login responses or other auth-related data structures here

export type { AuthUser };

// Re-using the generic ApiResponse from Blog.ts might be useful,
// or you can define a specific one for Auth if needed.
// Example:
// export interface AuthApiResponse<T> {
//   success: boolean;
//   data: T; // Often a single user object or token
//   message: string;
//   errors?: string[]; // Optional errors
//   token?: string; // Optional JWT token
// }