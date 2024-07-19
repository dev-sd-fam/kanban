import Wrapper from "../wrapper/Wrapper";

// icons
import { IoIosAddCircleOutline } from "react-icons/io";

// style
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <Wrapper>
        <div className="navbar flex ">
          <h1 className="logo">KanBan Board</h1>
          <div className="right-container">
            <button className="add-task flex">
              Add Task <IoIosAddCircleOutline />
            </button>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
