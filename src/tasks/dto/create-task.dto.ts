import { IsDate, IsDateString, IsString, Length } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @Length(2, 60)
  description: string;
  
  @IsDateString()
  dueDate: Date;
}
