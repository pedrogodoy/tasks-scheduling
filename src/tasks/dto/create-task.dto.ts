import { IsDateString, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @Length(2, 60)
  @ApiProperty()
  description: string;
  
  @IsDateString()
  @ApiProperty()
  dueDate: Date;
}
