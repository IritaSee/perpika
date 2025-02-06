import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export const config = {
  matcher: [
    "/dashboard/:path*"
  ]
}

export default withAuth(
  function middleware(req) {
    const response = NextResponse.next()
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return response
  },
  {
    pages: {
      signIn: "/login"
    }
  }
)
