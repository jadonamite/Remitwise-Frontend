import { NextRequest, NextResponse } from "next/server";

/**
 * Validates the Authorization header.
 * Expects:  Authorization: Bearer <token>
 * The token is checked against the AUTH_SECRET env variable.
 */
export function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  if (!token) return false;
  return token === process.env.AUTH_SECRET;
}

export function unauthorizedResponse() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Higher-order function that wraps a route handler with auth validation.
 * Extracts the Bearer token and passes it to the handler as `session`.
 * Returns 401 if no valid token is present.
 *
 * Usage:
 *   async function handler(req: NextRequest, session: string) { ... }
 *   export const GET = withAuth(handler);
 */
export function withAuth(
  handler: (request: NextRequest, session: string) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token !== process.env.AUTH_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(request, token);
  };
}