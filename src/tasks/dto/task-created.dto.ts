import { IsDateString, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/user.entity";

export class TaskCreated {
  @ApiProperty()
  id: string

  @IsString()
  @ApiProperty()
  description: string;
  
  @IsDateString()
  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  user: { id: string }

  @ApiProperty()
  sendNotification: boolean;
}
