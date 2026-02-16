export const formSchemeUpdateTemplate = (resourceInSingular: string,resourceInPlural: string) => `
import * as yup from "yup";
//import { ${resourceInSingular}Status } from "@/utils/models/${resourceInPlural.toLocaleLowerCase()}";

/**
 * Tipo base do formulário (PATCH → tudo opcional)
 */
export type FormSchemaType = {
  title?: string;
  content?: string;
  status?: PostStatus;
  image?: string;
};

/**
 * Schema PARCIAL
 */
export const formSchema = yup.object({
  title: yup.string().min(3, "O título deve ter pelo menos 3 caracteres").max(150, "O título deve ter no máximo 150 caracteres").notRequired(),
  content: yup.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres").notRequired(),
  status: yup.mixed<PostStatus>().oneOf(Object.values(PostStatus)).notRequired(),
  image: yup.string().url("A imagem deve ser uma URL válida").notRequired(),
});

`;