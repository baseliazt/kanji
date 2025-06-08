// lib/hashids.ts
import Hashids from "hashids";

const hashids = new Hashids(process.env.SECRET_HASH_ID, 10); // salt + min length

export function encodeId(id: number): string {
  return hashids.encode(id);
}

export function decodeId(hash: string): number | null {
  const [decoded] = hashids.decode(hash);
  return typeof decoded === "number" ? decoded : null;
}
