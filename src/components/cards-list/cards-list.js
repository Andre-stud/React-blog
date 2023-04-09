import './cards-list.scss';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Spin } from 'antd';

import Card from '../card';

function CardsList({ page }) {
  const id = 10;

  const articlesData = useSelector((state) => state.articles.articles);
  const statusLoadArticles = useSelector((state) => state.articles.status);
  const statusLoading = statusLoadArticles === 'loading';

  const style = statusLoading ? 'cards-list__item-opacity' : 'cards-list__item';
  const spiner =
    statusLoading && articlesData.length !== 0 ? <Spin className="spiner" tip="Loading" size="large" /> : null;

  const articles =
    articlesData.length !== 0
      ? articlesData.articles.map((el, i) => {
          const userName = el.author.username;
          const authorAvatar = el.author.image;
          const createArticle = format(new Date(el.createdAt), 'MMMM d, y');
          const { description } = el;
          const { favoritesCount } = el;
          const { title } = el;
          const { tagList } = el;
          const { slug } = el;
          const idx = id + i;
          const { favorited } = el;

          return (
            <li key={idx} className={style}>
              <Card
                userName={userName}
                authorAvatar={authorAvatar}
                createArticle={createArticle}
                description={description}
                favoritesCount={favoritesCount}
                title={title}
                tagList={tagList}
                slug={slug}
                idx={idx}
                favorited={favorited}
                page={page}
              />
            </li>
          );
        })
      : null;

  return (
    <ul className="cards-list">
      {spiner}
      {articles}
    </ul>
  );
}

export default CardsList;
