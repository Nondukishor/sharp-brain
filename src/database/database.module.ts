import { TypeOrmModule } from '@nestjs/typeorm';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'sharp-brain',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
});
