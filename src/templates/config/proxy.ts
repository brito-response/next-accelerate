export const proxyTemplate = () => `
import { NextRequest, NextResponse } from "next/server";
import { decoderTokenToClaims } from "./app/api/auth/decode-claims";

type Role = "ADMIN" | "AUTHOR" | "COMMENTATOR";

const adminRoutes = ["/manager","/admin", "/users", "/dashboard/admin", "/settings", "/desk/view"];
const authorRoutes = ["/manager","/desk/view"];
const commntatorRoutes = ["/manager","/community", "/messages", "/", "/announced"];

export const config = {
    matcher: [
        "/manager/:path*","/admin/:path*", "/users/:path*", "/settings", "/settings/:path*", "/desk/view", "/desk/view/:path*", "/messages", "/messages/:path*"
    ]
};

function canAccessRoute(path: string, role: Role) {
    switch (role) {
        case "ADMIN":
            return (adminRoutes.some(r => path.startsWith(r)) || authorRoutes.some(r => path.startsWith(r)) || commntatorRoutes.some(r => path.startsWith(r)));

        case "AUTHOR":
            return authorRoutes.some(r => path.startsWith(r));

        case "COMMENTATOR":
            return commntatorRoutes.some(r => path.startsWith(r));

        default:
            return false;
    };
};

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const token = request.cookies.get("jwt_back")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const claims = decoderTokenToClaims(token);
    if (!claims) {
        return NextResponse.redirect(new URL("/manager?error=invalid_token", request.url));
    }

    const role = claims.roles as Role;
    const hasAccess = canAccessRoute(path, role);

    if (!hasAccess) {
        return NextResponse.redirect(new URL("/manager?error=invalid_role", request.url));
    }

    return NextResponse.next();
}
`;