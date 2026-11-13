import { UserModel, PlantModel } from '@itp-home-garden/api-interfaces';
import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';
import { GardenModel } from '@itp-home-garden/gardens-types';

export interface Database {
  user: UserTable;
  garden: GardenTable;
  plant: PlantTable;
}

export interface UserTable extends Omit<UserModel, 'userId' | 'createdAt' | 'updatedAt'> {
  userId: Generated<UserModel['userId']>;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  emailAddress: string;
  createdAt: ColumnType<Date, UserModel['createdAt'], never>;
  updatedAt: ColumnType<Date, UserModel['updatedAt'], never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface GardenTable extends Omit<GardenModel, 'gardenId' | 'createdAt' | 'updatedAt'> {
  gardenId: Generated<GardenModel['gardenId']>;
  createdAt: ColumnType<Date, GardenModel['createdAt'], never>;
  updatedAt: ColumnType<Date, GardenModel['updatedAt'], never>;
}

export type Garden = Selectable<GardenTable>;
export type NewGarden = Insertable<GardenTable>;
export type GardenUpdate = Updateable<GardenTable>;

export interface PlantTable
  extends Omit<PlantModel, 'plantId' | 'plantationDate' | 'createdAt' | 'updatedAt'> {
  plantId: Generated<PlantModel['plantId']>;
  plantationDate: ColumnType<Date, PlantModel['plantationDate'], never>;
  createdAt: ColumnType<Date, PlantModel['createdAt'], never>;
  updatedAt: ColumnType<Date, PlantModel['updatedAt'], never>;
}

export type Plant = Selectable<PlantTable>;
export type NewPlant = Insertable<PlantTable>;
export type PlantUpdate = Updateable<PlantTable>;
