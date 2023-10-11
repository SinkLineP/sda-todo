import React, { useState, useEffect } from "react";

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // Код, который может вызвать ошибку
    } catch (error) {
      // Если произошла ошибка, устанавливаем флаг ошибки в true
      setHasError(true);
    }
  }, [hasError]);

  if (hasError) {
    // Отображение сообщения об ошибке или запасного интерфейса
    return <div>Что-то пошло не так. Попробуйте позже.</div>;
  }

  return props.children;
}

export default ErrorBoundary;