import CategoryPill from "./categoryPill";
import "./components.css";

export type CardProps = {
  layout: {
    key?: string | null;
    title?: string | null;
    text: string[];
    btn?: {
      text: string;
      href: string;
    };
  };
  src: string | undefined;
  alt: string;
};

export default function Card({ layout, src, alt }: CardProps) {
  return (
    <div className="card-container">
      <div className="layout-container">
        {layout.key && <div className="caption">[ {layout.key} ]</div>}
        <div>
          {layout.title && <div className="title">{layout.title}</div>}
          {layout.text &&
            layout.text.map((text) => <CategoryPill label={text} key={text} />)}
        </div>
        {layout.btn?.text && (
          <a role="button" href={layout.btn.href} className="nav-btn">
            {layout.btn.text}
          </a>
        )}
      </div>
      <img src={src} alt={alt} width="355px" height="200px" />
    </div>
  );
}
