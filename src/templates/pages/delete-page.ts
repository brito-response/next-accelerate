export const deletePageTemplate = (resourceInSingular: string) => `
import { FormDeleteResource } from "@/forms/shared";

interface PageProps { params: { ${resourceInSingular.toLocaleLowerCase()}Id: string; }; };
export default async function ${resourceInSingular}DeletePage({ params }: PageProps) {
  const { ${resourceInSingular.toLocaleLowerCase()}Id } = await params;

  return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
    <h2 className="text-center">Tem certeza que vc quer deletar esse ${resourceInSingular}?</h2>
    <FormDeleteResource resource={"${resourceInSingular.toLocaleLowerCase()}"} resourceId={${resourceInSingular.toLocaleLowerCase()}Id} />
  </div>;
}
`;
