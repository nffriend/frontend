import dynamic from "next/dynamic";
const ModelDynamic = dynamic(() => import("./index"), { ssr: false });

export default ModelDynamic;
