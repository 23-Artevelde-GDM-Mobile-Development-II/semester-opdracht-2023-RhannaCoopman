import "./Grid.css";

const Grid = ({ children, id, className = "TwoColumnGrid" }) => {
  return <div className={className} id={id}>{children}</div>;
};

export default Grid;