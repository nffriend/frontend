import {} from "react";
import cs from "./AdUser.module.scss";
import { useAccountPublicMenu, useAccountInfoPublic } from "@/hooks/useData";
import classNames from "classnames";
export default function AdUser() {
  const {adUser} = useAccountPublicMenu();
  const { data } = useAccountInfoPublic(adUser, true);

  function goto() {
    window.open(`${location.origin}/${data.address}`);
  }
  if(!data || !data.username) return null;
  return (
    <div className={classNames(cs.root, { [cs.show]: !!data.address })}>
      <img className={cs.back} src={data.cover_photo} alt="back" />
      <div className={cs.info}>
        <img className={cs.photo} src={data.avatar} alt="photo" />
        <div className={cs.user}>
          <div className={"all_nowarp"}>{data.username}</div>
          <div className={"all_nowarp"}>{data.bio}</div>
        </div>
      </div>
      <div className={cs.visit} onClick={goto}>
        Visit
      </div>
    </div>
  );
}
