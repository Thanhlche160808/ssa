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

    const productNameformated = await productService.formatName(productName);
    const typeformated = await productService.formatName(type);
    colourVariant.colourName = await productService.formatName(colourName);

    const displayName = `${productNameformated} - ${typeformated} - ${colourVariant.colourName}`;

    const category = await categoryRepository.getById(categoryId);
    const product = await productRepository.create({
      productCode: productCode.toLocaleUpperCase(),
      productName: productNameformated,
      type: typeformated,
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

  formatName: async (name) => {
    return name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  },

  productDetail: async (code) => {
    const product = await productRepository.findByCode(code);
    const ortherColor = await productRepository.findByProductName(product.productName);
    const result = await productService.handleformatProductResult(product);
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
    types,
    displayName,
    categoryIds,
    colors,
    minPrice,
    maxPrice,
    priceSort,
  }) => {
    const skip = (page - 1) * size;

    const query = {
      isHide: false,
    };

    if (displayName) query.displayName = { $regex: displayName, $options: "i" };
    if (types) query.type = { $in: types };
    if (categoryIds) query.category = { $in: categoryIds };
    if (colors) query["colourVariant.hex"] = { $in: colors };
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
        const totalQuantity = await productService.getTotalQuantity(product);
        const formattedProduct = await productService.handleformatProductResult(product);
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

    updatedData.productName = await productService.formatName(productName);
    updatedData.type = await productService.formatName(type);
    colourVariant.colourName = await productService.formatName(colourName);

    const displayName = `${updatedData.productName} - ${updatedData.type} - ${colourVariant.colourName}`;
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
