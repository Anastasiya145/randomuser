import React from 'react';
import { UserNormalized } from '../../types/User';
import { PropertyList } from '../PropertyList/PropertyList';
import './userCard.scss';

type Props = {
  user: UserNormalized,
};

const chooseProperties = (currentUser: UserNormalized) => {
  return {
    gender: currentUser.gender,
    country: currentUser.location.country,
    timeZone: currentUser.location.timezone.offset,
    yearsOnSite: currentUser.registered.age,
  };
};

export const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card__main-info">
        <h2 className="user-card__name">
          {user.fullName}
        </h2>
        <img
          alt={`user ${user.fullName}`}
          src={user.picture.large}
          className="user-card__photo"
        />
        <p className="user-card__age">
          {`${user.dob.age} years`}
        </p>
      </div>

      <div className="user-card__info">
        <PropertyList properties={chooseProperties(user)} />
      </div>

      <div className="user-card__contacts">
        <p className="user-card__contacts-title">
          {`${user.gender === 'male' ? 'His' : 'Her'} contacts:`}
        </p>
        <div className="user-card__actions">
          <a className="user-card__phone" href={`tel:+${user.phone}`}>
            Phone
          </a>
          <a className="user-card__email" href={`malito:${user.email}`}>
            Email
          </a>
        </div>
      </div>
    </div>
  );
};
