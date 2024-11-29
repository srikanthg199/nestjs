import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  // @Expose()
  // id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  age: number;

  @Expose()
  isActive: boolean;

  @Exclude() // Exclude sensitive data
  password: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

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

  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNumber()
  age?: number;
}
