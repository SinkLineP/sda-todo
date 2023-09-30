import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root', // Ключ, под которым данные будут сохранены в localStorage
  storage, // Используемый механизм хранения, в данном случае, localStorage
  // Добавьте другие настройки, если необходимо
};

export default persistConfig;