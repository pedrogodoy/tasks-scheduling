import { IsDateString, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty()
  userId: string;
  
  @ApiProperty()
  username: string;
}
