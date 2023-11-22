import { object, string } from 'yup';

const findByIdUserSchema = object({
  params: object({
    id: string().required('O campo de id é obrigatório.'),
  }),
});

export default findByIdUserSchema;
