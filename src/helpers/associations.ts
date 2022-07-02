import { Pessoa } from "../models/Pessoa";
import { Telefone } from "../models/Telefone";

export const createAssociations = () => {
    Pessoa.hasMany(Telefone);
    Telefone.belongsTo(Pessoa);
    console.log("teste 123")
}