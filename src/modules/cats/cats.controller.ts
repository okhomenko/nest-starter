import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

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

    @Get()
    async findAll(): Promise<any[]> {
        return this.catsService.findAll();
    }

}