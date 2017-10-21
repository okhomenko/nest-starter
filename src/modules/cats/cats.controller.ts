import { Body, Controller, Get, HttpStatus, Post, Put, Res, UseFilters } from '@nestjs/common';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '../common/exceptions/http.exception-filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

const cats = [];

@Controller('cats')
export class CatsController {

    constructor(
        private readonly catsService: CatsService,
    ) {}

    @Post()
    async create(@Res() res, @Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
        res.status(HttpStatus.CREATED);
        res.send(createCatDto);
    }

    @Put()
    @UseFilters(new HttpExceptionFilter())
    async update(@Res() res, @Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }

    @Get()
    async findAll(): Promise<any[]> {
        return this.catsService.findAll();
    }

}