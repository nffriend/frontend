import { useMemo } from "react";
import cs from "./index.module.scss";
import classNames from "classnames";
import Card from "./Card";
import Title from "@/components/Title";
import { useRecommSpace } from "@/hooks/useData";

export default function SpaceRanking() {
  const { data } = useRecommSpace();

  const dataArr = useMemo(() => {
    const resArr = [];
    for (let i = 0, b = 0; i < data.length; i++) {
      if (!b) {
        resArr.push([data[i]]);
        b = 1;
      } else {
        resArr[resArr.length - 1].push(data[i]);
        b = 0;
      }
    }
    return resArr;
  }, [data]);

  return (
    <section className={cs.root}>
      <Title title="Recommended for you" noPL />
      <div className={cs.list}>
        {dataArr.map((item: any, index: number) => {
          return (
            <div className={classNames({ [cs.first]: !index })} key={index}>
              <Card source={item[0]} />
              {!!item[1] && <Card source={item[1]} isRow2 />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
