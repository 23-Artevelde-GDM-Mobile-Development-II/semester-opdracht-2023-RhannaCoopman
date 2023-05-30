import React, { useState } from 'react';
import Input from "../../Components/Global/Input/Input";
import Button from "../../Components/Global/Button/Button";
import useMutation from "../../hooks/useMutation";



const Login = (onLogin, initialError) => {

  const { isLoading, error, mutate } = useMutation();


  const [data, setData] = useState({
    username: '',
    password: '',
})

// Async function which sets the values for login
const handleChange = async e => {
    setData({
        ...data,
        [e.currentTarget.name]: e.currentTarget.value
    })

    console.log(data);
}

const handleLogin = (e) => {
  e.preventDefault();
  console.log(data)
  mutate(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    data,
    onSuccess: (data) => {
      onLogin(data);
    },
  });
};

// const handleLogin = (e) => {
//   e.preventDefault();
//   console.log(data)
// }

  return (
    <div>

      <form onSubmit={handleLogin}>
        {/* {error || initialError ? <p className={""}>{initialError ?? error}</p> : ''} */}
        <label htmlFor="username">Username</label>
        <Input name="username" value={data.username} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input name="password" value={data.password} onChange={handleChange} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );

};

export default Login;