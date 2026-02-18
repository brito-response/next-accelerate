
export const detailPageTemplate = (resourceInSingular: string) => `
  interface PageProps {params: {${resourceInSingular.toLocaleLowerCase()}Id: string;};};

  export default function ${resourceInSingular}DetailPage({ params }: PageProps) {
    const { ${resourceInSingular.toLocaleLowerCase()}Id } = params;
    return (
      <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        ${resourceInSingular} detail: {${resourceInSingular.toLocaleLowerCase()}Id}
      </div>
    );
  }
`;
