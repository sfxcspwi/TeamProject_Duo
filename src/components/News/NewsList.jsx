import s from './News.module.css'
export function NewsList({ news, loaded, rabbit }) {
  
    return (
      <ul className={s.list}>
        {news.slice(0, loaded).map(item => (
          <li className={s.item} key={crypto.randomUUID()}>
            <a
              className={s.content}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={item.image || rabbit} alt="cat" className={s.img} />
              <h2 className={s.content}>{item.title}</h2>
            </a>
          </li>
        ))}
      </ul>
    );
}