const io = require('socket.io')(2000)
var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '../public/html'));
app.use('/', express.static(__dirname + '../public/html/agendamento'));
app.use('/', express.static(__dirname + '../public/html/busca-agendamento'));
app.use('/', express.static(__dirname + '../public/html/busca-cliente'));
app.use('/', express.static(__dirname + '../public/html/cadastro-cliente'));
app.use('/', express.static(__dirname + '../public/html/cliente'));
app.use('/', express.static(__dirname + '../public/html/index'));
app.use('/', express.static(__dirname + '../public/html/lista-agendamentos'));
app.use('/', express.static(__dirname + '../public/html/lista-clientes'));
app.use('/', express.static(__dirname + '../public/html/opcoes-do-sistema'));
app.use('/', express.static(__dirname + '../public/html/lista-servicos'));
app.use('/', express.static(__dirname + '../public/html/cadastro-servico'));
app.use('/', express.static(__dirname + '../public/html/servico'));
app.use('/', express.static(__dirname + '../public/html/lista-colaboradores'));
app.use('/', express.static(__dirname + '../public/html/colaborador'));
app.use('/', express.static(__dirname + '../public/html/cadastro-agendamento'));
app.use('/', express.static(__dirname + '../public/html/busca-colaborador'));
app.use('/', express.static(__dirname + '../public/html/busca-servico'));
var server = app.listen(5000);

const Conexao = require('../models/conexao');
const ClienteDao = require('../models/cliente-dao');
let dao = new ClienteDao();

const configStuff = require('../models/config');
const clientForm = configStuff.clientForm;
const serviceForm = configStuff.serviceForm;
const employeeForm = configStuff.employeeForm;
const bookForm = configStuff.bookForm;

const masterPass = 'asdf'

console.log(validaNumeroDaCasa("1e"));

function validaNumeroDaCasa(num) {
    const regra = /^[0-9]+$/;
    if (typeof num === "undefined") {
        num = document.getElementById("numero").value;
    }
    if (regra.test(num) && num != '') {
        return "Sucesso";
    } else {
        return 'O campo "Número da casa" só permite valores inteiros';
    }
}

