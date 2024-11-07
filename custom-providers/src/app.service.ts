import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService, LoggerService } from './app.module';

@Injectable()
export class AppService {
  constructor(
    @Inject('APP_NAME') private appName: string,
    @Inject('DatabaseService') private databaseService: DatabaseService,
    @Inject('ConfigService') private configValue: string,
    @Inject('LOGGING_SERVICE') private logger: LoggerService,
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
    };
  }
}
