import "./Container.css";

const Container = ({ children, id, className = "container" }) => {
  return <div className={className} id={id}>{children}</div>;
};

export default Container;