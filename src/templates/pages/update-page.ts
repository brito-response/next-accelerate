export const updatePageTemplate = (resourceInSingular: string,resourceInPlural: string) => `
  import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  import { FormEdit${resourceInSingular} } from "@/forms/${resourceInPlural.toLocaleLowerCase()}";
  //import { ${resourceInSingular} } from "@/utils/models/${resourceInPlural.toLocaleLowerCase()}";
  import { Session } from "@/utils/route";
  import { getServerSession } from "next-auth";
  import { redirect } from "next/navigation";

  type ${resourceInSingular} = {}
  interface PageProps { params: { ${resourceInSingular.toLocaleLowerCase()}Id: string; }; };

  async function get${resourceInSingular}ById(${resourceInSingular.toLocaleLowerCase()}Id: string, token: string): Promise< ${resourceInSingular} | null> {
    try {
      const response = await fetch(\`\${process.env.NEXT_BACKEND_URL}/${resourceInPlural.toLocaleLowerCase()}/\${${resourceInSingular.toLocaleLowerCase()}Id}\`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: \`Bearer \${token}\`,
          },
        }
      );
      if (!response.ok) { return null; };
      const ${resourceInSingular.toLocaleLowerCase()}: ${resourceInSingular} = await response.json();
      return ${resourceInSingular.toLocaleLowerCase()};
    } catch (error) {
      console.error("Erro ao buscar ${resourceInSingular.toLocaleLowerCase()}:", error);
      return null;
    }
  };

  export default async function ${resourceInSingular}EditPage({ params }: PageProps) {
    const { ${resourceInSingular.toLocaleLowerCase()}Id } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const ${resourceInSingular.toLocaleLowerCase()}: ${resourceInSingular} | null = await get${resourceInSingular}ById(${resourceInSingular.toLocaleLowerCase()}Id, session.accessToken);
    return (
      <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          {${resourceInSingular.toLocaleLowerCase()} ? (
            <>
              {/* Informações do post */}
              <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow">
                <h1 className="text-2xl font-semibold">Editar ${resourceInSingular}</h1>
                <p className="text-sm opacity-70 mt-1">
                  Este ${resourceInSingular} foi • Criado em {${resourceInSingular.toLocaleLowerCase()}.createdAt.toString()}
                </p>
              </section>

              {/* Formulário */}
              <FormEdit${resourceInSingular} ${resourceInSingular.toLowerCase()}={${resourceInSingular.toLocaleLowerCase()}} />
            </>
          ) : (
            <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow text-center">
              <h1 className="text-xl font-semibold">
                Post não encontrado
              </h1>
              <p className="text-sm opacity-70 mt-2">
                O ${resourceInSingular} que você está tentando editar não existe ou foi removido.
              </p>
            </section>
          )}

        </div>
      </div>
    );
  };

`;
