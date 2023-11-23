import { createCipheriv, randomBytes } from 'crypto';

export type IEncryptDTO = {
  ivEncrypt?: string;
  password: string;
};

export function encrypt({ ivEncrypt, password }: IEncryptDTO): string {
  const iv = ivEncrypt ? Buffer.from(ivEncrypt, 'hex') : randomBytes(16);

  const cipher = createCipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPT_KEY as string),
    iv,
  );

  const encrypting = cipher.update(password);

  const encrypted = Buffer.concat([encrypting, cipher.final()]);
  return `${iv.toString('hex')}-${encrypted.toString('hex')}`;
}
