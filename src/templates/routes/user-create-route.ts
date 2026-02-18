export const usersCreateTemplate = () => `
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();

        const response = await fetch(\`\${process.env.NEXT_BACKEND_URL}/users\`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const contentType = response.headers.get("Content-Type");
        const usuario = await response.json();
        console.log(contentType);
        console.log(JSON.stringify(usuario));
        
        if (response.status === 201) {
            return NextResponse.json(usuario, { status: 201 });
        }
        console.log(response.status);
        return NextResponse.json({ message: "The request contains errors, such as invalid data, incorrect format, or missing required fields." }, { status: 400 });

    } catch (error) {
        throw new Error("Erro ao conectar no backend.");
    }
}
`;