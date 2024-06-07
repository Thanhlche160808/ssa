// ** Models
import Product from "../models/product.js";

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
        type: product.type,
        displayName: product.displayName,
        description: product.description,
        thumbnail: product.thumbnail,
        images: product.images,
        isHide: false,
        categoryId: product.categoryId,
        price: product.price,
        colourVariant: product.colourVariant,
      });

      return await newProduct.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  findById: async (productId) => {
    const product = await Product.findById(productId);

    if (!product) throw new Error("Product not found");

    return product;
  },

  findByProductName: async (productName) => {
    const product = await Product.findOne({ productName });

    if (!product) throw new Error("Product not found");

    return product;
  },

  findAndChangeVisibility: async (productId) => {
    const product = await productRepository.findById(productId);

    return await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: { isHide: !product.isHide } },
      { new: true },
    );
  },

  findAndUpdate: async (productId, updatedData) => {
    await productRepository.findById(productId);

    const query = { ...updatedData };
    return await Product.findByIdAndUpdate(productId, query, { new: true });
  },

  totalDocuments: async (query) => {
    return await Product.countDocuments(query);
  },

  filterProducts: async (query, skip, size, sortOptions) => {
    return await Product.find(query)
      .select("-__v")
      .skip(skip)
      .limit(size)
      .sort(sortOptions);
  },
};

export default productRepository;
