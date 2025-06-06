import bcrypt from 'bcrypt';

const saltRounds = 10;

export default {
    async hash(password) {
        return await bcrypt.hash(password, saltRounds);
    },

    async compare(rawPassword, hashedPassword) {
        return await bcrypt.compare(rawPassword, hashedPassword);
    }
};
