// ** Services
import productRepository from "../repository/product.repository";

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

      const { colourName, hex, sizes } = colourVariant;

      var displayNameComponent = [productName, type, colourName];
      const displayName = displayNameComponent.join(" - ");

      const product = await productRepository.create({
        productCode,
        productName,
        type,
        displayName,
        description,
        thumbnail,
        images,
        categoryId,
        price,
        colourVariant,
      });

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllProduct: async ({
    page,
    size,
    min,
    max,
    productName,
    priceSort,
    isHide,
  }) => {
    const skip = (page - 1) * size;

    const query = {};
    if (productName) query.productName = { $regex: productName, $options: "i" };
    if (min) query.min = { $gte: min };
    if (max) query.max = { $lte: max };
    if (isHide !== undefined) query.isHide = isHide;

    const sortOptions = {};
    if (priceSort) sortOptions.priceSort = parseInt(priceSort);

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
    return await productRepository.findAndUpdate(productId, updatedData);
  },
};

export default productService;
