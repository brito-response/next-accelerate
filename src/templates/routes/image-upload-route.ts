export const imageUploadTemplate = () => `
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, context: { params: Promise<{ resource: string; resourceId: string }> }) {
  const { resource, resourceId } = await context.params;

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    const jwt = token?.value ?? "not found";
    const backendForm = new FormData();
    const formData = await req.formData();
    const photo = formData.get("photo");

    if (photo && photo instanceof Blob) {
      backendForm.append("file", photo);
    } else {
      return NextResponse.json({ message: "Nenhuma foto enviada" }, { status: 400 });
    }

    const init: RequestInit & { duplex?: 'half' } = {
      method: "PATCH",
      headers: {
        Authorization: \`Bearer \${jwt}\`,
      },
      body: backendForm,
      duplex: "half",
    };

    const response = await fetch(\`\${process.env.NEXT_BACKEND_URL}/\${resource}/\${resourceId}/photo\`, init);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("Erro no route handler:", err);
    return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
  }
}
`;