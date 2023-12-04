import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PW'),
        synchronize: config.getOrThrow('DB_SYNC') === 'true' ? true : false,
        logging: config.getOrThrow('DB_LOG') === 'true' ? true : false,
        autoLoadEntities:
          config.getOrThrow('DB_AUTO_LOAD_ENTITIES') === 'true' ? true : false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
