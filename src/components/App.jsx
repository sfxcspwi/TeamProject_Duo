import { useState } from "react";
import { Header } from "./Header/Header";
export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalValue, setModalValue] = useState(null);
  const handleToggle = (value) => {
    setIsOpen(prev => (!prev)); 
    setModalValue(value);
    showModal();
  }
  const showModal = () => {
    switch (modalValue) {
      case "login":
        console.log('login');
        break;
      case "signUp":
        console.log("signUp");
        break;
    }
  }
  return (
    <div> 
    <Header handleToggle={handleToggle}/>
    </div>
  );
};
