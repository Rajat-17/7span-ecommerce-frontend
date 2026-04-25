import { createContext, useEffect, useReducer } from "react";
import api from "../api/axios";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type State = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
};

type Action =
  | { type: "INITIALIZE"; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: "LOGIN"; payload: { user: User } }
  | { type: "LOGOUT" };

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state: State, action: any): State => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN: (state: State, action: any): State => {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  },

  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type]
    ? handlers[action.type](state, action)
    : state;

export const AuthContext = createContext<any>(null);

const setSession = (token: string | null, user?: User) => {
  if (token) {
    localStorage.setItem("token", token);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;
  }
};

const isValidToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser && isValidToken(token)) {
          setSession(token);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: JSON.parse(storedUser),
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error("Auth init error:", err);

        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    const { token, user } = res.data.data;

    setSession(token, user);

    dispatch({
      type: "LOGIN",
      payload: { user },
    });
  };

  const logout = async () => {
    setSession(null);

    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}