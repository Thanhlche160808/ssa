// ** Model
import Category from "../models/category.js";

const cateRepository = {
    getAll: async () => {
        return await Category.find().select('-__v');
    },

    getById: async (id) => {
        const result = await Category.findById(id).select('-__v');
        if (!result) throw new Error('Category not found');
        return result;
    },

    create: async (data) => {
        await Category.create(data)
        return data;
    },

    update: async (id, { name, description, isHide }) => {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Category not existed');
        }

        category.name = name;
        category.description = description;
        category.isHide = isHide ? isHide : category.isHide;
        await category.save()

        return category;
    },

    changeStatus: async (id) => {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Category not existed');
        }
        category.isHide = category.isHide == false ? true : false;
        await category.save()

        return category;
    },

    searchAndPaginate: async (startIndex, size, query) => {
        const listCategory = await Category.find(query).skip(startIndex).limit(size);
        const total = await Category.countDocuments(query);
        return {
            item: listCategory,
            total: total
        }
    }
}

export default cateRepository