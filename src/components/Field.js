import { useEffect, useState } from "react";

const Field = ({name, value, placeholder, handleFieldChange, validate}) => {
  const initialState = {
    value,
    error: ""
  }

  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(state => ({
      ...state,
      value
    }));
  }, [name, value]);

  const handleChange = e => {
    const value = e.target.value;
    const error = validate ? validate(value) : "";
    setState(state => ({...state, value, error}));
    handleFieldChange(name, value, error);
  }

  return (
    <div className="Field">
      <input 
      type={name}
      placeholder={placeholder}
      onChange={handleChange}
      value={state.value}
      /><br/>
      
      {state.error && <span className="error">{state.error}</span>}
    </div>
  );
}

export default Field;