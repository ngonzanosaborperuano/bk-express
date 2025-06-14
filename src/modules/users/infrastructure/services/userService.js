import moment from 'moment-timezone';
import PasswordHasher from '../../../../shared/utils/PasswordHasher.js';
import UserRepository from '../../infrastructure/repositories/UserRepository.js';

const UserService = {
    async createUser(userData) {
        const fechaPeru = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');

        const hashedPassword = await PasswordHasher.hash(userData.contrasena);

        const userToSave = {
            nombreCompleto: userData.nombreCompleto,
            email: userData.email,
            foto: userData.foto,
            contrasena: hashedPassword,
            fechaCreacion: fechaPeru
        };

        const userId = await UserRepository.save(userToSave);
        return { id: userId };
    },

    async loginUser({ email, contrasena }) {

        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error('Usuario no encontrado');

        const isValid = await PasswordHasher.compare(contrasena, user.contrasena);
        if (!isValid) throw new Error('Contraseña incorrecta');

        return user;
    }
};

export default UserService;
