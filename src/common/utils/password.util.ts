// @ts-ignore
import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  const hash = await bcrypt.hash(password, 10);
  return hash as string;
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  const result = await bcrypt.compare(password, hash);
  return result as boolean;
}
