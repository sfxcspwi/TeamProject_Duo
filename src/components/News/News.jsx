import { useEffect, useState } from 'react';
import s from './News.module.css';
import { fetchNews } from 'components/Services/newsApi';
export function News() {
    const [news, setNews] = useState([]);
    const [loaded, setLoaded] = useState(4);
  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews();
      setNews(data.articles);
    };
    getNews();
  }, []);
    const loadMore = () => {
        setLoaded(prev => (prev + 4));
  }
    return (
      <section className={s.news}>
        <div className="container">
          <p className={s.title}>Interacting with our pets</p>
          <ul className={s.list}>
            {news.slice(0, loaded).map(item => (
              <li className={s.item}>
                <img src={item.urlToImage} alt="cat" className={s.img} />
                <h2 className={s.content}>{item.title}</h2>
              </li>
            ))}
          </ul>
          <button onClick={loadMore} className={s.btn}>
            See more
          </button>
        </div>
      </section>
    );
}
