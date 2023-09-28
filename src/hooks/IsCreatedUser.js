import React from "react";
import {useSelector} from "react-redux";


const IsCreatedUser = (values, validate) => {
  const usersStore = useSelector(state => state.auth.users);
  const isCreatedUser = usersStore.find(user => user.username === values.username && user.password === values.password) !== undefined;

  return isCreatedUser ? validate : true;
}

export default IsCreatedUser;