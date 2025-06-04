import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/user.js';
import keys from './keys.js'; // Asegúrate de exportar `secretOrKey` correctamente en keys.js

export default function configurePassport(passport) {
    console.log("Iniciando la configuración de passport");

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = keys.secretOrKey; // Asegúrate de que `keys.secretOrKey` esté correctamente configurado

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            // console.log("Procesando JWT", jwt_payload);
            try {
                // Usamos async/await para la consulta en lugar de callback
                const user = await User.findById(jwt_payload.id);

                if (user) {
                    return done(null, user); // Usuario encontrado
                } else {
                    return done(null, false); // Usuario no encontrado
                }
            } catch (err) {
                return done(err, false); // Si hay error, lo devolvemos
            }
        })
    );
}
