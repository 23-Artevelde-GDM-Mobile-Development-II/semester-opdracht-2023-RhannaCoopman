import "./Input.css";

const Input = ({ type, name, labelname, value, onChange, disabled = false }) => {
  return (
    <div>
    <label htmlFor={name}>{labelname}</label>
    <input
      className="form__input"
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    </div>

  );
};

export default Input;
