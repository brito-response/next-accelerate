export const formSchemeUpdateTemplate = (resourceInSingular: string,resourceInPlural: string) => `
import * as yup from "yup";
import { ${resourceInSingular}Status } from "@/utils/models/${resourceInSingular.toLocaleLowerCase()}";
// ${resourceInPlural} se tiver campo "imagem" lembrar nao incluir, uploadde imagem pesada deve ser feita separadamente

export const formSchema = yup.object({
  title: yup.string().transform((value) => (value === "" ? undefined : value)).min(3, "O título deve ter pelo menos 3 caracteres").max(150, "O título deve ter no máximo 150 caracteres").nullable().defined(),
  content: yup.string().transform((value) => (value === "" ? undefined : value)).min(10, "O conteúdo deve ter pelo menos 10 caracteres").nullable().defined(),
  status: yup.mixed<${resourceInSingular}Status>().oneOf(Object.values(${resourceInSingular}Status)).nullable().defined(),
});

export type FormSchemaType = yup.Asserts<typeof formSchema>;
`;