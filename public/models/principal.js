const Conexao = require('./conexao');
const ClienteDao = require('./cliente-dao');
 
const cliente = [232, "asdlfhaief jsef asheif"];

let dao = new ClienteDao();
//dao.add(cliente);
//dao.delete(4)
//dao.update("Teste Cliente 22222", 5)

console.log('antes')

dao.lista().then(result => {
    let a = []
    a.push(JSON.parse(JSON.stringify(result[0])))
    console.log(a)
    dao.end()
})

console.log('depois')

//tchandb
//asogoto
//coq4EKqZ*%EzU4dBYlWM