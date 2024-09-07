import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.schema';
import { Model } from 'mongoose';
import { BookPayload } from './payload/book.payload';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}
  async createBook(payload: BookPayload): Promise<BookPayload> {
    const book = new this.bookModel(payload);
    return await book.save();
  }
  async getAllBook(): Promise<BookPayload[]> {
    const books = await this.bookModel.find();
    return books;
  }
  async getById(@Param('id') id: string): Promise<BookPayload> {
    const book = await this.bookModel.findOne({ _id: id }).exec();
    if (!book) {
      throw new NotFoundException(`Book with id: ${id} not found`);
    }
    return book;
  }
  async updateBook(id: string, payload: BookPayload): Promise<BookPayload> {
    await this.bookModel.updateOne({ _id: id }, payload);
    const updatedbook = this.bookModel.findById(id);
    return updatedbook;
  }
  async deleteBook(id: string): Promise<void> {
    await this.bookModel.deleteOne({ _id: id });
  }
}
