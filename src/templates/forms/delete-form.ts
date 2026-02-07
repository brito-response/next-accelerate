export const formDeleteTemplate = (singular?: string) =>  `
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

type FormDeleteResourceProps = { resource: string; resourceId: string; routerLinkCancel?: string; };

export const FormDeleteResource: React.FC<FormDeleteResourceProps> = ({ resource, resourceId, routerLinkCancel }) => {
  const router = useRouter();
  useEffect(() => {}, [resourceId, resource]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(\`\${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/delete/\${resource}/\${resourceId}\`, { method: "POST" });
      if (response.ok) {
        toast.success("Deletado com sucesso");
        router.push("/manager");
      }
      else {
        toast.error("Erro ao deletar recurso");
         router.push("/posts");
      };

    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    if (routerLinkCancel) {
      router.push(routerLinkCancel);
    } else {
      router.back();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-4 py-3">
      <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-300">
        Cancelar
      </button>

      <button type="submit" className="px-4 py-2 rounded bg-red-600 text-white">
        Confirmar e Deletar
      </button>
    </form>
  );
};

`;