/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";

/* eslint-disable prettier/prettier */
export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'kiki',
          database: 'product-service',
          entities: [
              __dirname + '/../**/*.entity{.ts,.js}',
          ],
          synchronize: true,
        });
  
        return dataSource.initialize();
      },
    },
  ];