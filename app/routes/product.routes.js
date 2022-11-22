const { authJwt } = require("../middleware"); 
const controller = require("../controllers/user.controllers");
const productControllers = require("../controllers/product.contollers")
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/create/post", [authJwt.verifyToken, authJwt.isShop], productControllers.createProduct)
    app.get("/api/get/post", [authJwt.verifyToken, authJwt.isShop , authJwt.isAdmin], productControllers.findAll)
    app.put("/api/update/post", [authJwt.verifyToken, authJwt.isShop], productControllers.update)
    app.delete("/api/delete/post", [authJwt.verifyToken, authJwt.isShop], productControllers.deleteOne)
};