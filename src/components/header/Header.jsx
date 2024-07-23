import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./header.scss";
import { deleteItem } from "../../helper";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve login information from local storage
  const login = window.localStorage.getItem("login");
  const user = useSelector((state) => state.users[0]);

  useEffect(() => {
    if (login) {
      // Fetch user data based on login ID
      dispatch(fetchUsers(login))
        .then(() => setLoading(false))
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [login, dispatch]);

  const handleLogout = () => {
    deleteItem({ key: "login" });
    navigate("/login");
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <header className="header">
      <Wrapper>
        <div className="navbar flex">
          <h1 className="logo">
            <Link to="/">KanBan Board</Link>
          </h1>
          {login && (
            <div className="right-container flex">
              <Link to="/add-task" className="add-task flex">
                Add Task <IoIosAddCircleOutline />
              </Link>
              <button className="logout flex" onClick={handleLogout}>
                Logout <AiOutlineLogout />
              </button>
              {user && (
                <div className="flex profile">
                  <span className="name">{loading ? "loading..." : user.name}</span> <CgProfile />
                </div>
              )}
            </div>
          )}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
