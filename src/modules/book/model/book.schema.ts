import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;
@Schema({
  collection: 'books',
  timestamps: true,
})
export class Book {
  @Prop()
  tittle: string;
  @Prop()
  author: string;
  @Prop()
  publishDate: string;
  @Prop()
  pages: number;
}
export const BookSchema = SchemaFactory.createForClass(Book);
