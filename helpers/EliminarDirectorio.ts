import fs from 'fs';

export default function borrarCarpeta(path: string) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file) {
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    borrarCarpeta(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
            resolve('Carpeta eliminada correctamente');
        } else {
            reject('No se pudo eliminar la carpeta, hable con el administrador');
        }
    })
}