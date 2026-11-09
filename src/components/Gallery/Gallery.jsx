import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import s from './Gallery.module.css';

let UNSPLASH_ACCESS_KEY = 'RoxuKy0CcZOxvG9bEDCV5haSXH6hPzi2ICXlHRM8DmY';

export function Gallery() {
  let [images, setImages] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    let fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let response = await fetch(
          `https://api.unsplash.com/search/photos?query=weather+sky&orientation=landscape&per_page=8&client_id=${UNSPLASH_ACCESS_KEY}`
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('401 Unauthorized — ключ недійсний');
          }
          throw new Error(`Статус API: ${response.status}`);
        }

        let data = await response.json();

        if (!data.results || data.results.length === 0) {
          throw new Error('API не повернув жодної картинки');
        }

        let formattedImages = data.results.map((item) => ({
          id: item.id,
          alt: item.alt_description || 'Weather photo',
          url: item.urls.regular,
        }));

        setImages(formattedImages);
      } catch (err) {
        console.error('Помилка Unsplash:', err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return <p className={s.loadingText}>Завантаження з Unsplash API...</p>;
  }

  if (error) {
    return (
      <div className={s.container} style={{ textAlign: 'center', padding: '40px 0' }}>
        <p className={s.loadingText}>
            Помилка Unsplash API: {error}
        </p>
      </div>
    );
  }

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Beautiful nature</h2>

        <Swiper
          key={images.length}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          initialSlide={2}
          loop={images.length > 3}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -15,
            depth: 140,
            modifier: 1.2,
            slideShadows: false,
          }}
          className={s.swiperContainer}
        >
          {images.map((item) => (
            <SwiperSlide key={item.id} className={s.slide}>
              <div className={s.slideWrapper}>
                <img className={s.slideImage} src={item.url} alt={item.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}