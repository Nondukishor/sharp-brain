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
