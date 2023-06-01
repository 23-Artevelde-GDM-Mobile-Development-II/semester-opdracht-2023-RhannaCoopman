import "./Input.css";

const Input = ({ type, name, labelname, value, placeholder, onChange, disabled = false }) => {
  return (

    <div>
    <label htmlFor={name}>{labelname}
    <input
      className="form__input"
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
    />
    </label>
    </div>

  );
};

export default Input;
