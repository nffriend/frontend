import {} from "react";
import cs from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Activity from "./Activity";
import { FreeMode } from "swiper";
import { useTimeLine } from "@/hooks/useData";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import NoData from "@/components/NoData";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  account: string;
}

export default function ComRecentActivity(props: Props) {
  const { data, loading, isDone, getNext } = useTimeLine(props.account);

  function onReachEnd() {
    if (loading || isDone || !data.length) return;
    getNext();
  }
  return (
    <div className={cs.root}>
      <div className={cs.title}>Recent Activity {loading && <Spin indicator={antIcon} />}</div>
      {!!data.length && (
        <div className={cs.list}>
          <Swiper className={cs.swiper} slidesPerView={"auto"} direction={"vertical"} modules={[FreeMode]} grabCursor freeMode onReachEnd={onReachEnd}>
            {data.map((item: any, index: number) => {
              return (
                <SwiperSlide className={cs.slide} key={index}>
                  <Activity isLast={index === data.length - 1} item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
      {!data.length && !loading && <NoData image="/static/nff/icon-nodata1.png" info="Sorry:(no data" />}
    </div>
  );
}
