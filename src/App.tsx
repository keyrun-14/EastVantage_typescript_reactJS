import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import female from "./female.png"
import male  from "./male.png"

const App:React.FC = ()=> {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://randomuser.me/api");
      const data = result.data.results;
      const req_data = {
        gender:data[0]["gender"],
        name: data[0]["name"],
        email: data[0]["email"],
        cell: data[0]["cell"],
        address: data[0]["location"],
      };
    
      setUserDetails([req_data]);
      // localStorage.setItem('myData'+count,req_data.name.title+" "+req_data.name.first+" "+req_data.name.last);
      localStorage.setItem("myData" + count, JSON.stringify(result));
    };
    fetchData();
  }, [count]);

  return (
    <div className="container">
<div className="App">
      <div className="header"><h1>Employee Card</h1></div>
      {userDetails.map((item) => {
        return (
          <div className="card">
            
            <div className="left">
         
            <img className="image" src={(item.gender==="male")?male:female} alt="pic"></img>
              <h1 className="name">
               {item.name.title} {item.name.first} {item.name.last}
              </h1>
              <p className="email">
                <b>E-mail:</b> {item.email}
              </p>

              <p className="cell">
                <b>Cell:</b> {item.cell}
              </p>
            </div>
            <div className="right">
              <p className="address-details">
                <b>City:</b> {item.address.city}
              </p>
              <p className="address-details">
                <b>State:</b> {item.address.state}
              </p>
              <p className="address-details">
                <b>Country:</b> {item.address.country}
              </p>
              <p className="address-details">
                <b>Postcode:</b> {item.address.postcode}
              </p>
              <p className="address-details">
                <b>Latitude:</b> {item.address["coordinates"]["latitude"]}
              </p>
              <p className="address-details">
                <b>Longitude:</b> {item.address["coordinates"]["longitude"]}
              </p>
            </div>
          </div>
        );
      })}
      <button className="refresh" onClick={() => setCount(count + 1)}>refresh</button>
    </div>

    </div>
    
  );
}
export default App
