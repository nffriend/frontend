import {} from "react";
import cs from "./index.module.scss";

import Search from "@/components/Search";
import SpaceRanking from "../components/SpaceRanking";
import HotCosmonauts from "../components/HotCosmonauts";
import TheLatest from "../components/TheLatest";
import MediaBox from "../components/MediaBox";
import Foot from "../components/FootBar";

export default function Explore() {
  function onSearch(v: string, callback: () => void) {
    if (v) {
      callback();
      window.open(`${location.origin}/${v}`);
    }
  }
  return (
    <section className={cs.root}>
      <Search placeholder="Search by address" onSubmit={onSearch} />
      <SpaceRanking />
      <HotCosmonauts />
      <TheLatest />
      {/* <MediaBox area="title" src="/static/nff/search-t1.png" onClick={() => window.open("https://www.nffriend.com/")} /> */}
      <MediaBox src="/static/nff/search-t2.png" />
      <MediaBox src="/static/nff/search-t3.png" />
      <Foot />
    </section>
  );
}
