import s from './News.module.css';
export function NewsList({ news, loaded, rabbit }) {
  return (
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
              onError={(e) => e.target.src = rabbit}
            />
            <h2 className={s.content}>{item.title}</h2>
          </a>
        </li>
      ))}
    </ul>
  );
}
