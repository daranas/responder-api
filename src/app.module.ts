import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { ProjectsModule } from './projects/projects.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'root',
          database: 'responder',
        },
      },
    }),
    ProjectsModule,
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
