import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksRespository } from './tasks.repository';
import { TasksService } from './tasks.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRespository]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
