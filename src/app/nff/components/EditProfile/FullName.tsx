import React, { useState } from "react";
import cs from "./FullName.module.scss";

interface Props {
  v: string;
  onInput: (v: string) => void;
}

export default function FullName(props: Props) {
  function setNewV(e: React.ChangeEvent<HTMLInputElement>) {
    props.onInput(e.target.value);
  }
  return (
    <div className={cs.root}>
      <div className={cs.title}>Full name</div>
      <input maxLength={50} value={props.v} onInput={setNewV} />
    </div>
  );
}
