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
    return res.json(dev);
  },
  async index(req, res, next) {
    const devs = await Dev.find();
    return res.json(devs);
  },
  async update(req, res, next) {
    const { github_username } = req.query;
    const dev = await Dev.find({
      github_username: {
        $eq: github_username
      }
    });
    return res.json(dev);
  },
  async destroy() {}
};
