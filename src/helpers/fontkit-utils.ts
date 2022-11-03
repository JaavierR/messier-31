import * as fontkit from "fontkit";

export async function loadFont(file: File) {
  const blob = new Blob([file]);
  const fontFile = await blob.arrayBuffer();
  return fontkit.create(new Uint8Array(fontFile) as Buffer);
}
