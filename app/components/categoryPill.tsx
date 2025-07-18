import "./components.css";

export type PillProps = {
  label: string;
};

const CategoryPill = ({ label }: PillProps) => {
  return <div className="pill-container">{label}</div>;
};

export default CategoryPill;
