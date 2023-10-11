import React from 'react';

const ErrorMessage = ({ name, className, component: Component }) => {
  return (
    <Component className={className} name={name}>
      Ошибка: {name}
    </Component>
  );
};

export default ErrorMessage;
