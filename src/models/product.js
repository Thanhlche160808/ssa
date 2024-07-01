import mongoose from "mongoose";

export const SizeMetrics = new mongoose.Schema({
  size: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

export const ColourVariant = new mongoose.Schema({
  colourName: {
    type: String,
  },
  hex: {
    type: String,
  },
  sizeMetrics: [SizeMetrics],
});

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
    },
    productName: {
      type: String,
    },
    type: {
      type: String,
    },
    displayName: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    isHide: {
      type: Boolean,
      default: false,
    },
    initialHideStatus: {
      type: Boolean,
      default: false,
    },
    colourVariant: {
      type: ColourVariant,
    },
    price: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

let Product = mongoose.model("Product", productSchema);
export default Product;