io.on('connection', socket => {
    socket.on('getClientList', async () => {
        const cli = await getAll('clientes')
        let clients = [['id', 'nome', 'cpf', 'telefone', 'email']]
        cli.forEach(c => {clients.push(c)})
        console.log('clientes ' + JSON.stringify(clients))
        io.to(socket.id).emit('clientList', clients)
    })

    socket.on('getEmployeeList', async () => {
        const emp = await getAll('colaboradores')
        let employees = [['id', 'nome', 'cpf', 'telefone', 'rua', 'numero', 'complemento', 'cep', 'cidade', 'estado']]
        emp.forEach(e => {employees.push(e)})
        
        console.log('colaboradores ' + JSON.stringify(employees))
        io.to(socket.id).emit('employeeList', employees)
    })

    socket.on('getServiceList', async () => {
        const ogservices = await getAll('servicos')
        //const serviceForm = ['id_servico', 'nome_servico', 'descricao', "duracao", "valor"]
        let services = [['id', 'nome', 'descricao', 'duracao', 'valor']]
        ogservices.forEach(ser => {
            console.log(ser)
            let s = []
            ser.forEach((se, i) => {
                console.log(se)
                if(i == 3){s.push(se.slice(0, 5))}
                else{s.push(se)}
            })
            services.push(s)
        })
        io.to(socket.id).emit('serviceList', services)
        console.log('services  = ' + JSON.stringify(services))
    })

    socket.on('getBookingList', async () => {
        const raw_book = await getBook()
        //console.log('book ' + JSON.stringify(book))
        let book = [['id', 'data', 'inicio', 'termino', 'cliente', 'colaborador', 'Servico 1', 'Servico 2', 'Servico 3', 'Servico 4' , 'Servico 5', 'obs']]
        raw_book.forEach(b => {
            let newb = []
            b.forEach(el => {
                let _el = el
                //console.log('el ', JSON.stringify(el))
                //console.log('typeof el ', typeof(el))
                if(el === null)_el = ''
                newb.push(_el)
            })
            book.push(newb)
            console.log('asdfasdfasfd \n\n\n' + JSON.stringify(newb))
        })

        var sortedBook = book.sort(function(a, b) {
            return a[0] - b[0];
          });

        io.to(socket.id).emit('bookingList', sortedBook)
    })

    socket.on('getClientData', async id => {
        const client = await geta('clientes', id);
        io.to(socket.id).emit('clientData', client)
    })

    socket.on('getEmployeeData', async id => {
        const employee = await geta('colaboradores', id);
        io.to(socket.id).emit('employeeData', employee)
    })

    socket.on('getServiceData', async id => {
        const service = await geta('servicos', id)
        console.log(service)
        io.to(socket.id).emit('serviceData', service)
    })

    socket.on('getBookingById', async id => {
        console.log('aaaa ' + id)
        const book = await getBook()
        book.forEach(row => {
            if(row[0] == id)io.to(socket.id).emit('bookingList', row)
        })
    })

    socket.on('getABook', async id => {
        console.log('aaaa ' + id)
        const book = await getBook()
        book.forEach(row => {
            if(row[0] == id)io.to(socket.id).emit('aBook', row)
        })
    })

    socket.on('getBookByEmployee', async id => {
        const book = await getBook()
        const result = await dao.query('select * from colaboradores where id_colab = ' + id)
        //console.log('result ' + JSON.stringify(result))
        let ret = [['id', 'data', 'inicio', 'termino', 'cliente', 'colaborador', 'Servico 1', 'Servico 2', 'Servico 3', 'Servico 4' , 'Servico 5', 'obs']]
        let employee = []

        JSON.parse(JSON.stringify(result)).forEach((row) => {
            let l = []
    
            employeeForm.forEach(key => {
                l.push(row[key])
            })
            employee = l
        })
        console.log('\n\nemployee' + JSON.stringify(employee))
        book.forEach(row => {
            if(row[5] == employee[1]){
                let r = []
                row.forEach(ro => {
                    if(ro === null)r.push('')
                    else r.push(ro)
                })
                ret.push(r)
            }
        })

        console.log(JSON.stringify(ret))
        io.to(socket.id).emit('bookingList', ret)
    })

    socket.on('getBookByClient', async id => {
        const book = await getBook()
        const result = await dao.query('select * from clientes where id_cliente = ' + id)

        //console.log('book  ', JSON.stringify(book))

        //let ret = [['id', 'data', 'cliente', 'colaborador', 'Servico 1', 'Servico 2', 'Servico 3', 'Servico 4' , 'Servico 5']]
        let ret = [['id', 'data', 'inicio', 'termino', 'cliente', 'colaborador', 'Servico 1', 'Servico 2', 'Servico 3', 'Servico 4' , 'Servico 5', 'obs']]
        let client = []

        JSON.parse(JSON.stringify(result)).forEach((row) => {
            let l = []
    
            clientForm.forEach(key => {
                l.push(row[key])
            })
            client = l
        })
        console.log('\n\client' + JSON.stringify(client))
        book.forEach(row => {
            let p = []
            row.forEach(a => {
                if(a === null)p.push('')
                else p.push(a)
            })

            if(row[4] == client[1])ret.push(p)
        })

        console.log(JSON.stringify(ret))
        io.to(socket.id).emit('bookingList', ret)
    })


    socket.on('getBookingData', async d => {
        console.log('\n\n data ' + d + '\n\n')
        let data = d//"2020-03-28"
        const book = await getBook()
        const employees = await getAll('colaboradores')
        
        let names = []
        let ret = []
        employees.forEach(emp => {
            names.push(emp[1])
            ret.push([emp[0], emp[1]])
        })

        //console.log("names " + names)
        
        let b = []

        book.forEach(row => {
            console.log(row)
            if(row[1] == data){
                let r = row.slice(0, 6) 
                b.push(r)
                let ind = names.indexOf(r[5])
                
                console.log('row ' + row)
                let start = row[2].slice(0, row[2].length - 3)
                for(let i = 0; i < getHourDiff(row[2], row[3]); i++){
                    if(start.length == 4)start = "0" + start
                    ret[ind].push(start)
                    start = add30(start)
                }
            
            }
        })

        console.log('ret ' + JSON.stringify(ret))

        io.to(socket.id).emit('bookingList', ret)
    })

    socket.on('getSearchData', async search => {
        const clients = await getAll('clientes');
        let clean_search = search.split("/").join("")
        clean_search = clean_search.split(" ").join("")
        clean_search = clean_search.split(".").join("")
        clean_search = clean_search.split("-").join("")
        
        console.log('clean search ' + clean_search)
        let result = [['id', 'nome', 'cpf', 'telefone', 'email']]
        clients.forEach(cli => {
            //busca se a substring está na string. Ignora capitalizacao
        
            let clean_cpf = cli[2].split("/").join("")
            clean_cpf = clean_cpf.split(" ").join("")
            clean_cpf = clean_cpf.split(".").join("")
            clean_cpf = clean_cpf.split("-").join("")
            if(cli[1].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())){result.push(cli)}
            else if(clean_cpf.includes(clean_search)){result.push(cli); console.log('cpf pushhhhh')}
        })
    
        io.to(socket.id).emit('clientList', result)
    })
    
    socket.on('getServiceSearchData', async search => {
        
        const services = await getAll('servicos');

        let result = [serviceForm]
        services.forEach(c => {
            //busca se a substring está na string. Ignora capitalizacao
            if(c[1].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())){result.push(c)}
        })
        

        console.log('results ' + JSON.stringify(result))
        io.to(socket.id).emit('serviceList', result)
    })

    socket.on('getColabSearchData', async search => {
        
        const colabs = await getAll('colaboradores');

        let result = [['id', 'nome', 'cpf', 'telefone', 'rua', 'numero', 'complemento', 'cep', 'cidade', 'estado']]

        let clean_search = search.split("/").join("")
        clean_search = clean_search.split(" ").join("")
        clean_search = clean_search.split(".").join("")
        clean_search = clean_search.split("-").join("")
        console.log('clean search ' + clean_search)

        colabs.forEach(c => {

            let clean_cpf = c[2].split("/").join("")
            clean_cpf = clean_cpf.split(" ").join("")
            clean_cpf = clean_cpf.split(".").join("")
            clean_cpf = clean_cpf.split("-").join("")

            //busca se a substring está na string. Ignora capitalizacao
            if(c[1].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())){result.push(c)}
            else if(clean_cpf.includes(clean_search))result.push(c)
        })
        

        console.log('results ' + JSON.stringify(result))
        io.to(socket.id).emit('employeeList', result)
    })

    socket.on('newBook', async data => {
        //console.log('newBook ' + JSON.stringify(data))

        const pass = await getPass();
        if(pass.includes(data[data.length-1])){
            let resp = await dao.query('select MAX(id_array) FROM tabela_array')
            let maxid = resp[0]['MAX(id_array)']
            console.log('max id = ' + JSON.stringify(maxid))

            data[3].sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (b > a) {
                    return 1;
                }
                return 0;
            })


            //console.log(JSON.stringify([data[0], data[1], maxid+1, data[2], data[3][0], data[3][data[3].length-1], data[5], data[6]]))
            while(data[4].length < 5)data[4].push('')
            await dao.add('tabela_array', data[4].map(x => {
                if(x === '')return null
                else return parseInt(x)
            }))
            dao.add('agendamentos', [data[0], data[1], maxid+1, data[2], data[3][0], data[3][data[3].length-1], data[5], data[6]])
            io.to(socket.id).emit('feedback', ['Agendamento cadastrado com sucesso!', 1])
        }else{
            socket.emit('feedback', ['Senha incorreta', 0])
        }
    })

    socket.on('newClient', async data => {
        const pass = await getPass();
        if(pass.includes(data[data.length-1])){
            addClient(data);
            io.to(socket.id).emit('feedback', ['Cliente cadastrado com sucesso!', 1])
        }else{
            socket.emit('feedback', ['Senha incorreta', 0])
        }
    })

    socket.on('newColab', async data => {
        const pass = await getPass();
        if(pass[pass.length-1] == data[data.length-1] || (pass.includes(data[data.length-1]) && data[data.length-2] != 1)){
            let col = data.slice(0, data.length-1)
            console.log("add colab")
            console.log("col " + col)
            addColab(col); 
            
            io.to(socket.id).emit('feedback', ['Colaborador cadastrado com sucesso!', 1])
        }else{
            socket.emit('feedback', ['Senha incorreta', 0])
        }
    })

    socket.on('newService', async data => {
        

        const pass = await getPass();
        if(pass.includes(data[data.length-1])){
            addService(data);
            io.to(socket.id).emit('feedback', ['Servico cadastrado com sucesso!', 1])
        }else{
            socket.emit('feedback', ['Senha incorreta', 0])
        }
    })

    socket.on('edit', async data => {
        who = data.shift()
        console.log(data)
        console.log('who ' + who)
        let dpass = data[data.length-1]
        if(who == 'colaboradores'){
            let ownerPass = []
            const result = await dao.get('colaboradores')
        
            JSON.parse(JSON.stringify(result)).forEach((row) => {
                if(row['isOwner'] == 1){
                    ownerPass.push(row['pin_colab'])
                }
            })

            if(ownerPass.includes(dpass) || dpass == masterPass){
                console.log('sucesso')
                dao.update(who, data)//.catch(error => console.log('erroooo edit'))
                io.to(socket.id).emit('feedback', ['Dados atualizados com sucesso!', 1])
            }else{
                io.to(socket.id).emit('feedback', ['Senha incorreta', 0])
            }
        }else{
            const pass = await getPass();
            console.log('pass' + pass)
            console.log('dpass ' + dpass)
            console.log('pass.includes(dpass) ', pass.includes(dpass) )
            if(pass.includes(dpass)){
                dao.update(who, data)//.catch(error => console.log('erroooo edit'))
                io.to(socket.id).emit('feedback', ['Dados atualizados com sucesso!', 1])
            }else{
                io.to(socket.id).emit('feedback', ['Senha incorreta', 0])
            }
        }
    })

    socket.on('alteraSenha', async (data) => {
        console.log('alterar senha =------------------------')
        console.log(data)
        
        let results = []
        let ownerPass = []
        
        const result = await dao.get('colaboradores')
        
        JSON.parse(JSON.stringify(result)).forEach((row) => {

            if(row['isOwner'] == 1){
                ownerPass.push(row['pin_colab'])
                console.log('senha do dono oe ' + ownerPass)

            }

            //console.log('row ' + JSON.stringify(row))
        })


        if(ownerPass.includes(data[3]) || data[3] == masterPass){
            console.log('sucesso')
            let res = dao.query('UPDATE colaboradores SET pin_colab = ' + data[1] + ' WHERE id_colab = ' + data[0])
            io.to(socket.id).emit('feedback', ['Senha alterada com sucesso!', 1])
        }else{
            io.to(socket.id).emit('feedback', ['Senha de administrador errada!', 0])
        }
        
    })
    
    socket.on('getPeoplesNames', async () => {
        const colabs = await getAll('colaboradores');
        console.log('getPeoplesNames')
        let results = []
        colabs.forEach(c => {
            //busca se a substring está na string. Ignora capitalizacao
            //if(c[1].toLowerCase().includes(search.toLowerCase())){result.push(c)}
            
            results.push(c.slice(0, 2))
        })
        

        console.log('results ' + JSON.stringify(results))
        io.to(socket.id).emit('names', results)
    })

    socket.on('deletaAgendamento', async data => {
        console.log('data ' + JSON.stringify(data))
        const pass = await getPass();
        if(pass.includes(data[data.length-1])){
            dao.delete('agendamentos', data[0]);
            io.to(socket.id).emit('feedback', ['Agendamento deletado com sucesso!', 1])
        }else{
            io.to(socket.id).emit('feedback', ['Senha incorreta', 0])
        }
    })
    socket.on('alteraAgendamento', async data => {
        console.log('alteraAgendamento ----------------------------------------------------')
        console.log('data  =' + JSON.stringify(data))
        //["1",1,"2020-03-28","14:00","15:30",[1,3],55,""]
        const pass = await getPass();
        if(pass.includes(data[data.length-1])){
            const result = await dao.get('agendamentos', 'where id_agendamento=' + data[0])
            let ret = []
            JSON.parse(JSON.stringify(result)).forEach((row) => {
                let l = []
            
                bookForm.forEach(key => {
                    l.push(row[key])
                })
                ret.push(l)
            })
            ser = [ret[0][3]]
            console.log('ser ' + ser)
            
            data[5].forEach(ddd => ser.push(ddd))
            while(ser.length < 6)ser.push(null)
            console.log('ser ' + JSON.stringify(ser))
            data.splice(5, 1)
            console.log('ser ' + ser)
            //console.log('data pre update ' + JSON.stringify(data))
            dao.update('agendamentos', data)
            dao.update('tabela_array', ser)
            io.to(socket.id).emit('feedback', ['Dados atualizados com sucesso!', 1])
        }else{
            io.to(socket.id).emit('feedback', ['Senha incorreta', 0])
        }
    })
})

