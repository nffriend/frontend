import { useState } from "react";
import cs from "./index.module.scss";

interface Props {
  placeholder?: string;
  onSubmit?: (value: string, callback: () => void) => void;
}
export default function Search(props: Props) {
  const [v, setV] = useState("");

  function onSearch() {
    props.onSubmit?.(v, callback);
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    setV(e.target.value);
  }

  function callback() {
    setV("");
  }

  function actionOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch();
    }
  }
  return (
    <div className={cs.root}>
      <div className={cs.searchBtn} onClick={onSearch}>
        <img src="/static/nff/icon-search.png" alt="search" />
      </div>
      <input placeholder={props.placeholder || ""} maxLength={50} onInput={onInput} onKeyDown={actionOnEnter} />
    </div>
  );
}
