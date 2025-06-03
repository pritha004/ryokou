import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login"];

export default async function middleware(req: NextRequest) {
  const session = await auth();

  const isPublic = PUBLIC_PATHS.includes(req.nextUrl.pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (!session) {
    const signInUrl = new URL("/login", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
