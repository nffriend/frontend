import {} from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import Activity from "./Activity";
import { useActives } from "@/hooks/useData";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import NoData from "@/components/NoData";

interface Props {
  account: string;
}
export default function ComMyActivity(props: Props) {
  const { data, loading } = useActives(props.account);
  function onReachEnd() {
    // ...
  }
  return (
    <div className={cs.root}>
      <div className={cs.title}>My Activity</div>
      <div className={cs.box}>
        <Activity account={props.account} />
      </div>
      <div className={cs.box}>
        <div className={cs.t2}>Recently Active</div>

        <div className={cs.list}>
          <Swiper className={cs.swiper} slidesPerView={"auto"} direction={"horizontal"} modules={[FreeMode]} grabCursor freeMode onReachEnd={onReachEnd}>
            {data.map((item: any, index: number) => {
              return (
                <SwiperSlide className={cs.slide} key={index}>
                  <img src={item.info.image_url} className={cs.customImg} alt="img" />
                </SwiperSlide>
              );
            })}
            <SwiperSlide className={cs.slide}>
              <img src="/static/nff/icon-wenhao.png" className={cs.customImg} alt="img" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
