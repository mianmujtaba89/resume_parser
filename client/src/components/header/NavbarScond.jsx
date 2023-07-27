import React from "react";
import { Link } from "react-router-dom";
import user from "../../assets/images/icon/user.png";
import topMsg from "../../assets/images/icon/topMsg1.png";
import topAlert from "../../assets/images/icon/topAlert1.png";
import topOption from "../../assets/images/icon/topOption1.png";

export default function NavbarScond() {
  return (
    <header className="headerOne ">
      <nav className="navbar container-fluid  navbar-expand-lg navFirst">
        <div className="container-fluid">
          <a className="navbar-brand  " href="/"></a>
          <div className="topMenu ">
            <Link to="/">
              <ul className="NavIcon">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <img src={topOption} alt="...." />
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link active" aria-current="page" to="/">
                    <img src={topMsg} alt="...." />
                    <span className="position-absolute top-0 start-100 translate-middle notiBadge badge rounded-pill bg-danger">
                      4
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <img src={topAlert} alt="...." />
                    <span className="position-absolute top-0 start-100 translate-middle notiBadge badge rounded-pill bg-danger">
                      6
                    </span>
                  </Link>
                </li>
              </ul>
            </Link>
            <Link to="/createProfile">
              <img
                src={user}
                alt="...."
                width={56}
                height={56}
                className=" TopIcon rounded-circle bg-grey shadow-sm"
              ></img>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
