import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrationsRun: true,
  name: 'swapi',
  migrations: ['dist/migrations/runs/*.js'],
  entities: ['dist/**/*.entity.js'],
  logging: ['error', 'warn', 'info'],
  synchronize: false,
});