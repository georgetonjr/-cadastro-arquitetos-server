import { dataSource } from './database';

export const setupProviders = async () => {
  try {
    await dataSource.initialize();
    console.log('Database connected!');
  } catch (error) {
    console.log('Error on setup providers, ', error);
  }
};
