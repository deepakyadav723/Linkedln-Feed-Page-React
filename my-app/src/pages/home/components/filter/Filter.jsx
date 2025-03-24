import React, { useState } from "react";

import FilterByDate from "./FilterByDate.jsx";
import Sort from "./Sort.jsx";

import "./filter.css";

const Filter = () => {
  const [sortOrder, setSortOrder] = useState("");
  return (
    <div className="filtersSection">
      <FilterByDate setSortOrder={setSortOrder} />
      <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
    </div>
  );
};

export default Filter;
