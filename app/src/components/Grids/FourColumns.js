import "./Grid.css";

const FourColumns = ({ children, id }) => {
  return <div className="FourColumnGrid" id={id}>{children}</div>;
};

export default FourColumns;