import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
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
        consumer.apply([LoggerMiddleware])
            .with('CatsModule')
            .forRoutes(CatsController);
    }

}