const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {};
db.mongoose = mongoose;

db.user = require("./user.models")(mongoose)
db.products = require("../models/product.models")(mongoose);
db.role = require("./role.models");

db.ROLES = ["user", "admin", "shop"];

module.exports = db;