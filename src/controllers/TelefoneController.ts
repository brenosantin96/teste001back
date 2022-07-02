import { Request, Response } from 'express'
import { Telefone } from "../models/Telefone";
import { TelefoneType } from '../types/TelefoneType'
import { ParamsDictionary } from "express-serve-static-core";
import dotenv from 'dotenv';


dotenv.config();

export const listAllTelefones = async (req: Request, res: Response) => {
    const telefones = await Telefone.findAll();
    if (telefones) {
        res.send({ telefones: telefones });
        return;
    } else {
        res.send({ error: "Não foi possível encontrar telefones" })
    }
}

export const createTelefone = async (req: Request<ParamsDictionary, any, TelefoneType>, res: Response) => {
    let { numTelefone } = req.body;


    if (numTelefone === "" || numTelefone === null || numTelefone === undefined) {
        res.json({ msg: "Telefone precisa ser preenchido." });
        return;
    }

    const telefoneInstance = new Telefone();

    if (numTelefone) {
        telefoneInstance.numTelefone = numTelefone
    }

    const info = await telefoneInstance.save();
    res.json({ msg: "Telefone cadastrado com sucesso", info });
    return;

}

export const updateTelefone = async (req: Request<ParamsDictionary, any, TelefoneType>, res: Response) => {
    let { tel } = req.params;
    let { numTelefone } = req.body;

    let telefone = await Telefone.findByPk(tel);

    


    if(telefone){

        let updates : TelefoneType = {numTelefone: telefone.numTelefone};

        if(numTelefone){
            updates.numTelefone = numTelefone;
        }

        //Atualizando com as infos que foram informadas apenas
        telefone.update({
            numTelefone: updates.numTelefone
        }).then(() => { res.json({ msg: "Telefone atualizado com sucesso", telefone }); return })

        
    } else {
        res.json({msg: "Não foi possível atualizar o telefone!"})
    }


}


export const deleteTelefone = async (req: Request, res: Response) => {
    let tel = req.params.tel;
    console.log(tel)

    const telefone = await Telefone.findByPk(tel);

    if (telefone) {
        telefone.destroy();
        res.json({msg: "Telefone deletado com sucesso"})
    } else {
        res.status(404);
        res.json({ msg: `Não existe telefone com o ${tel} para ser removido.` })
    }
}