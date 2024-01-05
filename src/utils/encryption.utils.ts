// src/utils/encryption.utils.ts

import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt

export async function encryptPassword(
  password: string
): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
