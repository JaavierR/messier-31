import { useState } from "react";

export default function FontDisplay() {
  const [font, setFont] = useState("Roboto");
  return (
    <>
      <div>This is the font display component {font}</div>
      <button
        type="button"
        onClick={() => setFont("Vesterbro")}
        className="text-sm text-pink-500"
      >
        Change Font
      </button>
    </>
  );
}
