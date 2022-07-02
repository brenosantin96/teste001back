import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface PessoaInstance extends Model {
    id: number;
    name: string;
    birthDate: Date;
}

export const Pessoa = db.define<PessoaInstance>('Pessoa', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    birthDate: {
        type: DataTypes.DATEONLY
    }
}, {
    tableName: 'pessoas',
    timestamps: false
});