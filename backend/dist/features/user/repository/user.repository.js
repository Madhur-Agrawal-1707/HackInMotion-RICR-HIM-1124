"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../model/user.model");
class UserRepository {
    async create(data) {
        const user = new user_model_1.UserModel(data);
        return user.save();
    }
    async findByEmail(email, selectPassword = false) {
        const query = user_model_1.UserModel.findOne({ email });
        if (selectPassword) {
            query.select('+password');
        }
        return query.exec();
    }
    async findById(id) {
        return user_model_1.UserModel.findById(id).exec();
    }
    async updateById(id, updateData) {
        return user_model_1.UserModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async deleteById(id) {
        return user_model_1.UserModel.findByIdAndDelete(id).exec();
    }
    async findOne(filter) {
        return user_model_1.UserModel.findOne(filter).exec();
    }
}
exports.UserRepository = UserRepository;
