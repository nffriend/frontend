import { useRef } from "react";
import cs from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import Message from "./Message";
import NoData from "@/components/NoData";
import Replay from "./Replay";
import { message } from "antd";
import useUserType from "@/hooks/useUserType";
import useMessage from "@/hooks/useMessage";

export default function ComMessage() {
  const { isMySelf, accountNow, token, pid } = useUserType();
  const {
    postMessages,
    refresh,
    loading,
    data,
    isDone,
    deleteMessage,
    getNext,
  } = useMessage(accountNow || "", token);

  // 加载更多留言
  function onReachEnd() {
    if (loading || isDone || !data.length) return;
    getNext();
  }

  // 提交留言
  async function onReplaySubmit(msg: string, callback: () => void) {
    const res = await postMessages(msg, pid);
    if (res) {
      refresh();
      callback();
    }
  }

  // 删除留言
  async function onDelete(id: string) {
    if (isMySelf === 1 && id) {
      const res = await deleteMessage(id);
      if (res) {
        refresh();
      }
    }
  }

  return (
    <div className={cs.root}>
      <div className={cs.title}>
        {isMySelf ? (
          <span>Message {data.length ? `(${data.length})` : ""}</span>
        ) : (
          <span>Message Board</span>
        )}
      </div>
      {isMySelf !== 1 && (
        <>
          <Replay onSubmit={onReplaySubmit} loading={loading} />
          <div className={cs.titleMini}>
            Message {data.length ? `(${data.length})` : ""}
          </div>
        </>
      )}

      {!!data.length ? (
        <div className={cs.list}>
          <Swiper
            className={cs.swiper}
            slidesPerView={"auto"}
            modules={[FreeMode]}
            direction={"vertical"}
            freeMode
            grabCursor
            onReachEnd={onReachEnd}
          >
            {data.map((item: any, index: number) => {
              return (
                <SwiperSlide className={cs.slide} key={index}>
                  <Message
                    item={item}
                    isMySelf={isMySelf === 1}
                    loading={loading}
                    onDelete={onDelete}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <NoData image="/static/nff/icon-nodata1.png" info="Sorry:(no data" />
      )}
    </div>
  );
}
