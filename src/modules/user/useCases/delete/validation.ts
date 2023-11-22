import { object, string } from 'yup';

const deleteByIdUserSchema = object({
  params: object({
    id: string().required('O campo de id é obrigatório.'),
  }),
});

export default deleteByIdUserSchema;
