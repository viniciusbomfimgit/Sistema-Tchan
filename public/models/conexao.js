const connection = require('mysql');
const configStuff = require('./config');
const config = configStuff.config;
class Conexao {

    static getConexao() {
        const conexao = connection.createConnection(config);
        console.log('Conexão estabelecida!');
        return conexao;
    }
}

module.exports = Conexao;
