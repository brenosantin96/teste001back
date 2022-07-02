import { Router } from 'express';

import * as UserController from '../controllers/userController';
import * as PessoaController from '../controllers/PessoaController';
import * as TelefoneController from '../controllers/TelefoneController';
import {Auth} from '../middlewares/Auth';

const router = Router();

//test
router.get('/ping', UserController.ping);

//users
router.get('/users', Auth.private, UserController.getAllUsers);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

//pessoas
router.get('/pessoas', PessoaController.listPessoas);
router.get('/pessoas/:id', PessoaController.getOnePessoa);
router.post('/pessoas', PessoaController.createPessoa);
router.put('/pessoas/:id', PessoaController.updatePessoa);
router.delete('/pessoas/:id', PessoaController.deletePessoa);
router.get('/pessoastelefones', PessoaController.getAllTelephones);

//telefone
router.get('/telefones', TelefoneController.listAllTelefones);
router.post('/telefones', TelefoneController.createTelefone);
router.put('/telefones/:tel', TelefoneController.updateTelefone);
router.delete('/telefones/:tel', TelefoneController.deleteTelefone);

export default router;