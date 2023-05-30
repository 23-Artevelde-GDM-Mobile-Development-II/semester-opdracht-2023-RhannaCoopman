import React, { useState } from 'react';
import Input from "../../Components/Global/Input/Input";
import Button from "../../Components/Global/Button/Button";
import useMutation from "../../hooks/useMutation";
import Container from '../../Components/Containers/Container';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../../Components/Global/loading/loading';



const Contact = ({ onLogin, initialError }) => {

  const { id } = useParams();

  const [data, setData] = useState({
    sender_id: 31,
    house_id: id,
    message: '',
    receiver_id: '',
  })

  const {
    isLoading,
    error,
    invalidate,
    data: house,
  } = useFetch(`/contact/${id}`);



  const { mutate } = useMutation();



if (error) {
  return <p>{error}</p>;
}

if (isLoading) {
  return <Loading />;
}

// Async function which sets the values for contact
const handleChange = async e => {
    setData({
        ...data,
        [e.currentTarget.name]: e.currentTarget.value
    })
}



const handleSend = (e) => {
  e.preventDefault();

  setData({
    ...data,
    receiver_id: house.realestate_agent_id
})

  mutate(`${process.env.REACT_APP_API_URL}/contact`, {
    method: "POST",
    data,
    onSuccess: (data) => {
      console.log('bericht gestuurd')
    },
  });
};

// const handleSend = (e) => {
//   e.preventDefault();
//   setData({
//     ...data,
//     receiver_id: house.realestate_agent_id
// })
//   console.log(data)
// }

  return (
    <Container>
      <form onSubmit={handleSend}>
        {error || initialError ? <p>{initialError ?? error}</p> : ''}
        {/* <label htmlFor="firstname">Firstname</label>
        <Input name="firstname" value={data.firstname} onChange={handleChange} />
        <label htmlFor="lastname">Lastname</label>
        <Input name="lastname" value={data.lastname} onChange={handleChange} /> */}
        <label htmlFor="message">Firstname</label>
        <Input name="message" value={data.message} onChange={handleChange} />
        <p>{house.realestate_agent_id}</p>
        <Input name="house_id" type={'hidden'} value={id} onChange={handleChange} />
        <Input name="sender_id" type={'hidden'} value={31} onChange={handleChange} />


        <Button type="submit" disabled={isLoading} onClick={handleSend}>Registreer</Button>
      </form>
    </Container>
  );

};

export default Contact;