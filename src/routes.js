const { Router } = require("express");
const routes = new Router();
const DevController = require("./Controllers/DevController");
const SearchController = require("./Controllers/SearchController");
routes.get("/", (req, res) => {
  return res.json({ message: "First page" });
});

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.delete("/devs/:username", DevController.destroy);

routes.get("/search", SearchController.index);
module.exports = routes;
