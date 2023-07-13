import { IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  @ApiProperty()
  firstName: string;
  
  @ApiProperty()
  lastName: string;
  
  @IsString()
  @Length(2, 20)
  @ApiProperty()
  username: string;

  
  @IsString()
  @Length(2, 20)
  @ApiProperty()
  password: string;
}
