// ** Model
import Category from "../models/category";

const cateService = {
    getAll: async () => {
        return await Category.find()
    },

    getById: async (id) => {
        return await Category.findById(id);
    },

    create: async ({ name, description, isHide }) => {
        const nameExists = await Category.findOne({ name });

        if (nameExists) {
            throw new Error('Category already exists')
        }

        const category = new Category({
            name,
            description,
            isHide,
        })
        return category
    }
}

export default cateService;