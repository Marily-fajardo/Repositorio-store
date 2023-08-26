import { IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateModelosDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  marca_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;


  @IsNumber()
  @IsNotEmpty()
  user_id: number;

}