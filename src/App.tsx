import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { getRandomUser } from './api/fetchData';
import { User, UserNormalized } from './types/User';
import { Loader } from './components/Loader/Loader';
import { UserCard } from './components/UserCard/UserCard';
import './App.scss';

export function userNormalizing(userFromServer: User):UserNormalized {
  const { info, results } = userFromServer;
  const personalInfo = results[0];

  return {
    ...personalInfo,
    ...info,
    fullName: `${personalInfo.name.first} ${personalInfo.name.last}`,
  };
}

export const App: React.FC = () => {
  const [users, setUsers] = useState<UserNormalized[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollButtonShown, setIsScrollButtonShown] = useState(false);

  async function loadNewUser() {
    setIsLoading(true);

    try {
      const userFromServer: User = await getRandomUser();
      const userNormalized = userNormalizing(userFromServer);

      setUsers(prevUsers => [userNormalized, ...prevUsers]);
    } finally {
      setIsLoading(false);
    }
  }

  const clearAllUsers = () => {
    setUsers([]);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    setIsScrollButtonShown(window.scrollY > 400);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <main className="page">
        <div className="container">
          <div className="container__body">
            <h1 className="container__title">
              Here you can generate
              <span> random user profile </span>
              for personal usage
            </h1>
            <div className="container__box">
              <button
                type="button"
                className={classNames(
                  'container__button container__button_load',
                  { container__button_isDisabled: isLoading },
                )}
                onClick={() => loadNewUser()}
              >
                {!users.length ? 'Click on me!' : 'Load one more user'}
              </button>
              {users.length > 0 && (
                <button
                  type="button"
                  className="container__button container__button_clear"
                  onClick={() => clearAllUsers()}
                >
                  Clear all!
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="page__content">
          {users.length > 0 && (
            <div className="page__users-list">
              {users.map(user => (
                  <UserCard key={user.seed} user={user} />
              ))}
            </div>
          )}

          {isLoading && <Loader />}
        </div>

        {/* eslint-disable */}
        {isScrollButtonShown && (
          <button
            type="button"
            className="page__scroll"
            onClick={() => handleScrollToTop()}
          />
        )}
        {/* eslint-enable */}
      </main>
    </div>
  );
};
