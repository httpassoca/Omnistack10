import React from "react";
import "./style.css";
function devItem({ dev }) {
  return (
    <li key={dev._id} className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <p className="title">{dev.name}</p>
          <p className="techs">{dev.techs ? dev.techs.join(", ") : ""}</p>
        </div>
      </header>
      <div>
        <p className="bio">{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`}>
          Acessar perfil no Github
        </a>
      </div>
    </li>
  );
}

export default devItem;
