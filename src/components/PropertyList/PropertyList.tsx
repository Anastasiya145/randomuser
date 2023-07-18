import React from 'react';
import './propertyList.scss';

const stringToSeparatedWords = (str: string) => {
  return str.split(/(?=[A-Z])/).join(' ');
};

export type Props = {
  properties: {
    [key: string]: string,
  },
};

export const PropertyList: React.FC<Props> = ({ properties }) => {
  return (
    <div className="properties">
      {Object.keys(properties).map(property => (
        <div key={property} className="properties__item">
          <p className="properties__text">
            {stringToSeparatedWords(property)}
          </p>
          <p className="properties__text properties__text_value">
            {properties[property] || 'N/A'}
          </p>
        </div>
      ))}
    </div>
  );
};