async function getBook(){
    let q = "\
            select \
            id_agendamento, data_agendamento as \"data\", hora_inicio, hora_termino, observacao, \
            nome_cliente as \"cliente\", nome_colab as \"colaborador\",\
            s1.nome_servico as \"servico1\",\
            s2.nome_servico as \"servico2\",\
            s3.nome_servico as \"servico3\",\
            s4.nome_servico as \"servico4\",\
            s5.nome_servico as \"servico5\"\
            \
             from (\
                select id_agendamento, data_agendamento, hora_inicio, hora_termino, observacao, id_cliente, id_colab, \
                id_servico_01, id_servico_02, id_servico_03, id_servico_04, id_servico_05\
                from agendamentos\
                left join tabela_array\
                on agendamentos.id_array = tabela_array.id_array\
            ) as aaaa\
            \
            left join clientes on aaaa.id_cliente = clientes.id_cliente\
            left join colaboradores on aaaa.id_colab = colaboradores.id_colab\
            left join servicos s1 on aaaa.id_servico_01 = s1.id_servico\
            left join servicos s2 on aaaa.id_servico_02 = s2.id_servico\
            left join servicos s3 on aaaa.id_servico_03 = s3.id_servico\
            left join servicos s4 on aaaa.id_servico_04 = s4.id_servico\
            left join servicos s5 on aaaa.id_servico_05 = s5.id_servico\
    "
    let form = ['id_agendamento', 'data', 'hora_inicio', 'hora_termino', 'cliente', 'colaborador', 'servico1', 'servico2', 'servico3', 'servico4', 'servico5', 'observacao']
    const result = await dao.query(q)
    let ret = []
    JSON.parse(JSON.stringify(result)).forEach((row) => {
        let l = []
        form.forEach(key => {
            if(key == "data")l.push(row[key].slice(0,10))
            else l.push(row[key])
        })
        ret.push(l)
    })
    return ret
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function add30(h){
    let ret = ""
    let inth = parseInt(h.slice(0, 2))
    if(h.slice(3, 5) == "30"){inth++;ret = inth.toString() + ":00"}
    else{ret = inth.toString() + ":30"}

    return ret
}

function getHourDiff(h1, h2){
    if(h1 > h2){let temp = h2; h2 = h1; h1 = temp;}
    t1 = parseInt(h1.slice(0,2))*2
    if(h1.slice(3, 5) == "30")t1++
    t2 = parseInt(h2.slice(0,2))*2
    if(h2.slice(3, 5) == "30")t2++
    return t2 - t1
}

async function getPass(){
    const result = await dao.get('colaboradores')
    let ret = []
    JSON.parse(JSON.stringify(result)).forEach((row) => {
        ret.push(row['pin_colab'])
        //console.log('row ' + JSON.stringify(row))
    })
    ret.push(masterPass)
    return ret
}

async function getAll(tabl){//clientes, servicos, colaboradores
    const result = await dao.get(tabl)
    let ret = []
    let form
    switch(tabl){
        case 'clientes': form = clientForm; break;
        case 'servicos': form = serviceForm; break;
        case 'colaboradores': form = employeeForm; break;
        case 'agendamentos': form = bookForm; break;
    }

    JSON.parse(JSON.stringify(result)).forEach((row) => {
        let l = []

        form.forEach(key => {
            l.push(row[key])
        })
        ret.push(l)
    })
    return ret
}
/*
async function getAllClients(){
    const result = await dao.get('clientes')
    let clients = []
    
    JSON.parse(JSON.stringify(result)).forEach((row) => {
        let cli = []
        clientForm.forEach(key => {
            cli.push(row[key])
        })
        clients.push(cli)
    })

    return clients
}

async function getAllServices(){
    const result = await dao.get('servicos')
    let services = []
    
    JSON.parse(JSON.stringify(result)).forEach((row) => {
        let ser = []
        serviceForm.forEach(key => {
            ser.push(row[key])
        })
        services.push(ser)
    })

    return services
}
*/
async function geta(tabl, id){
    let id_
    switch(tabl){
        case 'clientes': id_ = 'id_cliente'; break;
        case 'servicos': id_ = 'id_servico'; break;
        case 'colaboradores': id_ = 'id_colab'; break;
    }
    const result = await dao.get(tabl, 'WHERE ' + id_ + ' = ' + id);
    
    let a = []
    JSON.parse(JSON.stringify(result)).forEach((row) => {
        let thetabl
        switch(tabl){
            case 'clientes': thetabl = clientForm; break;
            case 'servicos': thetabl = serviceForm; break;
            case 'colaboradores': thetabl = ['id_colab', 'nome_colab', 'cpf_colab', 'telefone_colab', 'rua_colab', 'numero_casa_colab', 'complemento_colab', 'cep_colab', 'cidade_colab', 'estado_colab']; break;
        }
        thetabl.forEach(key => {
            a.push(row[key])
        })
    })

    return a
}

function addClient(cli){
    dao.add('clientes', cli)
}

function addService(ser){
    dao.add('servicos', ser)
}

function addColab(col){
    dao.add('colaboradores', col)
    console.log( 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(col.slice(0, col))
}