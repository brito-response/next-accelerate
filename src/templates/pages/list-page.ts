export const listPageTemplate = (resourceInSingular: string, resourceInPlural: string) => `
  import { ActionButtonsBar } from "@/components/ActionButtonsBar";
  import { ${resourceInSingular} } from "@/utils/models/${resourceInPlural.toLocaleLowerCase()}";
  import { FileCogIcon, FileText, TableConfigIcon } from "lucide-react";
  import Link from "next/link";

  async function get${resourceInPlural.toLocaleLowerCase()}(): Promise<${resourceInSingular}[]> {
    const response = await fetch(\`\${process.env.NEXT_BACKEND_URL}/${resourceInPlural.toLowerCase()}\`, {
      cache: "no-store",
    });
    if (!response.ok) return [];
    const ${resourceInPlural.toLocaleLowerCase()}: ${resourceInSingular}[] = await response.json();
    return ${resourceInPlural.toLocaleLowerCase()};
  }

  export default async function ${resourceInPlural}Page() {
    const ${resourceInPlural.toLocaleLowerCase()}: ${resourceInSingular}[] = await get${resourceInPlural.toLocaleLowerCase()}();

    return (
      <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Posts</h1>
                <p className="text-muted-foreground">
                  Lista de posts publicados na aplicação
                </p>
              </div>
            </div>
          </header>

          {/* Posts list */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {${resourceInPlural.toLocaleLowerCase().toLocaleLowerCase()}.map((${resourceInSingular.toLocaleLowerCase()}: ${resourceInSingular}) => (
              <article key={${resourceInSingular.toLocaleLowerCase()}.${resourceInSingular.toLocaleLowerCase()}Id} className="rounded-2xl bg-background p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 w-full bg-muted text-muted-foreground ">
                    <h2 className="font-semibold text-lg leading-snug">
                      {${resourceInSingular.toLocaleLowerCase()}.title}
                    </h2>
                    <div className="flex items-center justify-between">
                      <FileText className="w-5 h-5" />
                      <Link href={\`/${resourceInPlural.toLocaleLowerCase()}/\${${resourceInSingular.toLocaleLowerCase()}.${resourceInSingular.toLowerCase()}Id}/config\`} className="cursor-pointer p-2 hover:bg-amber-400 rounded-2xl">
                        <FileCogIcon className="w-5 h-5" />
                      </Link>

                    </div>

                  </div>
                </div>
                <ActionButtonsBar linkToEdit={\`/${resourceInPlural.toLocaleLowerCase()}/\${${resourceInSingular.toLocaleLowerCase()}.${resourceInSingular.toLocaleLowerCase()}Id}/edit\`} linkToDelete={\`/${resourceInSingular.toLowerCase()}/\${${resourceInSingular.toLocaleLowerCase()}.${resourceInSingular.toLowerCase()}Id}/delete\`} />
              </article>
            ))}
          </section>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="mt-20 text-center text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>Nenhum ${resourceInSingular.toLocaleLowerCase()} encontrado</p>
            </div>
          )}
        </div>
      </div>
    );
  };
`;
