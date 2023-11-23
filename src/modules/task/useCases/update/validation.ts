import { object, string } from 'yup';

const updateTaskSchema = object({
  params: object({
    id: string().required('O campo de id é obrigatório.'),
  }),
  body: object({
    description: string(),
    title: string(),
    status: string(),
  }),
});

export default updateTaskSchema;
