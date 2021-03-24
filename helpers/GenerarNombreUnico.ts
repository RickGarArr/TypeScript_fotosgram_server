import uniqid from 'uniqid';

export default function generarNombreUnico(filename: string) {
    const nombreSplit = filename.split('.');
    const ext = nombreSplit[nombreSplit.length - 1].toLocaleLowerCase();
    const nombreUnico = uniqid();

    return `${nombreUnico}.${ext}`;
}