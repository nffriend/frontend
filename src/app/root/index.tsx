import React from "react";
import Layout from "./layout";

const Rooter = ({ children }: any) => {
  const root = {
    default: <Layout>{children}</Layout>,
  };

  return root["default"];
};

export default Rooter;
