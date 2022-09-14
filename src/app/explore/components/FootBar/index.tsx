import { useState } from "react";
import cs from "./index.module.scss";
import Big from "@/utils/big";
import { getStatistics } from "@/hooks/useData";
import { useAsync } from "react-use";

export default function SpaceRanking() {
  const [data, setData] = useState<any>({});
  useAsync(async () => {
    const res = await getStatistics();
    // console.log("ddd:", res);
    setData(res);
  }, []);

  return (
    <section className={cs.root}>
      <div>
        <span>Total Space Created in NFF Metaverse:</span>
        <span>{Big.formatNum(data.total_space || 0)}</span>
      </div>
      <div>
        <span>Total Visits in NFF Metaverse:</span>
        <span>{Big.formatNum(data.total_visitor || 0)}</span>
      </div>
      <div>
        <span>Total NFF Point Volume:</span>
        <span>{Big.formatNum(data.total_pass_points || 0)}</span>
      </div>
    </section>
  );
}
