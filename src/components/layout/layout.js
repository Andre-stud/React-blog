import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { addUserData } from '../../store/user-slice';
import { fetchArticles } from '../../store/articles-slice';

import avatar from './avatar.svg';

function Layout() {
  const userDat = useSelector((state) => state.regUser.userData);
  const userStatus = useSelector((state) => state.regUser.status);
  const userAuthorized = localStorage.getItem('user');

  const [userData, setUserData] = useState(userDat);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  const img = user?.user?.image ? user.user.image : avatar;

  useEffect(() => {
    if (userAuthorized) {
      dispatch(addUserData(user.user));
      setUserData(user.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus]);

  const personDitails = userData ? (
    <Link to="/profile" className="user-info">
      <span className="user-info__name">{userData.username}</span>
      <img src={img} alt="User avatar" className="user-info__avatar" />
    </Link>
  ) : null;

  const logOut = () => {
    localStorage.removeItem('user');
    setUserData(null);
  };

  const clickBlogName =() =>{
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

          {userData ? (
            <Link onClick={logOut} to="/" className="create-article link-log-out">
              Log Out
            </Link>
          ) : null}

          {!userData ? (
            <Link to="/sing-in" className="sing-in-link">
              Sign In
            </Link>
          ) : null}

          {!userData ? (
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
