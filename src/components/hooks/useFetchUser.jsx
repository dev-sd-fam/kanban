// src/hooks/useFetchUser.js

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";

const useFetchUser = () => {
  const login = window.localStorage.getItem("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {
      // Fetch user data based on login ID
      dispatch(fetchUsers(login))
        .then((response) => setUser(response.payload))
        .then(() => setLoading(false))
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [dispatch, login]);

  return { user, loading, error };
};

export default useFetchUser;
