export async function imageToByteArray(
  file: File
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer()
  return new Uint8Array(buffer)
}

export function downloadByteArray(
  bytes: Uint8Array,
  filename = "image.bytea"
) {
  const safeBuffer = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(safeBuffer).set(bytes)

  const blob = new Blob([safeBuffer], {
    type: "application/octet-stream"
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}

export function byteArrayToImageURL(
  bytes: Uint8Array,
  mime: string
) {
  const safeBuffer = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(safeBuffer).set(bytes)

  const blob = new Blob([safeBuffer], { type: mime })
  return URL.createObjectURL(blob)
}

export function uint8ArrayToByteaHex(bytes: Uint8Array): string {
  let hex = "\\x";
  for (const b of bytes) {
    hex += b.toString(16).padStart(2, "0");
  }
  return hex;
}

export function byteaHexToUint8Array(bytea: string): Uint8Array {
  const clean = bytea.startsWith("\\x") ? bytea.slice(2) : bytea;
  const bytes = new Uint8Array(clean.length / 2);

  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substr(i, 2), 16);
  }

  return bytes;
}
