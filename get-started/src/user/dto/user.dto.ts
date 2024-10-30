import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsEmail()
  @IsNotEmpty()
  email?: string;
  @IsNotEmpty()
  @IsNumber()
  age?: number;
}
