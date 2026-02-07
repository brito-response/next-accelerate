export const listPageTemplate = (resource: string) => `
export default function ${resource}Page() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-(--bg-section-100) p-10 transition-colors duration-500">
      ${resource} list page
    </div>
  );
}
`;
