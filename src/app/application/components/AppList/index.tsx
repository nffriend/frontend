import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

import Title from "@/components/Title";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const mockData = new Array(10).fill("_");
export default function AppList() {
  return (
    <div className={cs.root}>
      <Title title={"My Applications"} />
      <div className={cs.list}>
        <Swiper className={cs.swiper} slidesPerView={"auto"} modules={[FreeMode]} freeMode grabCursor>
          {mockData.map((item, index) => {
            return (
              <SwiperSlide className={cs.slide} key={index}>
                <div className={cs.item}>
                  <img className={cs.head} src="/static/head.png" alt="head" />
                  <div className={cs.name}>Compound</div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
