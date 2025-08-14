import "./AppHeader.css";
import SiteLogo from "../../img/SiteLogo.png";
import givatiLogo from "../../img/Logo.png";
import logo2 from "../../img/Logo2.png";
function AppHeader() {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="image-container" style={{ margin: "0 auto" }}>
          <img src={givatiLogo} alt={givatiLogo} />
          <p>מכתב אישי </p>
          <img src={logo2} alt={logo2} />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
