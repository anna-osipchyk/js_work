import { DataType, Table, Model, Column } from 'sequelize-typescript';

interface UserCreationAttrs {
  fullName: string;
  type: string;
  age: number;
}

@Table({ tableName: 'user' })
export class User extends Model<UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  fullName: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;
}
