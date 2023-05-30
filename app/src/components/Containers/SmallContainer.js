import "./Container.css";

const SmallContainer = ({ children, id }) => {
  return <div className="smallContainer" id={id}>{children}</div>;
};

export default SmallContainer;