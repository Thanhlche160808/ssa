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
    colour,
  }) => {
    try {
      const productCode = Math.random().toString(36).slice(2, 7);
      const { colourName, hex, sizes } = colour;

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
        colour,
      });

      return product;

    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default productService;
