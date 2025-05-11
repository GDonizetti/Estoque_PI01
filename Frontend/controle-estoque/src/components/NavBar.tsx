import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const exit = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/Login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbrand-semibold">Dulcy Lanchonete</div>
        <ul className="nav-links body-medium">
          <li>
            <Link to="/StockMain">Estoque</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="exit-button button-semibold" onClick={() => exit()}>
          Sair
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
