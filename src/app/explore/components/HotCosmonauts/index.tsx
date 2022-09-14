import {} from "react";
import cs from "./index.module.scss";
import UserBar from "../UserBar";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "@/components/Title";
import { useHotSpace } from "@/hooks/useData";

export default function HotCosmonauts() {
  const { data, loading, getNext } = useHotSpace();

  function onLoadNext() {
    if (loading) return;
    getNext();
  }
  return (
    <section className={cs.root}>
      <Title
        title={
          <span className={cs.titlehot}>
            Hot Space
            <img src="/static/nff/icon-fire.png" alt="fire" />
          </span>
        }
        btn={"More"}
        onClick={onLoadNext}
      />
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
