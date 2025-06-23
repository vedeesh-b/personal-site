import type { ReactNode } from "react";
import "./components.css";

type CardProps = {
  layout: {
    key?: string | null;
    title?: string | null;
    text: string;
    btn?: ReactNode | null;
  };
  src: string;
  alt: string;
};

export default function Card({ layout, src, alt }: CardProps) {
  return (
    <div className="card-container">
      <div className="layout-container">
        {layout.key && <div className="caption">[ {layout.key} ]</div>}
        {layout.title && <div className="title">{layout.title}</div>}
        {layout.text && <div>{layout.text}</div>}
        {layout.btn && <div>{layout.btn}</div>}
      </div>
      <img src={src} alt={alt} height="200px" />
    </div>
  );
}
