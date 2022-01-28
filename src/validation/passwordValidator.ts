import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

export const genPawHash = (input: string) => {
  const salt = randomBytes(16).toString("hex");
  const hashedPawd = scryptSync(input, salt, 64).toString("hex");
  return `${salt}:${hashedPawd}`;
};

export const compareHash = (password: string, hashToCompare: string) => {
  const [salt, key] = hashToCompare.split(":");

  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  return timingSafeEqual(hashedBuffer, keyBuffer);
};
