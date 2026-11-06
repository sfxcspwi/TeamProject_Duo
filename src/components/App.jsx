import { useState } from "react";
import { Header } from "./Header/Header";
import { ModalText } from "./Modal/ModalText";
import { Modal } from "./Modal/Modal";
import { News } from "./News/News";
export const App = () => {
  const [modalValue, setModalValue] = useState(null);
  const [userData, setUserData] = useState(null)

  const handleToggle = (value) => {
    setModalValue(value);
  }
  const onSignUp = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const userName = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const userData = {
      userName,
      email,
      password,
    }
    localStorage.setItem('user-data', JSON.stringify(userData));
    form.reset();
    setModalValue(null);
    setUserData(userData)
  }
  const onLogin = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const savedUser = JSON.parse(localStorage.getItem('user-data'));

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      setUserData(savedUser);
      setModalValue(null);
    } else {
      alert('Incorrect email or password');
    }
  };
  const onClose = () => {
    setModalValue(null);
  }
  return (
    <div> 
      <Header handleToggle={handleToggle} userData={ userData} />
      {modalValue && (
        <Modal onClose={onClose}>
          {modalValue === 'signUp'? <ModalText value="signUp" onSignUp={onSignUp} handleToggle={handleToggle}/>: <ModalText value="login" onLogin={onLogin}/>}
        </Modal>
      )}
      <News/>
    </div>
  );
};
