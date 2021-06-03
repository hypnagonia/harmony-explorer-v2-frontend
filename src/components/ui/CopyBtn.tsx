import { Clone } from "grommet-icons";
import React from "react";

const copyText = (value: string) => {
  const copyTextareaInput = document.createElement("textarea");
  copyTextareaInput.value = value;
  document.body.appendChild(copyTextareaInput);

  copyTextareaInput.focus();
  copyTextareaInput.select();

  try {
    document.execCommand("copy");
  } catch {
  } finally {
    document.body.removeChild(copyTextareaInput);
  }
};

export function CopyBtn(props: { value: string; onClick?: () => void }) {
  return (
    <Clone
      size="small"
      color="brand"
      onClick={() => {
        copyText(props.value);
        if (props.onClick) {
          props.onClick();
        }
      }}
      style={{ cursor: "pointer" }}
    />
  );
}
