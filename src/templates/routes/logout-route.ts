export const logoutTemplate = () => `
import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.redirect(new URL("/", \`\${process.env.NEXTAUTH_URL}\`));
    response.cookies.set("jwt_back", "", { path: "/", expires: new Date(0) });
    response.cookies.set("jwt_back_refresh", "", { path: "/", expires: new Date(0) });
    return response;
}
`;