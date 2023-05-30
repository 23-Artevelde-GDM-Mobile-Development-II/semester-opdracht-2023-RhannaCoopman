import "./Grid.css";

const ThreeColumnGrid = ({ children, id }) => {
  return <div className="ThreeColumnGrid" id={id}>{children}</div>;
};

export default ThreeColumnGrid;