import * as fontkit from "fontkit";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

export async function loadFont(e: InputFileEvent) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const blob = new Blob([file]);
  const fontFile = await blob.arrayBuffer();
  const font = fontkit.create(new Uint8Array(fontFile) as Buffer);
  console.log({ font });
  return font;
}
