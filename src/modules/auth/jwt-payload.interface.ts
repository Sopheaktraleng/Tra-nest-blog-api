// src/modules/auth/jwt-payload.interface.ts
export interface JwtPayload {
  id: string; // or number, depending on your user ID type
  iat: number; // issued at time
  exp: number; // expiration time
}
