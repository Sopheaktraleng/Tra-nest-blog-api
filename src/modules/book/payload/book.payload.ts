import { IsNotEmpty, IsString } from 'class-validator';

export class BookPayload {
  @IsString()
  tittle: string;
  @IsString()
  author: string;
  @IsNotEmpty()
  publishDate: string;
  @IsNotEmpty()
  pages: number;
}
