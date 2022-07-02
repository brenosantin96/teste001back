import { Request, Response } from 'express';
import { Pessoa } from '../models/Pessoa';
import dotenv from 'dotenv';
import { ParamsDictionary } from "express-serve-static-core";
import { PessoaType } from '../types/PessoaType'
import { Telefone } from '../models/Telefone';
import { db } from '../instances/mysql'


dotenv.config();


export const listPessoas = async (req: Request, res: Response) => {
    const pessoas = await Pessoa.findAll();
    if (pessoas){
        res.json({ pessoas: pessoas });
        return;
    } else {
        res.json({err: "Nao foi possivel trazer pessoas"})
    }

}

export const getOnePessoa = async (req: Request, res: Response) => {
    let { id } = req.params;

    const pessoa = await Pessoa.findByPk(id);
    if (pessoa) {
        res.json({ pessoa: pessoa });
        return
    } else {
        res.json({ msg: `Não foi possível encontrar pessoa com o id ${id}` })
    }

}

export const createPessoa = async (req: Request<ParamsDictionary, any, PessoaType>, res: Response) => {
    let { name, birthDate } = req.body;

    console.log(req.body.name); //UNDEFINED
    console.log(req.body.birthDate); //UNDEFINED
    console.log(req.body) // {}

    if (name === "" || name === null || name === undefined || birthDate === undefined || birthDate === null) {
        res.json({ msg: "Nome e data de nascimento precisam ser preenchidos." });
        return;
    }

    const pessoa = new Pessoa();

    if (name) {
        pessoa.name = name;
    }
    if (birthDate) {
        pessoa.birthDate = birthDate;
    }

    const info = await pessoa.save();
    res.json({ msg: "Pessoa cadastrada com sucesso", info });
    return;

}

export const updatePessoa = async (req: Request<ParamsDictionary, any, PessoaType>, res: Response) => {
    let id = req.params.id;
    let { name, birthDate } = req.body;

    const pessoa = await Pessoa.findByPk(id);

    if (pessoa) {

        let updatesPessoa: PessoaType = {
            name: pessoa.name,
            birthDate: pessoa.birthDate
        };

        if (name) {
            updatesPessoa.name = name;
        }

        if (birthDate) {
            updatesPessoa.birthDate = birthDate;
        }


        //Atualizando com as infos que foram informadas apenas
        pessoa.update({
            name: updatesPessoa.name, birthDate: updatesPessoa.birthDate
        }).then(() => { res.json({ msg: "Pessoa atualizada com sucesso", pessoa }); return })
    }

    else {
        res.json({ msg: `Não foi possível atualizar pessoa com o ID ${id} pois ele nao existe` });
        return;
    }
}

export const deletePessoa = async (req: Request, res: Response) => {
    let id = req.params.id;

    const pessoa = await Pessoa.findByPk(id);

    if (pessoa) {
        pessoa.destroy();
        const actualPessoas = await Pessoa.findAll();
        if (actualPessoas) {
            res.json({ msg: `A pessoa com ID ${pessoa.id} e nome ${pessoa.name} foi removida.`, actualPessoas })
        }
    } else {
        res.status(404);
        res.json({ msg: `Não existe pessoa com o ${id} para ser removido.` })
    }
}

export const getAllTelephones = async (req: Request, res: Response) => {

    let pessoas = await Pessoa.findAll({include: [Telefone]})
    if (pessoas){
        res.status(200).send({pessoas});
    } else {
        res.send({msg: "Algum erro aconteceu"})
    }
}

//SQL PURO
/* export const getAllTelephones = async (req: Request, res: Response) => {

    const [results, metadata] = await db.query(
        "SELECT pessoas.id, pessoas.name, pessoas.birthDate, telefones.numTelefone as NumTelefone FROM pessoas INNER JOIN telefones ON telefones.PessoaId = pessoas.id"
    );

    res.send({results});

} */

