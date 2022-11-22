
module.exports = mongoose =>{
    var products = mongoose.Schema({
        userId: String,
        userName: String,
        userImage: String,
        title: String,
        content: {
            price: String,
            image: String,
        },
    },{timestamps: true})

    products.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Product = mongoose.model("products", products)
    return Product;
}