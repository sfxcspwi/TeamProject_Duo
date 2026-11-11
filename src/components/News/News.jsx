import { useEffect, useState,memo } from 'react';
import s from './News.module.css';
import rabbit from '../Images/newsImg.png';
import { fetchNews } from 'components/Services/newsApi';
 function News(){
    const [news, setNews] = useState([]);
    const [loaded, setLoaded] = useState(4);
  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        const filteredNews = data.filter(
          item => !item.image_url?.startsWith('https://menafn.com')
        );
        
        setNews(filteredNews);
        console.log(news);
        
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
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
              <li className={s.item} key={item.article_id}>
                <a
                  className={s.content}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.image_url || rabbit}
                    alt="cat"
                    className={s.img}
                  />
                  <h2 className={s.content}>{item.title}</h2>
                </a>
              </li>
            ))}
          </ul>
          {loaded < news.length ? (
            <button onClick={loadMore} className={s.btn}>
              See more
            </button>
          ) : (
            <button className={s.btnDisabled}>
              See more
            </button>
          )}
        </div>
      </section>
    );
}
export default memo(News);
