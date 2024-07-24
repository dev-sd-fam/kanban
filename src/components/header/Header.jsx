import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./header.scss";
import { deleteItem } from "../../helper";
import { useNavigate, Link } from "react-router-dom";
import useFetchUsers from "../hooks/useFetchUsers";

const Header = () => {
  const navigate = useNavigate();

  // Retrieve login information from local storage
  const login = window.localStorage.getItem("login");
  const { user, loading, error } = useFetchUsers(login);

  const handleLogout = () => {
    deleteItem({ key: "login" });
    navigate("/login");
  };

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
                  <span className="name">{user.userName || user.name}</span>{" "}
                  <CgProfile />
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
