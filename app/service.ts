import * as crypto from "crypto";

const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(String(process.env.SECRET_KEY || "my-secret-key"))
  .digest("base64")
  .substr(0, 32); // 32 bytes key
const IV = Buffer.from("1234567890123456");

export function encode(text: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  console.log(`[ENCODE] input: ${text} -> output: ${encrypted}`);
  return encrypted;
}

export function decode(text: string): string {
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  let decrypted = decipher.update(text, "base64", "utf8");
  decrypted += decipher.final("utf8");

  console.log(`[DECODE] input: ${text} -> output: ${decrypted}`);
  return decrypted;
}