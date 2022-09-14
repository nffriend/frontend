import React from "react";
import { isMobile } from "react-device-detect";

const JSX = ({ MRoot, PCRoot }: any) => {
  const [mobile, setMobile] = React.useState("0");
  React.useEffect(() => {
    if (isMobile) {
      setMobile("1");
    } else {
      setMobile("2");
      // document.documentElement.style.minWidth = "750px";
    }
  }, []);
  return mobile === "0" ? null : mobile === "1" ? <MRoot /> : <PCRoot />;
};

export default JSX;
