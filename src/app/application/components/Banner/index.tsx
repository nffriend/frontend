import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const mockData = new Array(5).fill("_");
export default function Banner() {
  return (
    <div className={cs.root}>
      <Swiper className={cs.swiper} modules={[Pagination]} grabCursor pagination={{ clickable: true }}>
        {mockData.map((item, index) => {
          return (
            <SwiperSlide className={cs.slide} key={index}>
              <img className={cs.pic} src="/static/test.png" alt="pic" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
