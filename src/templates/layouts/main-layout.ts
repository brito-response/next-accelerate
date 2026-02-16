export const mainLayoutTemplate = () => `
import type { ReactNode } from "react";

type TypeProps = { children: ReactNode[] };

export const MainLayout = ({ children }: TypeProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];

  if (childrenArray.length > 4)
    throw new Error(
      "MainLayout só aceita no máximo 4 elementos filhos: header, toast, main e footer."
    );

  return (
    <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto]">
      <header className="max-h-50">{childrenArray[0]}</header>
      <div className="min-h-2.5 overflow-hidden bg-(--bg-section-100)">{childrenArray[1]}</div>
      <main className="min-h-[60vh]">{childrenArray[2]}</main>
      <footer className="h-87.5">{childrenArray[3]}</footer>
    </div>
  );
};
`;