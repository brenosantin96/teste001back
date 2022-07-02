import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface TelefoneInstance extends Model {
    numTelefone: string;
}

export const Telefone = db.define<TelefoneInstance>('Telefone', {

    numTelefone: {
        primaryKey: true,
        type: DataTypes.STRING,
        unique: true
    }
}, {
    tableName: 'telefones',
    timestamps: false
});