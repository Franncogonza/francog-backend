import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Post no encontrado' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
