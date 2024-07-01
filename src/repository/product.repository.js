// ** Models
import Product from "../models/product.js";

// ** Constants
import { categorySelect } from "../constants/query.constant.js";

const productRepository = {
  create: async (product) => {
    try {
      const productExist = await Product.findOne({
        productName: product.productName,
        "colourVariant.hex": product.colourVariant.hex,
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
        category: product.categoryId,
        price: product.price,
        colourVariant: product.colourVariant,
      });

      return await newProduct.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  findByCode: async (code) => {
    const product = await Product.findOne({ productCode: code })
      .populate("category", categorySelect)
      .select("-__v -_id -createdAt -updatedAt");

    if (!product) throw new Error("Product not found");

    return product;
  },

  findByProductName: async (productName) => {
    const product = await Product.find({ productName });

    if (!product) throw new Error("Product not found");

    return product;
  },

  findAndChangeVisibility: async (code) => {
    const product = await Product.findOne({ productCode: code });

    return await Product.findOneAndUpdate(
      { productCode: code },
      { isHide: !product.isHide },
      { new: true }
    )
      .populate("category", categorySelect)
      .select("-__v -_id -createdAt -updatedAt");
  },

  findAndUpdate: async (productCode, updatedData) => {
    const result = await Product.findOneAndUpdate(
      { productCode },
      { ...updatedData },
      { new: true }
    )
      .populate("category", categorySelect)
      .select("-__v -_id -createdAt -updatedAt");

    return result;
  },

  totalDocuments: async (query) => {
    return await Product.countDocuments(query);
  },

  filterProducts: async (query, skip, size, sortOptions) => {
    return await Product.find(query)
      .populate("category", categorySelect)
      .select("-__v")
      .skip(skip)
      .limit(size)
      .sort(sortOptions);
  },

  findProductByCode: async (productCode) => {
    const product = await Product.findOne({ productCode });
    return product;
  },

  getAllProducts: async () => {
    return await Product.find()
      .populate("category", categorySelect)
      .select("-__v -_id -createdAt -updatedAt");
  },

  changeStatusByCategory: async (categoryId, status) => {
    await Product.updateMany(
      {
        category: categoryId,
      },
      {
        isHide: status,
      }
    );
  }
};

export default productRepository;
