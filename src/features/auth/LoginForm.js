import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Field from "../../components/Field";
import { isValidEmail } from "../../utils";
import { fetchUser, login } from "./authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.auth.loginStatus);

  const formInitialState = {
    fields: {
      email: "corner99vn@gmail.com",
      password: "corner2"
    },
    errors: {
      email: "",
      password: ""
    }
  }

  const [state, setState] = useState(formInitialState);

  const handleFieldChange = (name, value, error) => {
    const fields = {...state.fields};
    fields[name] = value;
    const errors = {...state.errors};
    errors[name] = error;
    setState(state => ({...state, fields, errors}));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const userCredential = {
      username: state.fields.email,
      password: state.fields.password
    }
    try {
      const payload = await dispatch(login(userCredential)).unwrap();
      const params = {
        userId: payload.user_id,
        accessToken: payload.access_token
      }
      console.log(params);
      dispatch(fetchUser(params));
    } catch(error) {
      console.error("error", error);
    }
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <h2>Login Form</h2>
      <Field
        name="email"
        value={state.fields.email}
        placeholder="Email"
        handleFieldChange={handleFieldChange}
        validate={email => isValidEmail(email) ? "" : "Email is invalid!"}
      />
      <Field
        name="password"
        value={state.fields.password}
        placeholder="Password"
        handleFieldChange={handleFieldChange}
        validate={password => password.length > 0 ? "" : "Password can not be empty!"}
      />
      <button type="submit" className={loginStatus}>Submit</button>
    </form>
  );
}

export default LoginForm;