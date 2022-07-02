## BACKEND - PESSOAS E TELEFONES
## 🧐 Sobre <a name = "about"></a>

Backend de sistema onde você consegue listar, cadastrar, editar, e deletar:
<br>
-Pessoas
<br>
-Telefones



### Pré-requisitos

Como pré-requisito, é necessário instalar o NPM previamente na sua máquina, basta abrir o CMD e digitar;

```
npm install -g npm
```

Além disso é necessário ter o servidor MYSQL na maquina, o instalador oficial do MYSQL pode ser encontrado no link: 
<https://dev.mysql.com/downloads/installer/>

Depois de instalar o MYSQL, não se esqueça de anotar qual porta o MYSQL foi instalado, usuario (padrão: root), e a senha.


### Instalando

Depois de feito os pré-requisitos, clonar o projeto ou fazer o download.

Depois de clonar o projeto, não se esquecer! Abrir a pasta do projeto com o VSCODE e ir no arquivo .env e configurar as seguintes keys:

<ul>

<li>PORT=4000 (PORTA QUE O BACKEND VAI USAR) </li>
<li>MYSQL_DB=nomedobanco</li>
<li>MYSQL_USER=root</li>
<li>MYSQL_PASSWORD=1234</li>
<li>MYSQL_PORT=3306</li>
<li>JWT_SECRET_KEY=4321</li>
</ul>

Depois de configurado o .env, abrir o terminal na pasta do projeto e digitar o seguinte:

```
npm install
```

e logo em seguida:

```
npm run start-dev
```

A partir desse momento o servidor vai estar rodando em http://localhost:4000/

Para testar se está funcionando, acesse a rota http://localhost:4000/ping 

se retornar uma msg com pong: true é porque está devidamente configurado.