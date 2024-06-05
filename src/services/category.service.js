// ** Model
import Category from "../models/category";

const cateService = {
    getAll: async () => {
        return await Category.find();
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
        await Category.create(category)
        return category;
    },

    update: async (id ,{name, description, isHide }) => {
        const nameExists = await Category.findOne({ name });
        if (nameExists) {
            throw new Error('Category already exists');
        }
        console.log(id);
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

    // delete: async (id) => {
    //     const category = await Category.findById(id);
    //     if (!category) {
    //         throw new Error('Category not existed');
    //     }
    //     category.isHide = category.isHide ==  false ? true : false;
    //     await category.save()

    //     return category;
    // }
}

export default cateService;