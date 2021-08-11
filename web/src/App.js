import React, { useState, useEffect } from "react";
import "./css/base.css";
import "./css/modules/app.css";
import "./css/modules/sidebar.css";
import "./css/modules/main.css";
import "./services/api";
import api from "./services/api";
import DevItem from "./components/devItem";
import SignUp from "./components/signUp";
import DeleteDev from "./components/DeleteDev";

function App() {
  const [devs, setDevs] = useState([]);

  async function loadDevs() {
    const res = await api.get("/devs");
    setDevs(res.data);
  }
  useEffect(() => {
    loadDevs();
  }, []);

  // useEffect(() => {}, [devs]);

  async function handleAddDev(userData) {
    const res = await api.post("/devs", userData);
    setDevs([...devs, res.data]);
    loadDevs();
  }

  async function handleRemoveDev(userDelete) {
    console.log(userDelete, "handleRemoveDev");
    const res = await api.delete("/devs/" + userDelete);
    console.log(res.data);
    loadDevs();
  }
  return (
    <div id="app">
      <div className="menu">
        <SignUp onSubmit={handleAddDev} />
        <DeleteDev onSubmit={handleRemoveDev} />
      </div>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;


/* . */