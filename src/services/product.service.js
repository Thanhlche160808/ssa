// ** Repository
import productRepository from "../repository/product.repository.js";
import categoryRepository from "../repository/category.repository.js";

// ** Constants
import { sortOptions } from "../constants/query.constant.js";

// ** Helper
import firebaseHelper from "../helper/firebase.helper.js";

const productService = {
  createProduct: async ({ productName, type, description, categoryId, price, colourVariant }, images = []) => {
    const productCode = Math.random().toString(36).slice(2, 12).toUpperCase();
    const colourVariantParsed = JSON.parse(colourVariant);

    const productNameFormatted = productService.formatName(productName);
    const typeFormatted = productService.formatName(type);
    colourVariantParsed.colourName = productService.formatName(colourVariantParsed.colourName);

    const displayName = `${productNameFormatted} - ${typeFormatted} - ${colourVariantParsed.colourName}`;

    const category = await categoryRepository.getById(categoryId);

    const product = await productRepository.create({
      productCode,
      productName: productNameFormatted,
      type: typeFormatted,
      displayName,
      description,
      categoryId: category._id,
      price,
      colourVariant: colourVariantParsed,
    });

    if (product) {
      const urls = await firebaseHelper.uploadToStorage({ displayName, productCode }, images);
      product.images = urls;
      await product.save();
    }

    return productService.handleformatProductResult(product);
  },

  formatName: (name) => {
    return name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  },

  productDetail: async (code) => {
    const product = await productRepository.findByCode(code);
    const ortherColor = await productRepository.findByProductName(product.productName);
    const result = productService.handleformatProductResult(product);
    return {
      ...result,
      ortherColor: ortherColor.map((product) => {
        return {
          productCode: product.productCode,
          hex: product.colourVariant.hex,
        };
      }),
    }
  },

  getTotalQuantity: async (product) => {
    const totalQuantity = product.colourVariant.sizeMetrics.reduce(
      (acc, size) => acc + size.quantity,
      0
    );
    return totalQuantity;
  },

  handleformatProductResult: (product) => {
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
      category: {
        id: product.category._id,
        name: product.category.name,
      },
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
    types,
    displayName,
    categoryIds,
    categoryNames,
    colors,
    colorNames,
    minPrice,
    maxPrice,
    priceSort,
  }) => {
    const skip = (page - 1) * size;

    const query = {
      isHide: false,
    };

    if (displayName) query.displayName = { $regex: displayName, $options: "i" };

    if (types) query.type = productService.handleGenereateQueryArray(types);

    if (categoryIds) query.category = { $in: categoryIds };

    if (colors) query["colourVariant.hex"] = productService.handleGenereateQueryArray(colors);

    if (minPrice) query.price = { $gte: minPrice };

    if (maxPrice) query.price = { $lte: maxPrice };

    if (categoryNames) query["category.name"] = productService.handleGenereateQueryArray(categoryNames);

    if (colorNames) query["colourVariant.colourName"] = productService.handleGenereateQueryArray(colorNames);

    const sort = {};

    if (priceSort === sortOptions.ASC) {
      sort.price = 1;
    } else if (priceSort === sortOptions.DESC) {
      sort.price = -1;
    }

    const totalDocuments = await productRepository.totalDocuments(query);
    const totalPage = Math.ceil(totalDocuments / size);

    const products = await productRepository.filterProducts(
      query,
      skip,
      size,
      sort
    );

    const result = await productService.formatProductResult(products);

    return {
      products: result,
      totalPage,
      totalDocuments,
    };
  },

  handleGenereateQueryArray: (array) => {
    if (Array.isArray(array)) {
      return { $in: array };
    } else {
      return { $regex: array, $options: "i" };
    }
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

    const sort = {};

    if (priceSort === sortOptions.ASC) {
      sort.price = 1;
    } else if (priceSort === sortOptions.DESC) {
      sort.price = -1;
    }

    const totalDocuments = await productRepository.totalDocuments(query);
    const totalPage = Math.ceil(totalDocuments / size);

    const products = await productRepository.filterProducts(
      query,
      skip,
      size,
      sort
    );

    const result = await Promise.all(
      products.map(async (product) => {
        const totalQuantity = await productService.getTotalQuantity(product);
        const formattedProduct = productService.handleformatProductResult(product);
        return {
          ...formattedProduct,
          totalQuantity,
        };
      })
    );

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
      const sizeMetrics = product.colourVariant.sizeMetrics.map((sizes) => {
        return {
          size: sizes.size,
          quantity: sizes.quantity,
        };
      });
      return {
        productCode: product.productCode,
        productName: product.productName,
        displayName: product.displayName,
        type: product.type,
        category: product.category.name,
        colorName: product.colourVariant.colourName,
        salePrice: product.salePrice,
        price: product.price,
        images: product.images,
        sizeMetrics,
        totalQuantity,
      };
    });

    return result;
  },

  deleteProduct: async (code) => {
    const product = await productRepository.findAndChangeVisibility(code);
    return productService.handleformatProductResult(product);
  },

  updateProduct: async (productCode, updatedData) => {
    const { productName, type, colourVariant } = updatedData;

    const { colourName } = colourVariant;

    updatedData.productName = await productService.formatName(productName);
    updatedData.type = await productService.formatName(type);
    colourVariant.colourName = await productService.formatName(colourName);

    const displayName = `${updatedData.productName} - ${updatedData.type} - ${colourVariant.colourName}`;
    updatedData.displayName = displayName;

    const product = await productRepository.findAndUpdate(productCode, updatedData);

    return productService.handleformatProductResult(product);
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

  handleSizeMetrics: async (sizeMetrics) => {
    const result = [];
    for (const sizeMetric of sizeMetrics) {
      result.push({
        size: sizeMetric.size,
        isAvailable: sizeMetric.quantity > 0 ? true : false,
      });

    }
    return result;
  },

};

export default productService;
