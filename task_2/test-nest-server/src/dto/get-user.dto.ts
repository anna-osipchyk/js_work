import { Type } from 'class-transformer';
import { IsInt, IsString, Min, Max, IsOptional } from 'class-validator';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

function MaxGreaterThenMin(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'MaxGreaterThenMin',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(`value: ${value}`);
          console.log(`args: ${args}`);
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          console.log(`relatedValue: ${relatedValue}`);
          return !relatedValue || value > relatedValue;
        },
      },
    });
  };
}

export class UserGetDto {
  @IsOptional()
  @IsString()
  readonly fullNameSearch: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(16)
  @Max(100)
  readonly minAge: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(16)
  @Max(100)
  @MaxGreaterThenMin('minAge', {
    message: 'Max age should be greater then Min age',
  })
  readonly maxAge: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(20)
  readonly limit: number;
}
