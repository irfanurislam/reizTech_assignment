import { useState, useEffect } from 'react';

import './App.css';
import Country from './components/Country';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  const [data, setMyData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterRegion, setFilterRegion] = useState('');
  const [currentPage ,setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(10)

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMyData(data);
      });
  }, []);

  const handleSortChange = event => {
    setSortOrder(event.target.value);
  };

  const handleRegionChange = event => {
    setFilterRegion(event.target.value);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedData = data.slice(0, 20).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const filteredData = data.filter(country => {
    if (filterRegion === '') {
      return true;
    } else {
      return country.region === filterRegion;
    }
  });

  const indexofLast = currentPage * countriesPerPage
  const indexFirstCountry = indexofLast - countriesPerPage
   const currentCountries = sortOrder.slice(indexofLast,indexFirstCountry)
   const renderPagination = () =>{
    const pageNumbers = Math.ceil(sortOrder.length / countriesPerPage)
    if(pageNumbers <= 1){
      return null
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
    <>
    <div className='px-10'>

    
      <div className="divider">tablist sort</div>
      <Tabs>
        <TabList>
          <Tab><div>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="asc">Name (Ascending)</option>
            <option value="desc">Name (Descending)</option>
          </select></div></Tab>
          <Tab>Filtering by Region</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-3 gap-2">
            {currentCountries.map((country, index) => (
              <Country key={index} index={index} country={country} />
            ))}
          </div>
           {renderPagination()}
        </TabPanel>
        <TabPanel>
          <div>
            <select onChange={handleRegionChange}>
              <option value="">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {filteredData.map((country, index) => (
              <Country key={index} index={index} country={country} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
      </div>
    </>
  );
}

export default App;
