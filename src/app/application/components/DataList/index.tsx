import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";

import Title from "@/components/Title";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
const mockData = new Array(10).fill("_");

interface Props {
  title: string;
}
export default function Recommend(props: Props) {
  return (
    <section className={cs.root}>
      <Title title={props.title} />
      <div className={cs.list}>
        <Swiper className={cs.swiper} slidesPerView={"auto"} modules={[FreeMode]} freeMode grabCursor>
          {mockData.map((item, index) => {
            return (
              <SwiperSlide className={cs.slide} key={index}>
                <div className={classNames({ [cs.first]: !index })}>
                  <Card />
                  <Card isRow2 />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
