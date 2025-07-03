import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo2 from "../../src/images/logo-2.png";
import {
  faCartPlus,
  faSearch,
  faHeart,
  faUser,
  faBars,
  faArrowRightFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // For real-time search API call

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [searchResults, setSearchResults] = useState([]); // Search results state
  const navigate = useNavigate();

  const fetchCartCount = () => {
    const userId = sessionStorage.getItem("user_id"); // assuming user_id is stored in session
    if (userId) {
      axios
        .get(
          `http://localhost/project_6BCA/server/get_cart_items.php?user_id=${userId}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) {
            setCartCount(res.data.length);
          } else {
            setCartCount(0);
          }
        })
        .catch((error) => {
          console.error("Error fetching cart count:", error);
          setCartCount(0);
        });
    }
  };

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role) {
      setIsLoggedIn(true);
      fetchCartCount(); // fetch cart items on login
    }
  }, []);

  // Real-time search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      axios
        .get("http://localhost/project_6BCA/server/fetch_images.php")
        .then((response) => {
          if (Array.isArray(response.data)) {
            const filteredResults = response.data.filter((img) =>
              img.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
          }
        })
        .catch((error) => console.error("Error fetching images:", error));
    } else {
      setSearchResults([]); // Clear search results if query is too short
    }
  }, [searchQuery]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search submission (Enter key or search button click)
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`); // Navigate to gallery with search query
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle selecting a search result
  const handleSelectResult = (name) => {
    setSearchQuery(name); // Set selected name to search query
    navigate(`/explore?q=${encodeURIComponent(name)}`); // Navigate to the explore page
  };

  return (
    <>
      <nav className="main_navbar">
        <div className="logo">
          <img src={logo2} alt="SketchHub Logo" />
          <h3>SketchHub</h3>
        </div>

        <div className="nav_toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className="nav_mid_box desktop_menu">
          <ul>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/about">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/explore">GALLERY</NavLink>
            </li>
            <li>
              <NavLink to="/services">SERVICES</NavLink>
            </li>
            <li>
              <NavLink to="/contact">CONTACT</NavLink>
            </li>
          </ul>
        </div>

        <div className="Nav_searchbar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search_icon"
            onClick={handleSearch}
          />

          {/* Dropdown to show search results */}
          {searchQuery.length > 2 && searchResults.length > 0 && (
            <div className="search-dropdown">
              <ul>
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectResult(result.name)}
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="right_nav desktop_menu">
          {isLoggedIn ? (
            <>
              <NavLink to="/cart">
                <FontAwesomeIcon className="Cart-icon" icon={faCartPlus} />
                <span className="cart-total-item">{cartCount}</span>
              </NavLink>
              <NavLink to="/wishlist">
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
              <NavLink to="/userdashboard">
                <button className="login_btn lbtn" onClick={goToProfile}>
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </NavLink>
              <button onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
              <NavLink to="/signup">
                <button>Signin</button>
              </NavLink>
            </>
          )}
        </div>

        <div className={`mobile_menu ${isMenuOpen ? "open" : ""}`}>
          <div className="close_btn" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <ul>
            <li>
              <NavLink to="/" onClick={toggleMenu}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={toggleMenu}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore" onClick={toggleMenu}>
                GALLERY
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={toggleMenu}>
                SERVICES
              </NavLink>
            </li>
            <li>
              <NavLink to="/contaact" onClick={toggleMenu}>
                CONTACT
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <>
                  <NavLink to="/cart" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    Cart
                  </NavLink>
                  <NavLink to="/wishlist" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faHeart} />
                    Wishlist
                  </NavLink>
                  <NavLink to="/userdashboard" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={toggleMenu}>
                    <button>Login</button>
                  </NavLink>
                  <NavLink to="/signup" onClick={toggleMenu}>
                    <button>Signin</button>
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
