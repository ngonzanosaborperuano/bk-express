import UserModel from '../models/user.js';

export default {
    async save(user) {
        return await UserModel.create(user);
    },

    async findByEmail(email) {
        return await UserModel.findByEmail(email);
    }
};
