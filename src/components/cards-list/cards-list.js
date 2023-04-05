import "./cards-list.scss";
import Card from "../card";
import { useSelector } from "react-redux";
import { format } from "date-fns";

function CardsList({ page }) {
  const id = 10;

  const articlesData = useSelector((state) => state.articles.articles);

  const articles =
    articlesData.length !== 0
      ? articlesData.articles.map((el, i) => {
          const userName = el.author.username;
          const authorAvatar = el.author.image;
          const createArticle = format(new Date(el.createdAt), "MMMM d, y");
          const description = el.description;
          const favoritesCount = el.favoritesCount;
          const title = el.title;
          const tagList = el.tagList;
          const slug = el.slug;
          const idx = id + i;
          const favorited = el.favorited;

          return (
            <li key={idx} className="cards-list__item">
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

  return <ul className="cards-list">{articles}</ul>;
}

export default CardsList;
