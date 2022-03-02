import { useState } from 'react';

export default function useUserNameCurr() {
  const getUserNameCurr = () => {
    const UserNameCurrString = sessionStorage.getItem('UserNameCurr');
    const userUserNameCurr = JSON.parse(UserNameCurrString);
    return userUserNameCurr?.UserNameCurr
  };

  const [UserNameCurr, setUserNameCurr] = useState(getUserNameCurr());

  const saveUserNameCurr = userUserNameCurr => {
    sessionStorage.setItem('UserNameCurr', JSON.stringify(userUserNameCurr));
    setUserNameCurr(userUserNameCurr.UserNameCurr);
  };

  return {
    setUserNameCurr: saveUserNameCurr,
    UserNameCurr
  }
}
