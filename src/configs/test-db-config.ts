import { AppDataSource } from "./data-source";

export const initTestDB = async () => {
  try {
    const db = await AppDataSource.initialize();

    await clearDB();

    return db;
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    throw new Error("Unable to connect to DB");
  }
};

export const clearDB = async () => {
  const entities = AppDataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = await AppDataSource.getRepository(entity.name);
    await repository.query(
      `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
    );
  }
};

export const dropDB = async () => {
  await AppDataSource.destroy();
};
