export const newPageTemplate = (singular: string) => `
export default function New${singular}Page() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-(--bg-section-100) p-10 transition-colors duration-500">
      create new ${singular}
    </div>
  );
}
`;
