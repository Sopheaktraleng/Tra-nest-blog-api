import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookPayload } from './payload/book.payload';
import { ApiTags } from '@nestjs/swagger';

@Controller('Book')
@ApiTags('Books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  createBook(@Body() payload: BookPayload) {
    return this.bookService.createBook(payload);
  }
  @Get()
  listAll() {
    return this.bookService.getAllBook();
  }
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.bookService.getById(id);
  }
  @Put('/:id')
  updateBook(@Param('id') id: string, payload: BookPayload) {
    return this.bookService.updateBook(id, payload);
  }
  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
