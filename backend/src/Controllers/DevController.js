const axios = require("axios");
const Dev = require("../models/Dev");
const parseSringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");
// Index, show, store, update, destroy

function predicateBy(prop) {
  return function(a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

//Usage
//yourArray.sort( predicateBy("age") );
//yourArray.sort( predicateBy("name") );

module.exports = {
  async store(req, res, next) {
    let result = "";
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

      // Devs registrados agr
      const sendSocketMessageTo = findConnections({ lat, long }, techsArray);
      sendMessage(sendSocketMessageTo, "new-dev", dev);
      result = dev.name + " foi cadastrado com sucesso";
    } else {
      result = dev.name + " já cadastrado ";
    }
    return res.json(result);
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
    return res.json(devs.sort(predicateBy("name")));
  },
  async update(req, res, next) {},
  async destroy(req, res, next) {
    // armazena o resultado da função
    let result = "";
    const github_username = req.params.username;

    // check if dev exists
    let devExists = await Dev.findOne({ github_username });
    if (devExists) {
      // delete and check if user was deleted
      await Dev.deleteOne({ github_username });
      let devRemoved = await Dev.findOne({ github_username });
      result = devRemoved ? "Error" : "User has been deleted";
    } else {
      result = github_username + " doesn't exists";
    }
    return res.send(result);
  }
};
