import React, { useEffect, useState } from "react";

function DeleteDev({ onSubmit }) {
  const [Dgithub_username, setDGithubUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit(Dgithub_username);
    setDGithubUsername("");
  }
  return (
    <aside className="aside">
      <div className="title"> Deletar </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="Dgithub_username"> -> Username do Github</label>
            <input
              name="Dgithub_username"
              id="Dgithub_username"
              required
              value={Dgithub_username}
              onChange={e => setDGithubUsername(e.target.value)}
            ></input>
          </div>

          <div className="center">
            <button type="submit"> Remover </button>
          </div>
        </form>
      </div>
    </aside>
  );
}

export default DeleteDev;
