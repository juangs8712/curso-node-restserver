
import { Schema, model } from 'mongoose';

// -----------------------------------------------------
export const RoleSchema = Schema({
    rol: { 
        type: String, 
        required: [ true, 'El rol es obligatorio' ] 
    }
});
// -----------------------------------------------------

export default model( 'Role', RoleSchema );
