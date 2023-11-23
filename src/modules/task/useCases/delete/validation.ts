import { object, string } from 'yup';

const deleteByIdTaskSchema = object({
  params: object({
    id: string().required('O campo de id é obrigatório.'),
  }),
});

export default deleteByIdTaskSchema;
