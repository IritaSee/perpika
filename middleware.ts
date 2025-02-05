import { withAuth } from "next-auth/middleware"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!login|register-event|api/auth|_next/static|_next/image|favicon.ico).*)"
  ]
}

export default withAuth({
  pages: {
    signIn: "/login"
  }
})
