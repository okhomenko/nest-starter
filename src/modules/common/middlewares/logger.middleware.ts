import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {

    resolve(name: string, ...args: any[]): ExpressMiddleware {

        return (req, res, next) => {
            console.log(`[${name}] Request...`);
            next();
        };

    }

}