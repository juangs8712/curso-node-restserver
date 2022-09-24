
import Role from '../models/role.js';
import Usuario from "../models/usuario.js";

// -----------------------------------------------------
export const esRoleValido = async( rol = '' ) => {
    const existeRole = await Role.findOne({ rol });

    if ( !existeRole ){
        throw new Error( `El rol ${ rol } no está registrado en la BD.` )
    }
}
// -----------------------------------------------------
// export default esRoleValido;
// -----------------------------------------------------
export const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ){
        throw new Error( `El correo ${ correo } ya está registrado.` )
    }
}
// -----------------------------------------------------
export const existeUsuarioById = async( id ) => {
    const existeUsuario = await Usuario.findById( id )
    if ( !existeUsuario ){
        throw new Error( `El ID: ${ id } no existe.` )
    }
}
// -----------------------------------------------------
