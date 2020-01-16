const axios = require("axios");
const Dev = require("../models/Dev");
const parseSringAsArray = require("../utils/parseStringAsArray");

// Index, show, store, update, destroy

module.exports = {
  async store(req, res, next) {
    // Picking inputs values
    const { github_username, techs, lat, long } = req.body;
    // Checking existent user
    let dev = await Dev.findOne({ github_username });
    // console.log(github_username + "-" + dev);
    if (!dev) {
      // Picking github values
      const devGithub = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      // Handling the values to send a new Dev
      const { name = login, avatar_url, bio } = devGithub.data;
      const techsArray = parseSringAsArray(techs);
      const location = { type: "Point", coordinates: [long, lat] };

      // Creating a new Dev
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    } else {
      dev = "Usuário já cadastrado ";
    }
    return res.json(dev.name + " foi cadastrado com sucesso");
  },
  async index(req, res, next) {
    const devs = await Dev.find();
    let devArray = devs.map(dev => {
      let devTechs = "";
      dev.techs.forEach(tech => {
        devTechs += " " + tech;
      });
      return "Dev: " + dev.name + ", techs: " + devTechs;
    });
    return res.json(devArray.sort());
  },
  async update(req, res, next) {},
  async destroy(req, res, next) {
    let result = "";
    const github_username = req.params.username;

    let devExists = await Dev.findOne({ github_username });
    console.log(github_username + "-" + devExists);
    if (devExists) {
      await Dev.deleteOne({
        github_username: github_username
      });
      let devRemoved = await Dev.findOne({ github_username });
      console.log(github_username + "-" + devRemoved);
      result = devRemoved ? "Error" : "User has been deleted";
    } else {
      result = "This user doesn't exists";
    }
    return res.send(result);
  }
};
