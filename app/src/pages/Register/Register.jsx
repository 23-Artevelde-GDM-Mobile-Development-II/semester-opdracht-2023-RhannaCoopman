import React, { useState } from 'react';
import Input from "../../Components/Global/Input/Input";
import Button from "../../Components/Global/Button/Button";
import useMutation from "../../hooks/useMutation";



const Register = ({ onLogin, initialError }) => {

  const { isLoading, error, mutate } = useMutation();

  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
})

// Async function which sets the values for login
const handleChange = async e => {
    setData({
        ...data,
        [e.currentTarget.name]: e.currentTarget.value
    })
}

const handleRegister = (e) => {
  e.preventDefault();
  console.log(data)

  mutate(`${process.env.REACT_APP_API_URL}/register`, {
    method: "POST",
    data,
    onSuccess: (data) => {
      onLogin(data);
      console.log('geregistreerd')
    },
  });
};

// const handleRegister = (e) => {
//   e.preventDefault();
//   console.log(data)
// }

  return (
    <div>
      <form onSubmit={handleRegister}>
        {error || initialError ? <p>{initialError ?? error}</p> : ''}
        {/* <label htmlFor="firstname">Firstname</label>
        <Input name="firstname" value={data.firstname} onChange={handleChange} />
        <label htmlFor="lastname">Lastname</label>
        <Input name="lastname" value={data.lastname} onChange={handleChange} /> */}
        <label htmlFor="username">Firstname</label>
        <Input name="username" value={data.username} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <Input name="email" type={'email'} value={data.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <Input name="password" type={'password'} value={data.password} onChange={handleChange} />

        <Button type="submit" disabled={isLoading} onClick={handleRegister}>Registreer</Button>
      </form>
    </div>
  );

};

export default Register;