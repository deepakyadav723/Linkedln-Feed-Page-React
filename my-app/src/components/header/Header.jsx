import React from "react";

import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="headerLeftSection">
        <SearchBar />
      </div>
      <nav className="headerRightSection">
        <Navbar />
      </nav>
    </header>
  );
};

export default Header;
