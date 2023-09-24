import {
  IsArray,
  IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    isDateString,
    isString,
  } from 'class-validator';
  
  export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    id?: number;
    //los decoradores en el dto validan que la informacion agregada sea correcta
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    description: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  
    @IsNumber()
    @IsOptional()
    stock: number;

    @IsString()
    @IsOptional()
    filename:string;

    @IsDateString()
    @IsOptional()
    created_at:string

    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsArray({ each: true })
    @IsString()
    @IsOptional()
    images?: string[];
    


  }