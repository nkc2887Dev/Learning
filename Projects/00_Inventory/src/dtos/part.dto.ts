import {
    IsString,
    IsNumber,
    IsEnum,
    IsArray,
    ValidateNested,
    IsOptional,
    Min,
    ArrayMinSize,
    IsMongoId,
  } from "class-validator"
  import { Type } from "class-transformer"
  
  // Base DTO for all parts
  export class CreatePartDto {
    @IsString()
    name: string
  
    @IsString()
    description: string
  
    @IsNumber()
    @Min(0)
    price: number
  
    @IsNumber()
    @Min(0)
    stockQuantity: number
  }
  
  // DTO for raw parts
  export class CreateRawPartDto extends CreatePartDto {
    @IsEnum(["raw"])
    type: "raw"
  
    @IsString()
    supplier: string
  
    @IsString()
    partNumber: string
  }
  
  // DTO for component in assembled parts
  export class ComponentDto {
    @IsMongoId()
    part: string
  
    @IsNumber()
    @Min(1)
    quantity: number
  }
  
  // DTO for assembled parts
  export class CreateAssembledPartDto extends CreatePartDto {
    @IsEnum(["assembled"])
    type: "assembled"
  
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => ComponentDto)
    components: ComponentDto[]
  
    @IsNumber()
    @Min(0)
    assemblyTime: number
  
    @IsString()
    assemblyInstructions: string
  }
  
  // DTO for updating parts
  export class UpdatePartDto {
    @IsOptional()
    @IsString()
    name?: string
  
    @IsOptional()
    @IsString()
    description?: string
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    stockQuantity?: number
  }
  
  // DTO for updating raw parts
  export class UpdateRawPartDto extends UpdatePartDto {
    @IsOptional()
    @IsString()
    supplier?: string
  
    @IsOptional()
    @IsString()
    partNumber?: string
  }
  
  // DTO for updating assembled parts
  export class UpdateAssembledPartDto extends UpdatePartDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ComponentDto)
    components?: ComponentDto[]
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    assemblyTime?: number
  
    @IsOptional()
    @IsString()
    assemblyInstructions?: string
  }
  