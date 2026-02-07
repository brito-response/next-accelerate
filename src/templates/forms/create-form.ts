export const formCreateTemplate = (singular?: string) => `
  "use client";

  import { useForm, FormProvider } from 'react-hook-form';
  import { useRouter } from 'next/navigation';
  import { yupResolver } from '@hookform/resolvers/yup';
  import { formSchema, FormSchemaType } from './formredef-scheme';
  import { InputCustom, InputRichTextEditor } from '@/components/Shared/Inputs';
  import { toast } from 'react-toastify';
  import { useEffect, useState } from 'react';

  export const FormNewPost = () => {
    const router = useRouter();
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const methods = useForm<FormSchemaType>({ resolver: yupResolver(formSchema), mode: 'onChange', defaultValues: { title: '', content: '' } });
    const { handleSubmit, watch, formState: { isValid, isSubmitting } } = methods;
    const titlePreview = watch('title')

    const onSubmit = async (data: FormSchemaType) => {
      try {
        const response = await fetch(\`\${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/posts\`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const post = await response.json();

        if (response.status === 201 && Boolean(post.postId) && photoFile) {
          const formData = new FormData();
          formData.append("photo", photoFile, photoFile.name);

          const uploadResp = await fetch(\`\${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/images/posts/\${post.postId}\`, { method: "POST", body: formData });

          if (uploadResp.ok) {
            toast.success("recurso criado com sucesso!");
            router.refresh();
            router.push("/manager");
          }
          else { toast.error("Nenhuma foto foi selecionada."); }
        } else {
          toast.error("Erro ao criar o recurso.");
        }
      } catch (err) {
        toast.error("Erro ao comunicar com o servidor.");
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setPhotoFile(file);
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);
      } else {
        setPhotoPreview(null);
      }
    };


    useEffect(() => {
      return () => {
        if (photoPreview) {
          URL.revokeObjectURL(photoPreview);
        }
      };
    }, [photoPreview]);

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-6">
          {/* Preview title */}
          <h1 className="text-3xl font-bold text-(--textcolor)">{titlePreview || 'Prévia do título do post'}</h1>
          {/* title */}
          <InputCustom name="title" label="Título do post" required />

          {photoPreview && (
            <div className="mt-4 w-full h-64 rounded-lg overflow-hidden border border-gray-200">
              <img src={photoPreview} alt="Prévia da imagem" className="w-full h-full object-cover" />
            </div>
          )}

          <div >
            <label className="block text-sm font-medium text-gray-700">Imagem de exibição do Post</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 border border-dashed rounded-lg p-2 w-full" />
            {photoFile && <p className="text-sm text-green-600 mt-1">{photoFile.name}</p>}
          </div>

          {/* CONTENT */}
          <InputRichTextEditor name="content" label="Conteúdo" placeholder="Escreva seu post..." />

          {/* BOTTOM BAR */}
          <div className="sticky bottom-0 border-t pt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Tem certeza que quer criar esse post?
            </span>

            <div className="flex gap-3">
              <button type="button" className="text-sm px-4 py-2 rounded-md hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" disabled={!isValid || isSubmitting} className="px-6 py-2 bg-blue-700 text-white disabled:bg-gray-600 rounded-md hover:bg-blue-400">
                Criar
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    );
  };

`;
