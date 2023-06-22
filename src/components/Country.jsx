import React from "react";

const Country = ({ country }) => {
  const { name, region ,area} = country;
  return (<div>
      <div className="card min-h-full bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Country Name: {name}</h2>
          <p>Region: {region}</p>
          <p>Area:{area}</p>
          {/* <div className="card-actions justify-end">
            <button className="btn">Buy Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Country;
