import { ApiProperty } from '@nestjs/swagger';
export class FindUserDto {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  firstName: string;
  
  @ApiProperty()
  lastName: string;
  
  @ApiProperty()
  username: string;
  
  @ApiProperty()
  isActive: boolean;
}
