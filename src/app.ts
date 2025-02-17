import express, { Express } from 'express';
import { UserController } from './users/users.controller.js';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface.js';
import { ExeptionFilter } from './errors/exeption.filters.js';

export class App {
    port: number;
    app: Express;
    server: Server;
    logger: ILogger;
    userController: UserController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: ILogger,
        userController: UserController,
        exeptionFilter: ExeptionFilter
    ) {
        this.port = 8000;
        this.app = express();
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRouter() {
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRouter();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
