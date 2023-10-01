import {useSelector} from "react-redux";


export default function IsAuth() {
  const currentUser = useSelector(state => state.auth.currentUser);
  return currentUser.id !== null && currentUser.username !== "" && currentUser.password !== "";
}



