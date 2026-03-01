export const createResourceTemplate = (resourceInPlural:string) => `
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decoderTokenToClaims } from "../auth/decode-claims";

export async function POST(req: NextRequest): Promise<NextResponse> {

    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        let jwt = !token ? "not found" : token.value;

        const refreshtoken = (await cookieStore).get("jwt_back_refresh");
        let refreshJwt = !refreshtoken ? "not found" : refreshtoken.value;
        if (!jwt || !refreshJwt) return NextResponse.json({ message: "Token não encontrado." }, { status: 401 });

        const user = decoderTokenToClaims(jwt);
        const body = await req.json();
        const response = await fetch(\`\${process.env.NEXT_BACKEND_URL}/${resourceInPlural.toLocaleLowerCase()}\`, {
            method: 'POST',
            headers: {
                Authorization: \`Bearer \${jwt}\`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body, userId: user?.id }),
        });
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json") && response.status === 201) {
            const post = await response.json();
            return NextResponse.json(post, { status: 201 });
        }
        return NextResponse.json({ message: "The request contains errors, such as invalid data, incorrect format, or missing required fields." }, { status: 400 });

    } catch (error) {
        throw new Error("Erro ao conectar no backend.");
    }
}
`;