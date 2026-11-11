import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
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
          `https://api.unsplash.com/search/photos?query=nature+landscape&orientation=landscape&per_page=10&client_id=${UNSPLASH_ACCESS_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Статус API: ${response.status}`);
        }

        let data = await response.json();
        if (!data.results || data.results.length === 0) {
          throw new Error('API не повернув зображень');
        }

        let formattedImages = data.results.map((item) => ({
          id: item.id,
          alt: item.alt_description || 'Nature photo',
          url: item.urls.regular,
        }));

        setImages(formattedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) return <p className={s.loadingText}>Завантаження галереї...</p>;
  if (error) return <p className={s.loadingText}>Помилка Unsplash API: {error}</p>;

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Beautiful nature</h2>

        <Swiper
          key={images.length}
          modules={[EffectCoverflow, Autoplay]}
          effect={'coverflow'}
          centeredSlides={true}
          slidesPerView={'auto'}
          initialSlide={2}
          loop={images.length >= 5}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 60,  
            depth: 160,     
            modifier: 1,
            scale: 0.88,
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