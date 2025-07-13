import { useSelector } from "react-redux";
import {
  selectAuthToken,
  selectIsLoggedIn,
  selectUser,
  selectIsRefreshing,

} from "../Auth/selectors";

export const useAuth = () => {
  const tokenAuth = useSelector(selectAuthToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);


  return {
    tokenAuth,
    isLoggedIn,
    user,
    isRefreshing,
  
  };
};