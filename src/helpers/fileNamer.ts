import {v4 as id} from 'uuid';

export const fileNamer =(
    req: Express.Request,
    file: Express.Multer.File,
    callback,
) => {
    //si el archivo no existe o no viene entonces:
    if (!file)return callback(new Error('Archivo vacio'),false);

    const fileExtension = file.mimetype.split('/')[1];

    // creo una interpolacion, uniendo el uuid con la extencion del archivo
    const fileNamer = `${id()}.${fileExtension}`;

    //Retorna el nombre del archivo
    callback(null , fileNamer);


};