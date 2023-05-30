import "./Grid.css";

const TwoColumnGrid = ({ children, id }) => {
  return <div className="TwoColumnGrid" id={id}>{children}</div>;
};

export default TwoColumnGrid;