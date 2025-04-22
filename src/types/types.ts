export type TBlock =
  | { type: "text"; data: string }
  | { type: "image"; data: { url: string } }
  | { type: "file"; data: { file: File; name: string } }
  | { type: "code"; data: string }
  | { type: "quote"; data: string };
