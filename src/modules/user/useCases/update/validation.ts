import { object, string } from 'yup';

const updateUserSchema = object({
  body: object({
    name: string(),
    password: string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres.')
      .max(32, 'A senha não pode ter mais de 32 caracteres.'),
  }),
});

export default updateUserSchema;
