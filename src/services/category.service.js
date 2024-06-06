// ** Model
import Category from "../models/category.js";

// ** Repository
import cateRepository from "../repository/category.repository.js";

const cateService = {
    getAll: async () => {
        return await cateRepository.getAll()
    },

    getById: async (id) => {
        return await cateRepository.getById(id);
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

        return cateRepository.create(category);
    },

    update: async (id, { name, description, isHide }) => {
        const nameExists = await Category.findOne({ name });
        if (nameExists) {
            throw new Error('Category already exists');
        }

        return cateRepository.update(id, { name, description, isHide });
    },

    delete: async (id) => {
        return cateRepository.changeStatus(id);
    },

    //get all existing categories in DB (for admin only)
    searchAndPaginate: async (page, size, name) => {
        const startIndex = (page - 1) * size;
        const query = { name: { $regex: name, $options: 'i' } };

        try {
            const listCategory = await cateRepository.searchAndPaginate(startIndex, size, query);
            return {
                items: listCategory.item,
                totalPage: Math.ceil(listCategory.total / size),
                activePage: page
            }
        } catch (error) {
            return {
                message: "Error"
            }
        }
    },

    //get all active category (for user's client)
    searchActivePagination: async (page, size, name) => {
        const startIndex = (page - 1) * size;
        const query = {
            name: { $regex: name, $options: 'i' },
            isHide: false
        };
        try {
            const listCategory = await cateRepository.searchAndPaginate(startIndex, size, query);
            console.log(listCategory);
            return {
                items: listCategory.item,
                totalPage: Math.ceil(listCategory.total / size),
                activePage: page
            }
        } catch (error) {
            return {
                message: "Error"
            }
        }
    },
}

export default cateService;