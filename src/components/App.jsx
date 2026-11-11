import { useState } from "react";
import { Header } from "./Header/Header";
import { ModalText } from "./Modal/ModalText";
import { Modal } from "./Modal/Modal";
import News from "./News/News";
import { CityForecast } from "./CityForecast/CityForecast";
import { Hero } from "./Hero/Hero";
import { fetchWeatherByCity } from './Services/weatherApi';
import { Footer } from "./Footer/Footer";
import { ForecastInfo } from "./ForecastInfo/ForecastInfo";
import { Gallery } from './Gallery/Gallery';
import { HourlyForecast } from "./HourlyForecast/HourlyForecast";
import { fetchForecastByCity } from "./Services/forecastApi";
import { WeeklyForecast } from "./WeeklyForecast/WeeklyForecast";
import { ToastContainer, toast } from 'react-toastify';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Spinner } from './Spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [modalValue, setModalValue] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [, setError] = useState(null);

  const [weeklyData, setWeeklyData] = useState(null);
  const [selectedHourlyData, setSelectedHourlyData] = useState(null);
  const [selectedCardData, setSelectedCardData] = useState(null);

  const [cards, setCards] = useLocalStorage("favorite-weather-cards", []);

  const handleToggle = (value) => {
    setModalValue(value);
  };

  const handleHourlyToggle = (hourlyData) => {
    setSelectedHourlyData((prev) => (prev === hourlyData ? null : hourlyData));
  };

  const onWeeklyClick = async (city) => {
    try {
      if (weeklyData && weeklyData.city === city) {
        setWeeklyData(null);
        return;
      }
      setWeeklyData(null);
      const data = await fetchForecastByCity(city);
      setWeeklyData({ ...data, city });
    } catch (err) {
      toast.error(`Не вдалося завантажити тижневий прогноз: ${err.message}`);
    }
  };

  const onSignUp = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const userName = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const userData = { userName, email, password };

    localStorage.setItem('user-data', JSON.stringify(userData));
    form.reset();
    setModalValue(null);
    setUserData(userData);
    toast.success("Ви успішно зареєструвалися!");
  };

  const onLogin = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const savedUser = JSON.parse(localStorage.getItem('user-data'));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      setUserData(savedUser);
      setModalValue(null);
      toast.success("Вхід виконано!");
    } else {
      toast.error("Невірний email або пароль");
    }
  };

  const onClose = () => setModalValue(null);

  const handleSearch = async (cityName) => {
    try {
      setIsLoading(true);
      setError(null);
      setWeeklyData(null);
      setSelectedHourlyData(null);
      setSelectedCardData(null);

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
      toast.success(`Погоду для ${cityName} завантажено`);
    } catch (err) {
      setError(err.message);
      toast.error(`Місто не знайдено: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (cardId) => {
    setCards((prevCards) => {
      let isAdded = false;

      const updatedCards = prevCards.map((card) => {
        if (card.id === cardId) {
          const nextState = !card.isFavorite;
          isAdded = nextState;
          return { ...card, isFavorite: nextState };
        }
        return card;
      });

      if (isAdded) {
        toast.success("Місто успішно додано до улюблених");
      } else {
        toast.info("Місто видалено з улюблених");
      }

      return updatedCards;
    });
  };

  const handleDeleteCard = (cardId) => {
    setCards((prevCards) => {
      const targetCard = prevCards.find((c) => c.id === cardId);
      const updatedCards = prevCards.filter((card) => card.id !== cardId);

      if (selectedCardData && targetCard && selectedCardData.city === targetCard.city) {
        setSelectedCardData(null);
      }

      toast.info("Місто було успішно видалено");
      return updatedCards;
    });
    setSelectedHourlyData(null);
    setWeeklyData(null);
  };

  const handleRefreshCard = async (cardId, cityName) => {
    try {
      const freshData = await fetchWeatherByCity(cityName);
      setCards((prevCards) =>
        prevCards.map((card) => (card.id === cardId ? { ...card, data: freshData } : card))
      );

      if (selectedCardData && selectedCardData.city.toLowerCase() === cityName.toLowerCase()) {
        setSelectedCardData(freshData);
      }
      toast.success(`Погоду для ${cityName} оновлено`);
    } catch (err) {
      toast.error(`Не вдалося оновити: ${err.message}`);
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
      <Header handleToggle={handleToggle} userData={userData} />
      {modalValue && (
        <Modal onClose={onClose}>
          {modalValue === 'signUp' ? (
            <ModalText value="signUp" onSignUp={onSignUp} handleToggle={handleToggle} />
          ) : (
            <ModalText value="login" onLogin={onLogin} handleToggle={handleToggle} />
          )}
        </Modal>
      )}
      
      <Hero onSearch={handleSearch} />

      {isLoading && <Spinner size={50} color="#FFB36C" />}

      <main>
        <div className="cardsList container">
          {cards.map((card) => (
            <CityForecast
              key={card.id}
              data={card.data}
              isFavorite={card.isFavorite}
              onFavorite={() => handleToggleFavorite(card.id)}
              onRemove={() => handleDeleteCard(card.id)}
              onRefresh={() => handleRefreshCard(card.id, card.city)}
              handleSeeMore={() => handleSeeMore(card.data)}
              onHourlyClick={() => handleHourlyToggle(card.data.hourly)}
              onWeeklyClick={() => onWeeklyClick(card.city)}
            />
          ))}
        </div>

        {selectedHourlyData && (
          <HourlyForecast hourly={selectedHourlyData} />
        )}
        
        {weeklyData && (
          <WeeklyForecast data={weeklyData.forecast} />
        )}
        
        {selectedCardData && (
          <div style={{ marginTop: "40px" }}>
            <ForecastInfo data={selectedCardData.current} />
          </div>
        )}
      </main>
      
      <News />
      <Gallery />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};