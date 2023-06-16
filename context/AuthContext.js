import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

let users;
if (typeof window !== 'undefined') {
  users =
    localStorage.getItem('users') !== 'undefined'
      ? JSON.parse(localStorage.getItem('users'))
      : null;
}

const initialState = {
  user: users ? users : null,
};

export const actionType = {
  SET_USER: 'SET_USER',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
