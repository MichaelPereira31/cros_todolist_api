import { object, string } from 'yup';

const createTaskSchema = object({
  body: object({
    description: string().required('O campo de descrição é obrigatório.'),
    title: string().required('O campo de titulo é obrigatório.'),
    status: string().required('O campo de status é obrigatório.'),
    parentId: string(),
  }),
});

export default createTaskSchema;
