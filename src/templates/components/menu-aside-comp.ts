export const menuAsideTemplate = () => `
"use client";

import { AlignJustifyIcon, FileEditIcon, FolderTreeIcon, HouseIcon, MessageCircleIcon, SettingsIcon, UserIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { useMenu } from "@/contexts/manager-context";

type NavItem = { icon: ReactElement; title: string; url: string; };

export const MenuAside: React.FC = () => {
  const { menuActive, setMenuActive } = useMenu();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems: NavItem[] = [
    { icon: <HouseIcon size={24} />, title: "Manager", url: "/manager" },
    { icon: <FileEditIcon size={24} />, title: "Posts", url: "/posts" },
    { icon: <FolderTreeIcon size={24} />, title: "Categorias", url: "/categories" },
    { icon: <MessageCircleIcon size={24} />, title: "Mensagens", url: "/messages" },
    { icon: <UserIcon size={24} />, title: "Portifolio", url: "/portifolios" },
    { icon: <SettingsIcon size={24} />, title: "Setting", url: "/settings" },
  ];

  return (
    <aside className={\`\${menuActive ? "w-20" : "w-72"} h-full bg-[#202020] border-r-8 border-[#0489a1] flex flex-col transition-all duration-100 overflow-hidden z-10\`}>
      {/* Botão toggle */}
      <button type="button" onClick={() => setMenuActive(!menuActive)} className="w-14 h-14 flex justify-center items-center text-white hover:bg-[#0489a1] transition-colors duration-300 mt-3 rounded-lg">
        <AlignJustifyIcon size={28} />
      </button>

      {/* Navegação */}
      <ul className="flex flex-col mt-4 gap-2 flex-1">
        {navItems.map((item: NavItem, index) => (
          <li key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={\`relative rounded-l-3xl transition-all duration-300 \${hoveredIndex === index ? "hover:bg-[#0489a1]" : ""}\`}>
            <Link href={item.url} className={\`flex items-center text-white py-3 transition-colors duration-200 \${hoveredIndex === index ? "text-[#0489a1] " : "text-white"}\`}>
              <span className="flex justify-center items-center min-w-15 h-15">
                {item.icon}
              </span>
              <span className={\`whitespace-nowrap text-base font-medium transition-opacity duration-300 \${menuActive ? "opacity-0 pointer-events-none" : "opacity-100"}\`}>
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};`;

export const menuAsideGenericTemplateUnitTest = (): string => {return (``);};
export const menuAsideGenericTemplateE2ETest = () => ``;