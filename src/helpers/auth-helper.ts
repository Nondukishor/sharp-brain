import * as bcrypt from 'bcrypt';

/**
 * @param password
 * @returns Promise<string>
 */
export const hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

/**
 *
 * @param plainPass
 * @param hashPass
 * @returns  Promise<boolean>
 */
export const isMatch = async (
  plainPass: string,
  hashPass: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPass, hashPass);
};

const rand = () => Math.random().toString(36).slice(2);
export const tokenGenerator = (length: number) =>
  (rand() + rand() + rand() + rand()).slice(0, length);
