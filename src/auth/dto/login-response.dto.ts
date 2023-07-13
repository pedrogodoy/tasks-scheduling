import { IsDateString, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/user.entity";

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
  
}
