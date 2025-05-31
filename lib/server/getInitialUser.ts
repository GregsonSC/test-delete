import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import type { GetUserApiResponse } from "@/components/interface/modules/Auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.senavia.com";
const API_LOCAL = "http://localhost:3000/api";
const API = process.env.NODE_ENV === "development" ? API_LOCAL : API_BASE;

// Extrae datos mínimos del JWT si es posible
function getMinimalUserFromToken(token: string) {
  try {
    const decoded: any = decodeJwt(token);
    if (decoded && decoded.name) {
      return {
        id: String(decoded.id),
        name: decoded.name,
        error: true,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getInitialUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  let userId = null;
  try {
    const decoded: any = decodeJwt(token);
    userId = decoded.id;
  } catch {
    return null;
  }
  if (!userId) return getMinimalUserFromToken(token); //TODO: Esto no deberia ocurrir nunca

  try {
    const res = await fetch(`${API}/user?id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data: GetUserApiResponse = await res.json();
    if (data.success && data.data && data.data.length > 0) {
      const user = data.data[0];
      return {
        id: String(user.id),
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        imageUrl: user.imageUrl,
        role: user.role,
      };
    }
    return null;
  } catch {
    // Si el servidor se cae o hay error, retorna datos mínimos del JWT si es posible
    return getMinimalUserFromToken(token);
  }
}
