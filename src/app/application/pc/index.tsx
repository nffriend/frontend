import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

import Search from "@/components/Search";
import DataList from "../components/DataList";
import Banner from "../components/Banner";
import Kit from "../components/Kit";
import AppList from "../components/AppList";

export default function Application() {
  return (
    <section className={cs.root}>
      <Search placeholder="Search applications" />
      <Banner />
      <AppList />
      <DataList title="Applications recommended for you" />
      <Kit title="Extension Kit" />
    </section>
  );
}
