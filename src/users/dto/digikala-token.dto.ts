import { IsNotEmpty, IsString } from 'class-validator';

export class DigikalaTokenDto {
  @IsString()
  @IsNotEmpty()
  digikalaToken: string;
}
