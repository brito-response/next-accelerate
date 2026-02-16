export const nextRequestApiTemplate = () => `
export interface IAuthenticateUser { email: string | undefined; password: string | undefined; clientType: string; };

export const requestAuthenticationUser = async (user: IAuthenticateUser) => {
    const resposta = await fetch(\`\${process.env.NEXT_BACKEND_URL}/auth/login\`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    if (resposta.ok) return await resposta.json();
    return null;

};
`;