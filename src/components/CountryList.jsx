import { useEffect, useState } from "react";
import Country from "./Country";
import Footer from "./Footer";
import Navbar from "./Navbar";

const API_URL = "https://restcountries.com/v2/all?fields=name,region,area";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [sortedOrder, setSortedOrder] = useState("asc");
  const [filterArea, setFilterArea] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(20);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      } else {
        throw new Error("Error fetching countries");
      }
    } catch (error) {
      console.log("Error fetching countries:", error);
    }
  };

  const handleSortChange = (event) => {
    setSortedOrder(event.target.value);
  };

  const handleFilterAreaChange = (event) => {
    setFilterArea(event.target.value);
  };

  const handleFilterRegionChange = (event) => {
    setFilterRegion(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCountries = countries.filter((country) => {
    const areaThreshold = countries.find((c) => c.name === "Lithuania")?.area;

    return (
      (!filterArea || (country.area && country.area < filterArea)) &&
      (!filterRegion || country.region === filterRegion) &&
      (!areaThreshold || country.area < areaThreshold)
    );
  });

  const sortedCountries = filteredCountries.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (sortedOrder === "asc") {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
    } else {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
    }

    return 0;
  });

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = sortedCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const renderPagination = () => {
    const pageNumbers = Math.ceil(sortedCountries.length / countriesPerPage);
    if (pageNumbers <= 1) {
      return null;
    }

    return (
      <ul className="flex justify-center space-x-2 mt-10">
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((pageNumber) => (
          <li
            key={pageNumber}
            className={`border rounded-md p-2 ${
              pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Navbar></Navbar>
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Country Visualization</h1>
      <div className="flex space-x-2 mb-4">
        <label>
          Sort by:
          <select
            value={sortedOrder}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="asc">Name (Ascending)</option>
            <option value="desc">Name (Descending)</option>
          </select>
        </label>
        <label>
          Filter by area:
          <input
            type="number"
            value={filterArea}
            onChange={handleFilterAreaChange}
            placeholder="Area near Lithuania"
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label>
          Filter by region:
          <select
            value={filterRegion}
            onChange={handleFilterRegionChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">All Regions</option>
            <option value="Oceania">Oceania</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {currentCountries.map((country, index) => (
          <Country key={index} index={index} country={country} />
        ))}
      </div>
      {renderPagination()}
    </div>
    <Footer></Footer>
    </div>
  );
};

export default CountryList;
