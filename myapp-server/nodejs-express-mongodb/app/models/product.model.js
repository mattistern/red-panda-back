module.exports = mongoose => {
    const Product = mongoose.model(
      "products",
      mongoose.Schema(
        {
          productName: String,
          productPrice: Number,
          productCategory: String,
          //productImage: Map,
        },
        { timestamps: true }
      )
    );
    return Product;
  };