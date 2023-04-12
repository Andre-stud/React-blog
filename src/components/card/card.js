import './card.scss';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchArticle, fetchLikeArticle, fetchArticles } from '../../store/articles-slice';

function Card({
  userName,
  authorAvatar,
  createArticle,
  description,
  favoritesCount,
  title,
  tagList,
  slug,
  favorited,
  page,
}) {

  let elKey = 9;

  const reduction = (text, limit) => {
    let changedText = text;
    changedText = changedText.trim();
    if (changedText.length <= limit) return changedText;

    changedText = changedText.slice(0, limit);

    return `${changedText.trim()}...`;
  };

  const cardTagList = tagList.map((el) => {
    elKey += 1;
    return (
      <li key={elKey} className="tag">
        {reduction(el, 25)}
      </li>
    );
  });

  const dispatch = useDispatch();

  const clickLink = () => {
    dispatch(fetchArticle(slug));
  };

  const likeClick = () => {
    const method = 'POST';
    dispatch(fetchLikeArticle({ slug, method })).then((value) => {
      if (value.payload) {
        dispatch(fetchArticles(page));
        dispatch(fetchArticle(slug));
      }
    });
  };

  const unLikeClick = () => {
    const method = 'DELETE';
    dispatch(fetchLikeArticle({ slug, method })).then((value) => {
      if (value.payload) {
        dispatch(fetchArticles(page));
        dispatch(fetchArticle(slug));
      }
    });
  };

  const like = favorited ? (
    <HeartFilled onClick={unLikeClick} className="card-header__button-like heart-filled" />
  ) : (
    <HeartOutlined onClick={likeClick} className="card-header__button-like" />
  );

  return (
    <div className="card">
      <div className="card-header">
        <Link onClick={clickLink} to={`/articles/${slug}`} className="card-header__title">
          {reduction(title, 97)}
        </Link>
        {like}
        <span className="card-header__likes-counter">{favoritesCount}</span>
      </div>
      <ul className="card-header__teg-list">{cardTagList}</ul>
      <p className="text-card">{reduction(description, 370)}</p>
      <div className="user-information">
        <div className="user-information__card">
          <span className="user-information__name">{userName}</span>
          <span className="user-information__publication-date">{createArticle}</span>
        </div>

        <img src={authorAvatar} alt="User avatar" className="user-information__avatar" />
      </div>
    </div>
  );
}

export default Card;
