import React, { useState, useEffect } from "react";
import "./style.css";

function SignUp({ onSubmit }) {
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // GeoPosition
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({ github_username, techs, lat: latitude, long: longitude });
    setTechs("");
    setGithubUsername("");
  }
  return (
    <aside className="aside">
      <div className="title"> Cadastrar </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username"> -> Username do Github</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            ></input>
          </div>
          <div className="input-block">
            <label htmlFor="techs">-> Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            ></input>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="lat">-> Latitude</label>
              <input
                type="number"
                name="lat"
                id="lat"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              ></input>
            </div>
            <div className="input-block">
              <label htmlFor="long">-> Longitude</label>
              <input
                type="number"
                name="long"
                id="long"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="center">
            <button type="submit"> Cadastrar</button>
          </div>
        </form>
      </div>
    </aside>
  );
}

export default SignUp;
