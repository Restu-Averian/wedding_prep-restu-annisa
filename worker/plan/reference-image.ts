import { ApiError } from "./helpers";

export async function candidateBody(request: Request) {
  if (
    !request.headers
      .get("Content-Type")
      ?.toLowerCase()
      .startsWith("multipart/form-data;")
  )
    return { request };

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    throw new ApiError("VALIDATION_ERROR", 422, "Form referensi tidak valid.");
  }
  const fields: Record<string, unknown> = Object.create(null);
  let image: File | undefined;
  for (const [key, entry] of form) {
    if (form.getAll(key).length !== 1)
      throw new ApiError(
        "VALIDATION_ERROR",
        422,
        "Setiap field hanya boleh diisi sekali.",
      );
    if (key === "image") {
      if (
        !(entry instanceof File) ||
        !entry.size ||
        entry.size > 5 * 1024 * 1024 ||
        entry.name.length > 255
      ) {
        throw new ApiError(
          "VALIDATION_ERROR",
          422,
          "Gambar harus berupa file maksimal 5 MiB.",
        );
      }
      const bytes = new Uint8Array(await entry.slice(0, 12).arrayBuffer());
      const matches = (signature: number[], start = 0) =>
        signature.every((byte, i) => bytes[start + i] === byte);
      const valid =
        entry.type === "image/png"
          ? matches([137, 80, 78, 71, 13, 10, 26, 10])
          : entry.type === "image/jpeg"
            ? matches([255, 216, 255])
            : entry.type === "image/webp" &&
              matches([82, 73, 70, 70]) &&
              matches([87, 69, 66, 80], 8);
      if (!valid)
        throw new ApiError(
          "VALIDATION_ERROR",
          422,
          "Gunakan gambar JPEG, PNG, atau WebP yang valid.",
        );
      image = entry;
    } else {
      if (
        typeof entry !== "string" ||
        (key === "removeImage" && !["true", "false"].includes(entry))
      ) {
        throw new ApiError(
          "VALIDATION_ERROR",
          422,
          "Field referensi tidak valid.",
        );
      }
      fields[key] =
        key === "price"
          ? entry.trim()
            ? Number(entry)
            : null
          : key === "removeImage"
            ? entry === "true"
            : entry;
    }
  }
  return {
    request: new Request(request.url, {
      method: request.method,
      body: JSON.stringify(fields),
    }),
    image,
  };
}

export async function cleanupImage(bucket: R2Bucket, key?: string | null) {
  if (!key) return;
  try {
    await bucket.delete(key);
  } catch {
    console.error("REFERENCE_IMAGE_CLEANUP_FAILED");
  }
}
