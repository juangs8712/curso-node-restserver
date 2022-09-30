
import { Categoria, Producto, Role, Usuario } from "../models/index.js";

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
        throw new Error( `El ID: ${ id } no existe en usuarios.` )
    }
}
// -----------------------------------------------------
export const existeCategoriaById = async( id ) => {
    const categoria = await Categoria.findById( id )

    if ( !categoria ){
        throw new Error( `El ID: ${ id } no existe en categorias.` )
    }
}
// -----------------------------------------------------
export const existeProductoById = async( id ) => {
    const producto = await Producto.findById( id )

    if ( !producto ){
        throw new Error( `El ID: ${ id } no existe en productos.` )
    }
}
// -----------------------------------------------------
