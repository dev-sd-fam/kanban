import Wrapper from "../wrapper/Wrapper";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <div className="flex ">
          <h1 className="logo">KanBan Board</h1>
          <div className="right-container">
            <span>Copyright by &copy; KanBan</span>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
