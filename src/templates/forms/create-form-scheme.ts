export const formSchemeCreateTemplate = (singular?: string) => `
import * as yup from 'yup';

export const formSchema = yup.object({
  title: yup.string().required('Título é obrigatório'),
  content: yup.string().required('Conteúdo é obrigatório'),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
`;