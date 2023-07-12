import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  firstName: string;
  

  lastName: string;
  
  @IsString()
  @Length(2, 20)
  username: string;

  
  login: string;
  
  @IsString()
  @Length(2, 20)
  password: string;
}
