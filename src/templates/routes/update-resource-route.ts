export const updateResourceTemplate = (resourceInSigular:string,resourceInPlural:string) => `
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ ${resourceInSigular.toLocaleLowerCase()}Id: string }> }) {
    const { ${resourceInSigular.toLocaleLowerCase()}Id } = await context.params;

    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        let jwt = !token ? "not found" : token.value;

        const response = await fetch(\`\${process.env.NEXT_PUBLIC_BACKEND_URL}/${resourceInPlural.toLocaleLowerCase()}/\${${resourceInSigular.toLocaleLowerCase()}Id}\`, {
            method: "PATCH",
            headers: {
                Authorization: \`Bearer \${jwt}\`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(await req.json()),
        });

        if (response.status === 200) {
            const post = await response.json();
            return NextResponse.json(post, { status: 200 });
        }
        return NextResponse.json({ message: "${resourceInPlural.toLocaleLowerCase()} not exists" }, { status: 404 });
    } catch (error) {
        throw new Error("Erro ao conectar no backend.");
    }
}
`;