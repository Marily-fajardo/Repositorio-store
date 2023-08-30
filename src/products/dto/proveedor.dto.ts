import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";


export class createProveedordto{
    @IsNotEmpty()
    @IsNumber()
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    proveedor: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;  

    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    create_ad: Date;
}