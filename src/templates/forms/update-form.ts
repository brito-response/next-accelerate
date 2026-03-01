export const formUpdateTemplate = (resourceInSingular: string, resourceInPlural: string) => `
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { ${resourceInSingular} } from "@/utils/models/${resourceInPlural.toLocaleLowerCase()}";
import { formSchema, FormSchemaType } from "./form-scheme";
import { InputCustom } from "@/components/Inputs/InputCustom";
import { InputRichTextEditor } from "@/components/Inputs/InputRichTextEditor";
import { delay } from "@/utils/utils";

type FormEdit${resourceInSingular}Props = { ${resourceInSingular.toLocaleLowerCase()}: ${resourceInSingular}; };
export const FormEdit${resourceInSingular}: React.FC<FormEdit${resourceInSingular}Props> = ({ ${resourceInSingular.toLocaleLowerCase()} }) => {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(${resourceInSingular.toLocaleLowerCase()}.image ? \`\${process.env.NEXT_PUBLIC_BACKEND_URL}\${${resourceInSingular.toLocaleLowerCase()}.image}\` : null);
  const methods = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema), mode: "onChange",
    defaultValues: { title: ${resourceInSingular.toLocaleLowerCase()}.title, content: ${resourceInSingular.toLocaleLowerCase()}.content, status: ${resourceInSingular.toLocaleLowerCase()}.status },
  });

  const { handleSubmit, watch, formState: { isSubmitting } } = methods;
  const titlePreview = watch("title");
  const onSubmit = async (data: FormSchemaType) => {
    const payload = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
    if (Object.keys(payload).length === 0 && !photoFile) {
      toast.info("Nenhuma alteração para salvar");
      return;
    }

    try {
      const response = await fetch(\`\${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/${resourceInSingular.toLocaleLowerCase()}/\${${resourceInSingular.toLocaleLowerCase()}.${resourceInSingular.toLocaleLowerCase()}Id}\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) { toast.error("Erro ao atualizar o ${resourceInSingular.toLocaleLowerCase()}"); return; };

      if (photoFile) {
        const formData = new FormData();
        formData.append("photo", photoFile, photoFile.name);
        await delay(3000);
        const uploadResp = await fetch(\`\${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/images/${resourceInSingular.toLocaleLowerCase()}/\${${resourceInSingular.toLocaleLowerCase()}.${resourceInSingular.toLocaleLowerCase()}Id}\`, { method: "POST", body: formData });
        if (!uploadResp.ok) {
          toast.warning("os dados do ${resourceInSingular.toLocaleLowerCase()} foram salvos, mas a imagem não foi possivel carregar e atualizar, tente novamente...");
          router.refresh();
          return;
        }
      }

      toast.success("${resourceInSingular} atualizado com sucesso!");
      router.push("/manager")
    } catch {
      toast.error("Erro ao comunicar com o servidor");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (photoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">
          {titlePreview || "Prévia do título do ${resourceInSingular}"}
        </h1>
        <InputCustom name="title" label="Título do ${resourceInSingular}" />
        {photoPreview && (<img src={photoPreview} className="h-64 w-full object-cover rounded-lg" alt="Prévia" />)}

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <InputRichTextEditor name="content" label="Conteúdo" placeholder="Atualize o conteúdo do ${resourceInSingular}..." />

        <button type="submit" disabled={isSubmitting} className="bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"> Salvar
        </button>
      </form>
    </FormProvider>
  );
};

`;