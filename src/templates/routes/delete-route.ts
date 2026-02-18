export const deleteTemplate = () => `
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface RouteContext { params: { resource: string, resourceId: string }; };

export async function POST(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  const { resource, resourceId } = params;

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    const jwt = token?.value ?? "not found";

    const response = await fetch(\`\${process.env.NEXT_BACKEND_URL}/\${resource}/\${resourceId}\`, {
      method: "DELETE",
      headers: {
        Authorization: \`Bearer \${jwt}\`,
      },
    });
    console.log("Response status from backend:", response.status);
    return NextResponse.json({ status: response.status });

  } catch (err) {
    console.error("Erro no route handler:", err);
    return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
  }
}

`;