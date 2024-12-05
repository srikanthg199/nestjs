import { Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Value Provider
const APP_NAME = 'My custom provider(Value)';

// CLASS PROVIDER
@Injectable()
export class DatabaseService {
  connect() {
    return 'Connected to database';
  }
}

// Factory provider
@Injectable()
export class ConfigService {
  get(key: string): string {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return process.env[key] || 'default value';
  }
}

// Alice Provider
@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

// Async Provider
@Injectable()
export class AsyncConfigService {
  async getAsyncConfig(key: string): Promise<string> {
    // Simulate an asynchronous operation (like an HTTP request or DB query)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (key === 'config_key') {
          resolve('Fetched Async Config Value');
        } else {
          reject(new Error('Configuration not found'));
        }
      }, 1000); // Simulate async operation
    });
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_NAME',
      useValue: APP_NAME,
    },
    {
      provide: 'DatabaseService',
      useClass: DatabaseService,
    },
    {
      provide: 'ConfigService',
      useFactory: (configService: ConfigService) => {
        return configService.get('CONFIG_KEY');
      },
      inject: [ConfigService],
    },
    {
      provide: 'ASYNC_CONFIG',
      useFactory: async (asyncConfigService: AsyncConfigService) => {
        return await asyncConfigService.getAsyncConfig('config_key');
      },
      inject: [AsyncConfigService],
    },
    {
      provide: 'LOGGING_SERVICE',
      useExisting: LoggerService, // Alias for LoggerService
    },
    LoggerService,
    ConfigService,
    AsyncConfigService,
    AppService,
  ],
})
export class AppModule {}
