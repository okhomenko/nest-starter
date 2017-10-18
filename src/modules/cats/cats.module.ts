import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AsyncLoggerMiddleware } from '../common/middlewares/async-logger.middleware';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    controllers: [
        CatsController,
    ],
    components: [
        CatsService,
    ],
    exports: [
        CatsService,
    ]
})
export class CatsModule implements NestModule {

    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply([LoggerMiddleware, AsyncLoggerMiddleware])
            .with('CatsModule')
            .forRoutes(
            { path: '/cats', method: RequestMethod.GET },
            { path: '/cats', method: RequestMethod.POST },
        );
    }

}