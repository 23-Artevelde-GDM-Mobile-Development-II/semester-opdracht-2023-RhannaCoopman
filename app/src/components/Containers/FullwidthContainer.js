import "./Container.css";

const FullwidthContainer = ({ children, id }) => {
  return <div className="fullwidthContainer" id={id}>{children}</div>;
};

export default FullwidthContainer;