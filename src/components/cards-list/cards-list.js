import './cards-list.scss';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Alert, Spin } from 'antd';

import Card from '../card';
import {selectArticlesData, selectStatusLoadArticles} from '../../selectors/selectors';

function CardsList({ page }) {
  const id = 10;

  const articlesData = useSelector(selectArticlesData);
  const statusLoadArticles = useSelector(selectStatusLoadArticles);
  const statusLoading = statusLoadArticles === 'loading';

  const style = statusLoading ? 'cards-list__item-opacity' : 'cards-list__item';
  const spiner =
    statusLoading && articlesData.length !== 0 ? <Spin className="spiner" tip="Loading" size="large" /> : null;
  const alert =
    statusLoadArticles === 'rejected' ? (
      <Alert
        message="Page loading error."
        description="
  An error occurred while loading this page. Please check your internet connection and try again."
        type="error"
        closable
      />
    ) : null;

  const articles =
    articlesData.length !== 0
      ? articlesData.articles.map((el, i) => {
          const userName = el.author.username;
          const authorAvatar = el.author.image;
          const createArticle = format(new Date(el.createdAt), 'MMMM d, y');
          const { description, favoritesCount, title, tagList, slug, favorited } = el;
          const idx = id + i;

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
      {alert}
      {articles}
    </ul>
  );
}

export default CardsList;
