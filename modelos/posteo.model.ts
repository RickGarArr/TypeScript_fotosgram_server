import { Schema, Document, model } from 'mongoose';
import IPosteo from '../interfaces/IPosteo';

const posteoSchema = new Schema<IPosteo>({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imagenes: [{
        type: String
    }],
    coordenadas: {
        type: String,
        default: ""
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: [ true, 'Debe existir referencia a un usuario' ]
    }
}, {collection: 'posteos'});

posteoSchema.pre('save', function(next){
    this.created = new Date();
    next();
});

posteoSchema.methods.toJSON = function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};

export const Posteo = model<IPosteo>('Posteo', posteoSchema);