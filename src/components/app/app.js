import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { Routes, Route } from 'react-router-dom';

import NewAccountPage from '../pages/new-account-page';
import SignInPage from '../pages/sign-in-page';
import NewArticlePage from '../pages/new-article-page';
import ArticlePage from '../pages/article-page';
import CardsList from '../cards-list';
import EditProfile from '../pages/edit-profile';
import Layout from '../layout';
import { fetchArticles } from '../../store/articles-slice';

import './app.scss';

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const articleData = useSelector((state) => state.articles.article);

  const articlesCount = useSelector((state) => state.articles.articles.articlesCount);
  const pageCount = articlesCount ? Math.ceil(articlesCount / 5) : 1;

  const slug = articleData?.article?.slug ? articleData.article.slug : null;

  const page = pageNumber * 5 - 5;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const changePagination = (e) => {
    setPageNumber(e);
  };

  const cardListPage = (
    <div className="body-items">
      <CardsList page={page} />
      <Pagination
        onChange={changePagination}
        defaultCurrent={1}
        current={pageNumber}
        defaultPageSize={1}
        total={pageCount}
        className="body-items__pagination"
      />
    </div>
  );

  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Layout page={page} changePagination={changePagination} />}>
          <Route index element={cardListPage} />
          <Route path="/sing-up" element={<NewAccountPage />} />
          <Route path="/sing-in" element={<SignInPage />} />
          <Route path="/new-article" element={<NewArticlePage />} />
          <Route path={`/articles/${slug}`} element={<ArticlePage articleData={articleData.article} page={page} />} />
          <Route path={`/articles/${slug}/edit`} element={<NewArticlePage articleData={articleData.article} />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="*" element={cardListPage} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
