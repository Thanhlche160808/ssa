// ** Models
import Product from "../models/product";

const productRepository = {
  create: async (product) => {
    try {
      const productExist = await Product.findOne({
        productName: product.productName,
      });

      if (productExist) {
        throw new Error("Product already exists");
      }

      const newProduct = new Product({
        productCode: product.productCode,
        productName: product.productName,
        displayName: product.displayName,
        description: product.description,
        thumbnail: product.thumbnail,
        images: product.images,
        categoryId: product.categoryId,
        price: product.price,
        colour: product.colour,
      });

      return await newProduct.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  findByProductName: async (productName) => {
    const product = await Product.findOne({ productName });

    if (!product) throw new Error("Not found");

    return product;
  },
};

export default productRepository;
