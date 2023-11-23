import { object, string } from 'yup';

const findFindByStatusSchema = object({
  query: object({
    status: string().required('O campo de status é obrigatório.'),
  }),
});

export default findFindByStatusSchema;
