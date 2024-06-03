// ** Model
import Category from "../models/category";

const cateService = {
    getAll: async() =>{
        return await Category.find()
    },

    getById: async(id) =>{
        return await Category.findById(id);
    }
}

export default cateService;