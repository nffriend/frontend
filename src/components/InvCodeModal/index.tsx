import { useState, useMemo } from "react";
import cs from "./index.module.scss";

import { message, Modal } from "antd";
import Steps from "./Steps";

import Big from "@/utils/big";
import EnterLoading from "../EnterLoading";
import InputBar from "@/components/InputBar";

import useUserType from "@/hooks/useUserType";
import useInvCode from "@/hooks/useInvCode";
import classNames from "classnames";

const step_4 = [{ words: ["Connect", "Wallet"] }, { words: ["Decentralized", "Identity"] }, { words: ["Invitation Code", "Activation"] }, { words: ["Enter", "Space"] }];
const step_3 = [{ words: ["Connect", "Wallet"] }, { words: ["Decentralized", "Identity"] }, { words: ["Enter", "Space"] }];

export default function InvCodeModal() {
  const [fresh, setFresh] = useState(false);
  const { account, userInfo } = useUserType(fresh);
  const { stepType, invCodeShow, postInv, setInvCodeShow } = useInvCode();
  const [loading, setLoading] = useState(false);

  const [stepNow, setStepNow] = useState(3);
  async function onActivate(invCode: string) {
    setLoading(true);
    setStepNow(4);
    const res = await postInv(invCode);
    setLoading(false);
    if (!res) {
      message.error("error");
      setStepNow(3);
    }
  }

  const stepData = useMemo(() => {
    switch (stepType) {
      case 202:
        return step_4;
      case 203:
        return step_3;
      default:
        return [];
    }
  }, [stepType]);

  function onClose() {
    setFresh(true);
    setInvCodeShow(false);
    localStorage.setItem("isLogout", "1");
  }

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <div className={cs.pic}></div>
        <div className={cs.infoBox}>
          {/** 步骤条 **/}
          <Steps stepData={stepData} stepNow={stepNow} />

          {/** 202 第三步内容 **/}
          {!!(stepType === 202 && stepNow === 3) && (
            <section className={cs.section}>
              <div className={cs.title}>
                <span>Welcome</span>
                <span className={cs.account}>{Big.addMosaic(account || "")}</span>
                <br />
                <span>Please enter the invitation code to activate your space !</span>
              </div>

              <InputBar onSubmit={onActivate} loading={loading} />

              <div className={cs.tipsBox}>
                <p className={cs.t}>Invitation codes {"&"} How to get one:</p>

                <ul>
                  <li>1. Shared by existing users</li>
                  <li>2. Follow community airdrop events</li>
                  <li>3. Enter Discord and complete the pre-registration task</li>
                </ul>
                <br />
                <p>* Note: All Non-Fungible Friend NFT holders will be granted access to the pre-a test.</p>
              </div>
            </section>
          )}

          {/** 202 第四步内容 **/}
          {!!(stepType === 202 && stepNow === 4) && (
            <section className={cs.section}>
              <div className={cs.title}>
                <span className={cs.normal}>Congratulations on completing all the steps！</span>
                <br />
                <span className={cs.normal}>You will become</span>
                <span>the NO.{userInfo.space_id} space owner</span>
                <img className={cs.successIcon} src="/static/nff/invcode-success.png" alt="success" />
              </div>
              {userInfo.address ? (
                <div className={classNames("btn", cs.enterBtn)} onClick={onClose}>
                  Enter Space
                </div>
              ) : (
                <EnterLoading />
              )}
            </section>
          )}

          {/** 203 第三步内容 **/}
          {!!(stepType === 203 && stepNow === 3) && (
            <section className={cs.section}>
              <div className={cs.title}>
                <span>Welcome</span>
                <span className={cs.account}>{Big.addMosaic(account || "")}</span>
                <br />
                <span>No need to get the referral code, NFT holders can enter the pre-a test right away</span>
                <br />
                <br />
                <span className={cs.normal}>You are</span>
                <span>the NO.{userInfo.space_id} spae owner</span>
                <img className={cs.successIcon} src="/static/nff/invcode-success.png" alt="success" />
              </div>
              {!userInfo.address ? (
                <div className={classNames("btn", cs.enterBtn)} onClick={onClose}>
                  Enter Space
                </div>
              ) : (
                <EnterLoading />
              )}
            </section>
          )}

          {/** 占位 **/}
          <div className={cs.auto}></div>

          {/** 底部 **/}
          <div className={cs.foot}>
            <div className={cs.close} onClick={onClose}>
              Give up and leave
            </div>
            <div className={cs.links}>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <img src="/static/nff/icon-twitter-dark.png" alt="link" />
              </a>
              <a href="https://ins.com" target="_blank" rel="noreferrer">
                <img src="/static/nff/icon-media-dark.png" alt="link" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Modal visible={invCodeShow} modalRender={() => buildModalBody()} className={"modal-self"} />;
}
