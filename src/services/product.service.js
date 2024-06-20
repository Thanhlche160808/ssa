// ** Repository
import productRepository from "../repository/product.repository.js";
import categoryRepository from "../repository/category.repository.js";

// ** Constants
import { sortOptions } from "../constants/query.constant.js";

const productService = {
  createProduct: async ({
    productName,
    type,
    description,
    thumbnail,
    images,
    categoryId,
    price,
    colourVariant,
  }) => {
    try {
      const productCode = Math.random().toString(36).slice(2, 7);

      const { colourName } = colourVariant;

      var displayNameComponent = [productName, type, colourName];
      const displayName = displayNameComponent.join(" - ");

      const category = await categoryRepository.getById(categoryId);

      const product = await productRepository.create({
        productCode: productCode.toLocaleUpperCase(),
        productName,
        type,
        displayName,
        description,
        thumbnail,
        images,
        categoryId: category._id,
        price,
        colourVariant,
      });

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  productDetail: async (productId) => {
    return await productRepository.findById(productId);
  },

  getAllProduct: async ({
    page,
    size,
    displayName,
    min,
    max,
    isHide,
    priceSort,
  }) => {
    const skip = (page - 1) * size;

    const query = {};
    if (displayName) query.displayName = { $regex: displayName, $options: "i" };
    if (min || max) query.price = { $gte: min, $lte: max };
    if (isHide !== undefined) query.isHide = isHide;

    const sortOptions = {};

    if (priceSort === sortOptions.ASC) {
      sortOptions.price = 1;
    } else if (priceSort === sortOptions.DESC) {
      sortOptions.price = -1;
    }

    const totalDocuments = await productRepository.totalDocuments(query);
    const totalPage = Math.ceil(totalDocuments / size);

    const products = await productRepository.filterProducts(
      query,
      skip,
      size,
      sortOptions
    );

    return {
      products,
      totalPage,
      totalDocuments,
    };
  },

  deleteProduct: async ({ productId }) => {
    return await productRepository.findAndChangeVisibility(productId);
  },

  updateProduct: async (productId, updatedData) => {
    const { productName, type, colourVariant } = updatedData;

    const { colourName } = colourVariant;

    var displayNameComponent = [productName, type, colourName];
    const displayName = displayNameComponent.join(" - ");
    updatedData.displayName = displayName;

    return await productRepository.findAndUpdate(productId, updatedData);
  },
};

export default productService;
