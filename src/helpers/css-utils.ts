import { injectGlobal } from "@emotion/css";

export function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function injectGlobalFontFace({
  url,
  fontFamily,
  fontWeight,
  fontStyle,
}: {
  url: string;
  fontFamily: string;
  fontWeight: number;
  fontStyle: "italic" | "normal";
}) {
  injectGlobal`
    @font-face {
        font-family: '${fontFamily}';
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
        ${
          url &&
          `src: url('${url}')
            format('opentype');`
        }
    }
    `;
}
