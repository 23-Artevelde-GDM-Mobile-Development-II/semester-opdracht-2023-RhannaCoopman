import "./Dropdown.css";

const Dropdown = ({
  name,
  children,
  options,
  onChange,
  disabled = false,
  truefalsecomponent = false,
}) => {
  if (options) {
    return (
      <div>
        <label>
          Kies één:
          <select name={name} onChange={onChange} defaultValue="">
            <option value=""> -- Geen info -- </option>
            {options.map((value) => (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            ))}
            {children}
          </select>
        </label>
      </div>
    );
  }

  if (truefalsecomponent) {
    return (
      <div>
        <label>
          Kies één:
          <select name={name} onChange={onChange}>
            <option key={true} value={true}>
              Ja
            </option>

            <option key={false} value={false}>
              Nee
            </option>
          </select>
        </label>
      </div>
    );
  }
  return (
    <div>
      <label>
        Kies één:
        <select name={name} onChange={onChange}>

        </select>
      </label>
    </div>
  );
};

export default Dropdown;
