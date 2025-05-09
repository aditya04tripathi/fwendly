import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  monashEmail: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  yearOfStudy: number;
}