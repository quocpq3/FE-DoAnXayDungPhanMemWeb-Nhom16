type JwtPayload = {
  scope?: string;
  roles?: string[];
  authorities?: string[];
  email?: string;
  sub?: string;
};

const parseJwtPayload = (token?: string): JwtPayload | null => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const normalizeRole = (role: string) =>
  role.replace(/^ROLE_/, "").trim().toUpperCase();

export const getCurrentRoles = (): string[] => {
  const token = localStorage.getItem("token") || "";
  const rawUser = localStorage.getItem("user");

  try {
    if (rawUser) {
      const parsed = JSON.parse(rawUser) as { roles?: string[] };
      if (Array.isArray(parsed.roles) && parsed.roles.length > 0) {
        return parsed.roles;
      }
    }
  } catch {
    // Ignore broken localStorage user payload.
  }

  const payload = parseJwtPayload(token);
  if (!payload) return [];

  if (Array.isArray(payload.roles) && payload.roles.length > 0) {
    return payload.roles;
  }

  if (Array.isArray(payload.authorities) && payload.authorities.length > 0) {
    return payload.authorities;
  }

  if (!payload.scope) return [];
  return payload.scope.split(" ").map((value) => value.trim()).filter(Boolean);
};

export const getCurrentUserEmail = (): string | undefined => {
  const rawUser = localStorage.getItem("user");
  try {
    if (rawUser) {
      const parsed = JSON.parse(rawUser) as { email?: string };
      if (parsed?.email) return parsed.email;
    }
  } catch {
    // Ignore broken localStorage user payload.
  }

  const token = localStorage.getItem("token") || "";
  const payload = parseJwtPayload(token);
  return payload?.email || payload?.sub;
};

export const isAdmin = (): boolean => {
  const roles = getCurrentRoles();
  const byRole = roles.some((role) => normalizeRole(role) === "ADMIN");
  if (byRole) return true;

  // Fallback: explicit admin account requested by project owner.
  const email = getCurrentUserEmail();
  return (email || "").toLowerCase() === "admin@gmail.com";
};
