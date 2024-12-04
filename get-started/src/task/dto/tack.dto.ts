import { Expose } from 'class-transformer';

export class TaskDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  createdAt: Date;
}