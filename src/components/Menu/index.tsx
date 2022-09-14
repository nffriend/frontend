import { useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import cs from "./index.module.scss";
import { Tooltip, Badge } from "antd";
import { useRouter } from "next/router";

import useMenu from "@/hooks/useMenu";
import useUserType from "@/hooks/useUserType";
import useWallet from "@/hooks/useWallet";

import ImageSelf from "@/components/ImageSelf";
import AdUser from "./AdUser";
import useLayout from "@/hooks/useLayout";

interface Menu {
  label: string;
  path: string;
  icon: string;
  isNoConnect?: boolean;
}

// 自己的菜单
const menus: Menu[] = [
  { label: "My Space", path: "/", icon: "/static/nff/icon-space.png" },
  { label: "Manage Space", path: "/", icon: "/static/nff/icon-edit-d.png" },
  { label: "Add New", path: "/add", icon: "/static/nff/icon-edit-d.png" },
  { label: "Explore", path: "/explore", icon: "/static/nff/icon-search.png" },
  { label: "Invitations", path: "/invitations", icon: "/static/nff/icon-invit-d.png" },
];

// 查看别人时的菜单
const menusOther: Menu[] = [{ label: "Go Back", path: "/", icon: "/static/nff/icon-space.png" }];

// 未链接钱包时自己的菜单
const menusNoConnect: Menu[] = [
  { label: "My Space", path: "/", icon: "/static/nff/icon-space.png", isNoConnect: true },
  { label: "Explore", path: "/explore", icon: "/static/nff/icon-search.png", isNoConnect: true },
];

// 不在menus中的额外菜单
const menusExtra: Menu[] = [{ label: "Setting", path: "/setting", icon: "/static/nff/icon-setting-w.png" }];

export default function MenuCom() {
  const router = useRouter();
  const { pid } = router.query;

  const { isMySelf, userInfo, account, setIsMySelf } = useUserType(true);

  const { isConnected, setWalletShow, account: web3Account } = useWallet();

  const [menuType, setMenuType] = useMenu(); // 控制是否进入编辑状态

  const [chose, setChose] = useState("My Space");

  const [isShow, setShow] = useState(false);

  const { restoreLayout } = useLayout(account || "");

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  // 是访问自己还是访问别人
  useEffect(() => {
    if (pid && typeof pid === "string") {
      if (pid.toUpperCase() !== account?.toUpperCase()) {
        setIsMySelf(pid as string);
      } else {
        router.replace("/");
        setIsMySelf("");
      }
    }
  }, [pid, account]);

  useEffect(() => {
    if (!pid && isMySelf === -1) {
      setIsMySelf("");
    }
  }, [pid, isMySelf]);

  const exCludeList = ['Explore'];
  function onMenuClick(type: string, isNoConnect?: boolean) {
    if (isNoConnect && !exCludeList.includes(type)) {
      router.push("/");
      setChose("My Space");
      setWalletShow(true);
      return;
    }

    switch (type) {
      case "My Space":
        router.push("/");
        break;
      case "Explore":
        router.push("/explore");
        break;
      case "Application":
        router.push("/application");
        break;
      case "Notice":
        router.push("/notice");
        break;
      case "Go Back":
        router.push("/");
        break;
      case "Invitations":
        router.push("/invitations");
        break;
      case "Setting":
        router.push("/setting");
        break;
      case "Add New":
        router.push("/add");
        break;
    }
    setChose(type);
  }

  const [collapsed, setCollapsed] = useState(false); // 是否收起菜单
  function toggleMenu() {
    setCollapsed(prev => !prev);
  }

  function onEdit() {
    router.push("/");
    setMenuType({ isEdit: true });
  }

  useEffect(() => {
    setMenuType({ isClose: collapsed });
  }, [collapsed]);

  useEffect(() => {
    const pathname = location.pathname;
    const path = [...menus, ...menusExtra].find(item => item.path === pathname);
    if (path) {
      setChose(path.label);
    } else {
      setChose("");
    }
    if (pathname === "/") {
      setIsMySelf("");
    } else {
      if (menuType.isEdit) {
        setMenuType({ isEdit: false });
      }
    }
  }, [menuType, setIsMySelf, setMenuType]);

  const menuInUse = useMemo(() => {
    if (isMySelf === 0) {
      return menusOther;
    }

    if (isMySelf === 1) {
      if (isConnected) {
        return menus;
      } else {
        return menusNoConnect;
      }
    }

    return [];
  }, [isMySelf, isConnected]);

  return (
    <div className={classNames(cs.root, { [cs.collapsed]: collapsed })}>
      {/** 菜单主体 **/}
      <div className={classNames(cs.sticky, { [cs.show]: isShow })}>
        <div className={cs.logo}>
          <img className={cs.logoImg} src="/static/nff/logoBig.png" alt="logo" />
          <div className={cs.sideBtn} onClick={toggleMenu}>
            <div className={cs.back}></div>
            <i className="iconfont icon-play" />
          </div>
        </div>

        {
          <ul className={cs.menuList}>
            {menuInUse.map(item => {
              return item.label !== "Manage Space" ? (
                <li className={classNames({ [cs.chosed]: chose === item.label, [cs.noHigh]: item.label === "My Space" && menuType.isEdit })} onClick={() => onMenuClick(item.label, item.isNoConnect)} key={item.label}>
                  <Tooltip placement="right" title={item.label}>
                    {item.label === "Notice" ? (
                      <Badge dot>
                        <img className={cs.icon} src={item.icon} alt="space" />
                      </Badge>
                    ) : (
                      <img className={cs.icon} src={item.icon} alt="space" />
                    )}
                  </Tooltip>
                  <span className={cs.label}>{item.label}</span>
                </li>
              ) : (
                <li onClick={onEdit} className={classNames({ [cs.disabled]: chose !== "My Space" || isMySelf !== 1, [cs.chosed]: menuType.isEdit })} key={item.label}>
                  <Tooltip placement="right" title="Manage Space">
                    <img className={cs.icon} src={"/static/nff/icon-edit-d.png"} alt="space" />
                  </Tooltip>
                  <span className={cs.label}>Manage Space</span>
                </li>
              );
            })}
          </ul>
        }

        {/* 已链接钱包 且 在别人的页面 且 未登录（无会员信息） | 老用户未登录 | 中间显示Login in按钮*/}
        {/* {isConnected && isMySelf === 0 && !collapsed && userInfo.username && (
          <div className={classNames(cs.connect, "btn")} onClick={() => setWalletShow(true)}>
            Connect Wallet
          </div>
        )} */}

        {/* 已链接钱包 且 在别人的页面 且 已登录（有会员信息） | 老用户已登录 | 中间显示头像昵称*/}
        {isConnected && isMySelf === 0 && !collapsed && userInfo.username && (
          <div className={classNames(cs.connectBar)}>
            <ImageSelf className={cs.photo} src={userInfo.avatar} />
            <span className={"all_nowarp"}>{userInfo.username || ""}</span>
          </div>
        )}

        {/* 广告位 */}
        {!collapsed && (
          <div className={cs.ad}>
            <img
              className={cs.adPic}
              src="/static/nff/icon-ad1.png"
              alt="ad"
              // onClick={() => onMenuClick(menusNoConnect[1].label, !isConnected)}
              onClick={() => window.open("https://www.nffriend.com/")}
            />
            <AdUser />
          </div>
        )}

        <div className={cs.auto} />

        <div className={cs.bottomBtnBox}>
          {/* 未链接钱包 且 在他人页面 | 底部显示create my space按钮 */}
          {isMySelf !== 1 && !isConnected && !collapsed && (
            <div className={classNames(cs.connect, "btn", cs.connectC)} onClick={() => setWalletShow(true)}>
              Create My Space
            </div>
          )}

          {/* 未链接钱包 | 底部显示链接按钮 */}
          {!isConnected && !collapsed && (
            <div className={classNames(cs.connect, "btn")} onClick={() => setWalletShow(true)}>
              Connect Wallet
            </div>
          )}

          {/* 已链接 且 在自己页面 | 底部setting按钮 */}
          {isMySelf === 1 && isConnected && (
            <div className={classNames(cs.connectG, "btn", { [cs.collapsed]: collapsed, [cs.chosed]: chose === menusExtra[0].label })} onClick={() => onMenuClick(menusExtra[0].label)}>
              <Tooltip placement="right" title="Setting">
                <img className={cs.icon} src={menusExtra[0].icon} alt="setting" />
              </Tooltip>
              <span className={cs.label}>{menusExtra[0].label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
