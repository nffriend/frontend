import {} from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import UserBar from "../UserBar";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "@/components/Title";
import { useLastSpace } from "@/hooks/useData";

export default function HotCosmonauts() {
  const { data, loading, getNext } = useLastSpace();

  function onLoadNext() {
    if (loading) return;
    getNext();
  }

  return (
    <section className={cs.root}>
      <Title title="The latest" btn={"Next"} onClick={onLoadNext} />
      <div className={cs.list}>
        <Swiper className={cs.swiper} slidesPerView={"auto"} direction={"vertical"} grabCursor>
          {data.map((item: any, index: number) => {
            return (
              <SwiperSlide className={cs.slide} key={index}>
                <UserBar item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
