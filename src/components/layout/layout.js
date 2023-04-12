import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { addUserData } from '../../store/user-slice';
import { fetchArticles } from '../../store/articles-slice';
import {selectUserDat, selectLoadStatus} from '../../selectors/selectors';

import avatar from './avatar.svg';

function Layout({ changePagination }) {
  const userData = useSelector(selectUserDat);
  const loadStatus = useSelector(selectLoadStatus);
  const userAuthorized = localStorage.getItem('user');

  const [isAuthorizad, setIsAuthorizad] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  const img = user?.user?.image ? user.user.image : avatar;

  useEffect(() => {
    if (userAuthorized) {
      dispatch(addUserData(user.user));
      setIsAuthorizad(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadStatus]);

  const personDitails = isAuthorizad ? (
    <Link to="/profile" className="user-info">
      <span className="user-info__name">{userData.username}</span>
      <img src={img} alt="User avatar" className="user-info__avatar" />
    </Link>
  ) : null;

  const logOut = () => {
    localStorage.removeItem('user');
    setIsAuthorizad(false);
  };

  const clickBlogName = () => {
    changePagination(1);
    dispatch(fetchArticles(0));
  };

  return (
    <>
      <header className="header">
        <Link onClick={clickBlogName} to="/" className="blog-name">
          Realworld Blog
        </Link>
        <div className="header-user-information">
          {userAuthorized ? (
            <Link to="/new-article" className="link-sing-up create-article">
              Create article
            </Link>
          ) : null}

          {personDitails}

          {isAuthorizad ? (
            <Link onClick={logOut} to="/" className="create-article link-log-out">
              Log Out
            </Link>
          ) : null}

          {!isAuthorizad ? (
            <Link to="/sing-in" className="sing-in-link">
              Sign In
            </Link>
          ) : null}

          {!isAuthorizad ? (
            <Link to="/sing-up" className="link-sing-up">
              Sign Up
            </Link>
          ) : null}
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
