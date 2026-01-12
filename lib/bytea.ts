// Imagem → BYTEA
export async function imageToByteArray(
  file: File
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer()
  return new Uint8Array(buffer)
}

// BYTEA → download (CORRIGIDO)
export function downloadByteArray(
  bytes: Uint8Array,
  filename = "image.bytea"
) {
  // 🔒 cria ArrayBuffer REAL
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

// BYTEA → imagem (CORRIGIDO)
export function byteArrayToImageURL(
  bytes: Uint8Array,
  mime: string
) {
  const safeBuffer = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(safeBuffer).set(bytes)

  const blob = new Blob([safeBuffer], { type: mime })
  return URL.createObjectURL(blob)
}
