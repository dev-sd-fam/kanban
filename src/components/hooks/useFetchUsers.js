// src/hooks/useFetchUsers.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/userThunks";

const useFetchUsers = (login) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (login) {
      setLoading(true);
      dispatch(fetchUsers(login))
        .unwrap()
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [login, dispatch]);

  return { user, loading, error };
};

export default useFetchUsers;
