const parseSringAsArray = require("../utils/parseStringAsArray");
const Dev = require("../models/Dev");
module.exports = {
  async index(req, res, next) {
    // Search all devs close 10km
    // Filtrar por techs
    const { lat, long, techs } = req.query;
    const techsArray = parseSringAsArray(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json({ devs });
  }
};
