import {v4 as id} from 'uuid';

export const pdfFilter =(
    req: Express.Request,
    file: Express.Multer.File,
    callback,
) => {
    //si el archivo no existe o no viene entonces:
    if (!file)return callback(new Error('Archivo vacio'),false);

    const pdfExtension = file.mimetype.split('/')[1];
      
      const validExtension = ['pdf'];
    
      
      if(validExtension.includes(pdfExtension)){
          return callback(null, true);
  
      }
      
      callback(null, false);
  
  };

  