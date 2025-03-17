import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    redirect("/login");
  }

  // You could also verify the token here with your auth service
  // const isValid = await verifyToken(token.value)
  // if (!isValid) redirect("/login")

  return true;
}
