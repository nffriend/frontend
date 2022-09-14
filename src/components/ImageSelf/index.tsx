import { useEffect, useState, useMemo } from "react";

// 如果加载失败则显示默认兜底图片
interface Props {
  src: string | null | undefined;
  className?: string;
  default?: string;
}
export default function ImageSelf(props: Props) {
  const [isError, setError] = useState(false);

  const srcRes = useMemo(() => {
    if (isError) {
      return props.default || "/static/nff/backpic.jpg";
    }
    return props.src || "";
  }, [props.src, isError, props.default]);

  useEffect(() => {
    if (props.src) {
      setError(false);
    }
  }, [props.src]);

  return <img className={props.className} src={srcRes} onError={() => setError(true)} alt="pic" />;
}
