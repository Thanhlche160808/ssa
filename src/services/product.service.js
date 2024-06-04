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
  getAllProduct: async (page, size, price, productName) => {
    const skip = (page - 1) * size;
    const query = {};
    if (productName) query.productName = { $regex: productName, $options: "i" };
    const sortOptions = {};
    if (price) sortOptions.createdAt = parseInt(price);

    const totalDocuments = await productRepository.totalDocuments(query);
    const totalPage = Math.ceil(totalDocuments / size);
    const products = await productRepository.filterProducts(query)
      .skip(skip)
      .limit(size)
      .sort(sortOptions)
    return {
      products,
      totalPage,
      totalDocuments,
    };
  }

};

export default productService;
