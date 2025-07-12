import "./components.css";

type CardGroupProps = {
  src: string;
  title: string;
  description: string;
  icon_background: string;
};

type CardGroupArrProps = {
  data: CardGroupProps[];
};

const CardElement = ({
  src,
  title,
  description,
  icon_background,
}: CardGroupProps) => {
  return (
    <div className="card-element">
      <div
        className="icon-container"
        style={{ backgroundColor: icon_background }}
      >
        <img src={src} alt={title} height={24} />
      </div>
      <div className="card-title">{title}</div>
      <div className="card-desc">{description}</div>
    </div>
  );
};

const CardGroup = ({ data }: CardGroupArrProps) => {
  return (
    <div className="card-group-container">
      {data.map((card, index) => (
        <CardElement
          src={card.src}
          title={card.title}
          description={card.description}
          key={index}
          icon_background={card.icon_background}
        />
      ))}
    </div>
  );
};

export default CardGroup;
