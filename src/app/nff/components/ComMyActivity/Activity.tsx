import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import cs from "./Activity.module.scss";
import dayjs from "dayjs";
import { Scrollbar, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStatistics } from "@/hooks/useData";
import _ from "lodash";
interface DatesData {
  year: number;
  months: { month: number; str: string; [keys: string]: any }[];
}

interface Props {
  account: string;
}
export default function Activity(props: Props) {
  const { data, totalMax, totalDefi, totalNft, totalOther } = useStatistics(props.account);
  // console.log("data不见？？？", data);
  const [dates, setDates] = useState<DatesData[]>([]);
  useEffect(() => {
    const monthStrs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const basicMonth = 48; // 获取48个月数据

    // 生成前3年的表格数据
    function makeDates() {
      const dateData: DatesData[] = [];

      for (let i = basicMonth; i >= 0; i--) {
        const target = dayjs().subtract(i, "month");
        const year = target.year();
        let y = dateData.find(item => item.year === target.year());
        if (!y) {
          y = { year, months: [] };
          dateData.push(y);
        }
        const m = target.month();
        y.months.push({ month: target.month(), str: monthStrs[m], nft: 0, defi: 0, other: 0 });
      }
      setDates(dateData);
    }

    makeDates();
  }, []);

  const showData = useMemo(() => {
    const d = data || [];
    const datesTemp = _.cloneDeep(dates);

    for (let k = 0; k < d.length; k++) {
      const item = d[k];
      const y = datesTemp.find(year => year.year == item._id.year);
      if (!y) continue;

      const m = y.months.find(month => Number(month.month) === item._id.month - 1);
      if (!m) continue;
      m[item._id.type] = item.total;
    }

    return datesTemp;
  }, [data, dates]);

  const [swiperObj, setSwiperObj] = useState<any>(null);
  useEffect(() => {
    if (swiperObj) {
      // console.log("你执行了吗", swiperObj);
      swiperObj.setProgress(1);
    }
    return () => {
      setSwiperObj(null);
    };
  }, [swiperObj]);

  return (
    <div className={cs.root}>
      <div className={cs.menu}>
        <div>
          <span>Defi</span>
          <div className={classNames(cs.passBox, cs.p1)}>
            <div style={{ width: `${(totalDefi / totalMax) * 100}%` }}></div>
          </div>
        </div>
        <div>
          <span>NFTs</span>
          <div className={classNames(cs.passBox, cs.p2)}>
            <div style={{ width: `${(totalNft / totalMax) * 100}%` }}></div>
          </div>
        </div>
        <div>
          <span>Other</span>
          <div className={classNames(cs.passBox, cs.p3)}>
            <div style={{ width: `${(totalOther / totalMax) * 100}%` }}></div>
          </div>
        </div>
      </div>
      <div className={cs.dateBox}>
        <Swiper grabCursor className={cs.swiper} modules={[FreeMode, Scrollbar]} slidesPerView={"auto"} freeMode={true} scrollbar={{ draggable: true, el: ".scroll-bar", snapOnRelease: false }} onSwiper={setSwiperObj}>
          {showData.map((item, index) => {
            return (
              <SwiperSlide className={cs.slide} key={index}>
                <div className={cs.yearBox}>
                  <div className={cs.monthBox}>
                    {item.months.map((month, monthIndex) => {
                      return (
                        <ul className={classNames(cs.oneMonth, { [cs.first]: month.str === "Jan" })} key={monthIndex}>
                          <li className={classNames(cs.m, { [cs.h1]: month.defi > 0 })} />
                          <li className={classNames(cs.m, { [cs.h2]: month.nft > 0 })} />
                          <li className={classNames(cs.m, { [cs.h3]: month.other > 0 })} />
                          <li className={cs.mStr}>{month.str}</li>
                        </ul>
                      );
                    })}
                  </div>
                  <div className={cs.theYear}>{item.year}</div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={classNames(cs.scrollBar, "scroll-bar")}></div>
      </div>
    </div>
  );
}
