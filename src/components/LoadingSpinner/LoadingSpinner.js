import React, {useEffect, useState} from 'react';
import styles from "./LoadingSpinner.module.css"

const LoadingSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false); // Убрать спиннер после искусственной задержки (например, 2 секунды)
    }, 2000); // Искусственная задержка в 2 секунды (2000 миллисекунд)
  }, []);

  return (
    <div className={`loading-spinner ${showSpinner ? 'show' : 'hide'}`}>
      <div className="spinner"></div>
    </div>
  );
};
export default LoadingSpinner;