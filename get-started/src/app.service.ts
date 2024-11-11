import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';

@Injectable()
export class AppService {
  // dynamic crons
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  handleCrone() {
    this.logger.log('Every 10 seconds');
  }

  @Timeout(50000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }

  @Interval(1000 * 60 * 60)
  handleInterval() {
    this.logger.debug('Called every 1Hr');
  }

  // dynamic crons
  @Cron(CronExpression.EVERY_SECOND, {
    name: 'notifications',
  })
  triggerNotifications() {
    const job = this.schedulerRegistry.getCronJob('notifications');
    job.stop();
    console.log(job.lastDate());
  }
}
