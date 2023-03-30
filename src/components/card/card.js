import "./card.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { fetchArticle } from "../store/articles-slice";
import { useDispatch } from "react-redux";

function Card({
  userName,
  authorAvatar,
  createArticle,
  description,
  favoritesCount,
  title,
  tagList,
  slug,
  idx,
}) {
  const cardTagList = tagList.map((el, id) => (
    <span key={idx + id} className="tag">
      {el}
    </span>
  ));

  const dispatch = useDispatch();

  const clickLink = () => {
    dispatch(fetchArticle(slug));
  };

  return (
    <div className="card">
      <div className="card-header">
        <Link
          onClick={clickLink}
          to={`/articles/${slug}`}
          className="card-header__title"
        >
          {title}
        </Link>
        <HeartOutlined className="card-header__button-like" />
        <HeartFilled className="card-header__button-like heart-filled" />

        <span className="card-header__likes-counter">{favoritesCount}</span>
      </div>
      {cardTagList}
      <p className="text-card">{description}</p>
      <div className="user-information">
        <div className="user-information__card">
          <span className="user-information__name">{userName}</span>
          <span className="user-information__publication-date">
            {createArticle}
          </span>
        </div>

        <img
          src={authorAvatar}
          alt="User avatar"
          className="user-information__avatar"
        />
      </div>
    </div>
  );
}

export default Card;
