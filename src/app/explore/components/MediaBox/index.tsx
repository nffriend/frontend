import cs from "./index.module.scss";

interface Props {
  src: string;
  area?: string;
  onClick?: () => void;
}
export default function MediaBox(props: Props) {
  return (
    <section className={cs.root} style={{ gridArea: props.area || "auto" }} {...props}>
      <img src={props.src} alt="pic" style={{ cursor: props.onClick ? "pointer" : "auto" }} />
    </section>
  );
}
