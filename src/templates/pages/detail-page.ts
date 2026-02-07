export const detailPageTemplate = (singular: string) => `
interface PageProps {
  params: {
    ${singular}Id: string;
  };
}

export default function ${singular}DetailPage({ params }: PageProps) {
  const { ${singular}Id } = params;

  return (
    <div className="w-full min-h-screen flex flex-col bg-(--bg-section-100) p-10 transition-colors duration-500">
      ${singular} detail: {${singular}Id}
    </div>
  );
}
`;
