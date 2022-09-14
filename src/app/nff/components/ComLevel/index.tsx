import { useMemo } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import { Progress } from "antd";
import { useBalance } from "@/hooks/useData";

import useUserType from "@/hooks/useUserType";
/**
 * 用户等级模块
 */
interface Props {
  account: string;
}

function toLocalNumber(num: number) {
  return num?.toLocaleString("en-US");
}

export default function ComLevel(props: Props) {
  const { personInfo } = useUserType();
  const { data } = useBalance(props.account);
  // console.log("personInfo:", personInfo);

  // 当前拥有的points
  const pointsNow = useMemo(() => {
    if (personInfo.level) {
      return personInfo.level.upgrading_need_points - personInfo.level.points_to_upgrade;
    }
    return 0;
  }, [personInfo.level]);

  // 百分比
  const percent = useMemo(() => {
    if (personInfo.level) {
      return (pointsNow / personInfo.level.upgrading_need_points) * 100;
    }
    return 0;
  }, [personInfo.level, pointsNow]);

  return (
    <div className={cs.root}>
      <div className={cs.levelBox}>
        <div className={cs.exp}>
          <div className={cs.passBox}>
            <img src="/static/nff/pass-back.png" alt="back" />
            <div className={cs.passInfo}>
              Pass Level <span>{personInfo.level?.level ?? 0}</span>
            </div>
          </div>
          <div className={cs.progressBox}>
            <div className={cs.pointsInfo}>
              <span>{toLocalNumber(pointsNow)}</span> / {toLocalNumber(personInfo.level?.upgrading_need_points || 0)} Points
            </div>
            <Progress className={classNames("level-progress", cs.pass)} percent={percent} showInfo={false} size="small" />
            <div className={cs.pointsTip}>{personInfo.level?.points_to_upgrade || ""} points til next level</div>
          </div>
        </div>
      </div>
      <div className={cs.levelInfo}>
        <div>
          <span>Pass Points</span>
          <span>{toLocalNumber(personInfo.pass_points || 0)}</span>
        </div>
        <div>
          <span>Crypto Currency (USD)</span>
          <span>*****</span>
          {/* <span>{Big.formatNum(Big.fixed(Big.fixed(data.total_balance, 8)))}</span> */}
        </div>
        <div>
          <span>NFT Amount</span>
          <span>{toLocalNumber(data.total_nft)}</span>
        </div>
      </div>
    </div>
  );
}
