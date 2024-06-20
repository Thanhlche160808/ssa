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
    const productCode = Math.random().toString(36).slice(2, 12);

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

    const productJson = product.toJSON();
    delete productJson.__v;
    delete productJson._id;
    delete productJson.createdAt;
    delete productJson.updatedAt;

    return productJson;
  },

  productDetail: async (code) => {
    const product = await productRepository.findByCode(code);
    return await productService.handleformatProductResult(product);
  },

  handleformatProductResult: async (product) => {
    const sizeMetrics = product.colourVariant.sizeMetrics.map((color) => {
      return {
        size: color.size,
        quantity: color.quantity,
      };
    });

    return {
      productCode: product.productCode,
      productName: product.productName,
      type: product.type,
      displayName: product.displayName,
      description: product.description,
      images: product.images,
      category: product.category.name,
      price: product.price,
      salePrice: product.salePrice,
      isHide: product.isHide,
      colourVariant: {
        colourName: product.colourVariant.colourName,
        hex: product.colourVariant.hex,
        sizeMetrics,
      },
    };
  },

  getAllProduct: async ({
    page,
    size,
    displayName,
    categoryId,
    color,
    minPrice,
    maxPrice,
    priceSort,
  }) => {
    const skip = (page - 1) * size;

    const query = {
      isHide: false,
    };

    if (displayName) query.displayName = { $regex: displayName, $options: "i" };
    if (categoryId) query.category = categoryId;
    if (color) query["colourVariant.hex"] = color;
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { $lte: maxPrice };

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

    const result = await productService.formatProductResult(products);

    return {
      products: result,
      totalPage,
      totalDocuments,
    };
  },

  getPoductDashboard: async ({
    page,
    size,
    displayName,
    categoryId,
    color,
    minPrice,
    maxPrice,
    priceSort,
  }) => {

    const skip = (page - 1) * size;

    const query = {};

    if (displayName) query.displayName = { $regex: displayName, $options: "i" };
    if (categoryId) query.category = categoryId;
    if (color) query["colourVariant.hex"] = color;
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { $lte: maxPrice };

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

    const result = await Promise.all(
      products.map(async (product) => {
        const formattedProduct = await productService.handleformatProductResult(product);
        return formattedProduct;
      })
    ); 

    console.log('result', result);
    return {
      products: result,
      totalPage,
      totalDocuments,
    };
  },

  formatProductResult: async (products) => {
    const result = products.map((product) => {
      const totalQuantity = product.colourVariant.sizeMetrics.reduce(
        (acc, size) => acc + size.quantity,
        0
      );
      return {
        productCode: product.productCode,
        productName: product.productName,
        displayName: product.displayName,
        type: product.category.name,
        colorName: product.colourVariant.colourName,
        salePrice: product.salePrice,
        price: product.price,
        images: product.images,
        totalQuantity,
      };
    });

    return result;
  },

  deleteProduct: async (code) => {
    const product = await productRepository.findAndChangeVisibility(code);
    return await productService.handleformatProductResult(product);
  },

  updateProduct: async (productCode, updatedData) => {
    const { productName, type, colourVariant } = updatedData;

    const { colourName } = colourVariant;

    const displayNameComponent = [productName, type, colourName];
    const displayName = displayNameComponent.join(" - ");
    updatedData.displayName = displayName;

    const product = await productRepository.findAndUpdate(productCode, updatedData);

    return await productService.handleformatProductResult(product);
  },

  getAllColors: async () => {
    const products = await productRepository.getAllProducts();
    const colors = products.reduce((acc, product) => {
      const color = {
        colorName: product.colourVariant.colourName,
        hex: product.colourVariant.hex,
      };
      if (!acc.find((item) => item.colorName === color.colorName)) {
        acc.push(color);
      }
      return acc;
    }, []);

    return colors;
  },
};

export default productService;
