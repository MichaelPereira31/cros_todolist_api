import { object, string } from 'yup';

const findFindAllUserSchema = object({
  query: object({
    status: string().required('O campo de status é obrigatório.'),
    description: string(),
    title: string(),
  }),
});

export default findFindAllUserSchema;
