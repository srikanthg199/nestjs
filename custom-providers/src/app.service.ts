import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService, LoggerService } from './app.module';

@Injectable()
export class AppService {
  constructor(
    @Inject('APP_NAME') private readonly appName: string,
    @Inject('DatabaseService')
    private readonly databaseService: DatabaseService,
    @Inject('ConfigService') private readonly configValue: string,
    @Inject('LOGGING_SERVICE') private readonly logger: LoggerService,
    @Inject('ASYNC_CONFIG') private readonly config: string,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  testProviders(): object {
    console.log(`App Name: ${this.appName}`);
    console.log(this.databaseService.connect());
    console.log(this.configValue);
    this.logger.log('Hello from AppService');
    return {
      valueProvider: this.appName,
      classProvider: this.databaseService.connect(),
      factoryProvider: this.configValue,
      aliasProvider: this.logger,
      asyncProvider: this.config,
    };
  }
}
