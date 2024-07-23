import { Link } from "react-router-dom";
import Wrapper from "../wrapper/Wrapper";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <div className="flex ">
          <span className="logo">
            <Link>KanBan Board</Link>
          </span>
          <div className="right-container">
            <span>Copyright by &copy; KanBan</span>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
