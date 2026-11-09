import { useState } from "react";
import { Header } from "./Header/Header";
import { ModalText } from "./Modal/ModalText";
import { Modal } from "./Modal/Modal";
import { News } from "./News/News";
import {CityForecast} from "./CityForecast/CityForecast";
import {Hero} from "./Hero/Hero";
import { fetchWeatherByCity } from './Services/weatherApi';
import {Footer} from "./Footer/Footer";
import { ForecastInfo } from "./ForecastInfo/ForecastInfo";

export const App = () => {
  const [modalValue, setModalValue] = useState(null);
  const [userData, setUserData] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const handleToggle = (value) => {
    setModalValue(value);
  }

  const [selectedCardData, setSelectedCardData] = useState(null);
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("favorite-weather-cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

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

  const handleSearch = async (cityName) => {
  try {
      setIsLoading(true);
      setError(null);
      const data = await fetchWeatherByCity(cityName);

      setCards((prevCards) => {
        const existsIndex = prevCards.findIndex(
          (card) => card.city.toLowerCase() === data.city.toLowerCase()
        );

        if (existsIndex !== -1) {
          const updated = [...prevCards];
          updated[existsIndex] = { ...updated[existsIndex], data };
          return updated;
        }

        const newCard = {
          id: `${data.city.toLowerCase()}-${Date.now()}`,
          city: data.city,
          isFavorite: false,
          data,
        };
        return [newCard, ...prevCards];
      });
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  const handleToggleFavorite = (cardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, isFavorite: !card.isFavorite };
        }
        return card;
      });

      const favoritesToSave = updatedCards.filter((card) => card.isFavorite);
      localStorage.setItem("favorite-weather-cards", JSON.stringify(favoritesToSave));

      return updatedCards;
    });
  };


  const handleDeleteCard = (cardId) => {
    setCards((prevCards) => {
      const targetCard = prevCards.find((c) => c.id === cardId);
      const updatedCards = prevCards.filter((card) => card.id !== cardId);
      const favoritesToSave = updatedCards.filter((card) => card.isFavorite);
      localStorage.setItem("favorite-weather-cards", JSON.stringify(favoritesToSave));

      if (selectedCardData && targetCard && selectedCardData.city === targetCard.city) {
        setSelectedCardData(null);
      }

      return updatedCards;
    });
  };

  const handleRefreshCard = async (cardId, cityName) => {
    try {
      const freshData = await fetchWeatherByCity(cityName);

      setCards((prevCards) => {
        const updatedCards = prevCards.map((card) => {
          if (card.id === cardId) {
            return { ...card, data: freshData };
          }
          return card;
        });

        const favoritesToSave = updatedCards.filter((card) => card.isFavorite);
        localStorage.setItem("favorite-weather-cards", JSON.stringify(favoritesToSave));

        return updatedCards;
      });

      if (selectedCardData && selectedCardData.city.toLowerCase() === cityName.toLowerCase()) {
        setSelectedCardData(freshData);
      }
    } catch (err) {
      alert(`Не вдалося оновити: ${err.message}`);
    }
  };

  const handleSeeMore = (cardData) => {
    if (selectedCardData && selectedCardData.city === cardData.city) {
      setSelectedCardData(null);
    } else {
      setSelectedCardData(cardData);
    }
  };

  return (
    <div> 
      <Header handleToggle={handleToggle} userData={ userData} />
      {modalValue && (
        <Modal onClose={onClose}>
          {modalValue === 'signUp'? <ModalText value="signUp" onSignUp={onSignUp} handleToggle={handleToggle}/>: <ModalText value="login" onLogin={onLogin} handleToggle={handleToggle}/>}
        </Modal>
      )}
      
      <Hero onSearch={handleSearch} />

      {isLoading && <p style={{ textAlign: "center", padding: "20px" }}>Завантаження погоди...</p>}

      <main>
        <div class = 'cardsList container'>
          {cards.map((card) => (
            <CityForecast
              key={card.id}
              data={card.data}
              isFavorite={card.isFavorite}
              onFavorite={() => handleToggleFavorite(card.id)}
              onRemove={() => handleDeleteCard(card.id)}
              onRefresh={() => handleRefreshCard(card.id, card.city)}
              handleSeeMore={() => handleSeeMore(card.data)}
            />
          ))}
        </div>

        {selectedCardData && (
          <div style={{ marginTop: "40px" }}>
            <ForecastInfo data={selectedCardData.current} />
          </div>
        )}
      </main>
      
      <News/>

      <Footer/>
    </div>
  );
};
