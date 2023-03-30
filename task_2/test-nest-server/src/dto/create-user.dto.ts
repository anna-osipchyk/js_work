import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsInt()
  @Min(16)
  @Max(100)
  readonly age: number;
}
