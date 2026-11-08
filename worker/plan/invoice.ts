import { ApiError } from "./helpers";

export const MAX_INVOICE_SIZE = 5 * 1024 * 1024;

export async function validateInvoice(file: File) {
  if (!file.size || file.size > MAX_INVOICE_SIZE || file.name.length > 255) {
    throw new ApiError(
      "VALIDATION_ERROR",
      422,
      "Invoice harus berisi file maksimal 5 MiB dengan nama maksimal 255 karakter.",
    );
  }

  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());

  const signatures: Record<string, number[]> = {
    "application/pdf": [37, 80, 68, 70, 45],
    "image/png": [137, 80, 78, 71, 13, 10, 26, 10],
    "image/jpeg": [255, 216, 255],
  };

  if (
    !Object.hasOwn(signatures, file.type) ||
    !signatures[file.type].every((byte, index) => bytes[index] === byte)
  ) {
    throw new ApiError(
      "VALIDATION_ERROR",
      422,
      "Gunakan invoice PDF, JPG, atau PNG yang valid.",
    );
  }
}
