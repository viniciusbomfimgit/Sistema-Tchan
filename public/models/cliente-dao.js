const util = require('./util');
const Conexao = require('./conexao');
const configStuff = require('./config');
const clientForm = configStuff.clientForm;
const serviceForm = configStuff.serviceForm;
const employeeForm = configStuff.employeeForm;
const bookForm = configStuff.bookForm;
const arrayForm = configStuff.arrayForm;
const NOME = 1;

class ClienteDao {

    constructor() {
        this._conexao = Conexao.getConexao();
    }

    add(tabl, stuff) {
        console.log('adicionando ' + tabl + " " + stuff)
        
        let sql = 'INSERT INTO ' + tabl +' (';
        let end = ") VALUES ("

        let thetabl

        switch(tabl){
            case 'clientes': thetabl = clientForm; break;
            case 'servicos': thetabl = serviceForm; break;
            case 'colaboradores': thetabl = ['id_colab', 'nome_colab', 'cpf_colab', 'telefone_colab', 'rua_colab', 'numero_casa_colab', 'complemento_colab', 'cep_colab', 'cidade_colab', 'estado_colab', 'pin_colab', 'isOwner']; break;
            case 'agendamentos': thetabl = bookForm; break;
            case 'tabela_array': thetabl = arrayForm; break;
        }

        thetabl.forEach((key, i) =>{
            if(i == thetabl.length-1){
                end = end + "?)"
                sql = sql + key + end
            }else if(i){
                sql =sql = sql + key + ','
                end = end + '?,'
            }
        })
        
        this._conexao.query(sql, stuff, util.queryCallback());
    }

    query(q){
        console.log('awerwe ---------------------------------')
        console.log('q ' + q)
        return new Promise((resolve, reject) => {
            this._conexao.query(q, (err, results, fields) => {console.log('errors: ' + err); resolve(results);})
        })
    }

    update(tabl, data) {
        let thetabl, id_

        console.log( 'tabl ' + tabl)
        console.log( 'data ' + data)
        switch(tabl){
            case 'clientes': thetabl = clientForm; id_ = 'id_cliente'; break;
            case 'servicos': thetabl = serviceForm; id_ = 'id_servico'; break;
            case 'colaboradores': thetabl = employeeForm; id_ = 'id_colab'; break;
            case 'agendamentos': thetabl = ['id_agendamento', 'id_colab', 'data_agendamento', 'hora_inicio', 'hora_termino', 'preco_total', 'observacao']; id_ = 'id_agendamento'; break;
            case 'tabela_array': thetabl = arrayForm; id_ = 'id_array'; break;
        }

        console.log('data ' + data)
        thetabl.forEach((key, i) => {
            let atualizar = 'UPDATE ' + tabl + ' SET '
            if(id_ = 'id_array'){
                if(i){
                    atualizar = atualizar.concat(key, " = ? WHERE " + id_ + " = ?")
                    console.log(atualizar + ' ' + data[i] + data[0])
                    if(data[0] == null)data[0] = NULL
                    this._conexao.query(atualizar, [data[i], data[0]], util.queryCallback());
                    
                }
            }
            else if(!!data[i] && i){
                atualizar = atualizar.concat(key, " = ? WHERE " + id_ + " = ?")
                console.log(atualizar + ' ' + data[i])
                this._conexao.query(atualizar, [data[i], data[0]], util.queryCallback());
                
            }
        })
    }

    delete(tabl, id) {
        const excluir = 'DELETE FROM '+ tabl + ' WHERE id_agendamento = ?';
        this._conexao.query(excluir, id, util.queryCallback());
    }

    get(tabl, wher){
        let sql = 'SELECT * FROM ' + tabl;
        if(!!wher)sql += " " + wher

        console.log(sql)

        return new Promise((resolve, reject) => {
            this._conexao.query(sql, (err, results, fields) => {console.log('errors: ' + err); resolve(results);})
        })
    }

    end(){
        this._conexao.end(util.endCallback());
    }
}

module.exports = ClienteDao;