const db = require("../models")
const Product = db.products
const Role = db.role;

exports.createProduct = (req, res) => {
    const product = new Product({
      userId: req.userId,
      userName: req.userName,
      userImage: req.userImage,
      title: req.body.title,
      content: req.body.content,
  
    });
    product.save(product).then(data => {

      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product"
      });
    })
};

exports.findAll = (req, res) => {
    const title = req.query.title;
  
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Product.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occured while retriveing products"
        });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Product with id=${id}. Maybe Product was not created!`
          });
        } else res.send({ message: "Post was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the Post with id=" + id
        });
      });
  };
  
  exports.deleteOne = (req, res) => {
    const id = req.params.id;
  
    Product.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Post with id=${id}. Maybe Post was not created!`
          });
        } else {
          res.send({
            message: "Post was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Post with id=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Product.deleteMany({})
      .then(data => {
        res.send({
          message: ` ${data.deletedCount} Post were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Post."
        });
      });
  };
  