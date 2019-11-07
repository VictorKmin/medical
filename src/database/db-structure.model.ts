import { ModelAttributeColumnOptions, WhereValue } from 'sequelize';

export type KeysOf<T> = { [P in keyof T]: string };
export type DBModelFieldInit<T> = { [P in keyof T]: ModelAttributeColumnOptions; };
export type DBModelFindObject<T> = { [P in keyof T]?: WhereValue; };
export interface IDBResponse<T> {
    dataValues: T;
    [index: string]: any;
}
export type PropType<T, K extends keyof T> = T[K];
export interface IDictionary<T> { [index: string]: T; }
