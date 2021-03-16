import mongoose from 'mongoose';

export default function dbConection(){
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    
    return new Promise((resolve, reject)=>{
        mongoose.connect(process.env.DBLC as string, mongooseOptions, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('Conectado a la base de datos');
            }
        })
    });
}