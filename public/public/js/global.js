const clientForm = ['id_cliente', 'nome_cliente', 'cpf_cliente', 'telefone_cliente', 'email_cliente']
const serviceForm = ['id_servico', 'nome_servico', 'descricao', "duracao", "valor"]
const employeeForm = ['id_colab', 'nome_colab', 'cpf_colab', 'telefone_colab', 'rua_colab', 'numero_casa_colab', 'complemento_colab', 'cep_colab', 'cidade_colab', 'estado_colab']
const bookForm = ['id_agendamento', 'id_cliente', 'id_array', 'data_agendamento', 'hora_inicio', 'hora_termino', 'preco_total', 'observacao']

function paraBuscaColaborador() {
    let b = document.getElementById('busca')
    let normalize = b.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    location.replace("http://127.0.0.1:5500/public/html/busca-colaborador.html?busca=" + normalize)
}

function paraBuscaServico() {
    let b = document.getElementById('busca')
    let normalize = b.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    location.replace("http://127.0.0.1:5500/public/html/busca-servico.html?busca=" + normalize)
}

function paraIndex() {
    location.replace("http://127.0.0.1:5500/public/html/index.html")
}

function paraListaClientes() {
    location.replace("http://127.0.0.1:5500/public/html/lista-clientes.html")
}

function paraCliente(id) {
    location.replace("http://127.0.0.1:5500/public/html/cliente.html?id=" + id)
}

function paraColaborador(id) {
    location.replace("http://127.0.0.1:5500/public/html/colaborador.html?id=" + id)
}

function paraListaColaboradores() {
    location.replace("http://127.0.0.1:5500/public/html/lista-colaboradores.html")
}

function paraListaColaboradores() {
    location.replace("http://127.0.0.1:5500/public/html/lista-colaboradores.html")
}

function paraServico(id) {
    location.replace("http://127.0.0.1:5500/public/html/servico.html?id=" + id)
}

function paraPin() {
    location.replace("http://127.0.0.1:5500/public/html/pin.html")
}

function paraAgendamento(id) {
    location.replace("http://127.0.0.1:5500/public/html/agendamento.html?id=" + id)
}

function paraUrl(stuff) {
    console.log('stuff ' + stuff)
    location.replace("http://127.0.0.1:5500/public/html/" + stuff)
}

function paraOpcoesDoSistema() {
    console.log('opcoes do sistemas')
    location.replace("http://127.0.0.1:5500/public/html/opcoes-do-sistema.html")
}

function paraListaServicos() {
    location.replace("http://127.0.0.1:5500/public/html/lista-servicos.html")
}

function paraListaAgendamentos() {
    location.replace("http://127.0.0.1:5500/public/html/lista-agendamentos.html")
}

function listaAgendamentos() {
    let d = document.getElementById('data').value
    socket.emit('getBookingList', d)
}

function paraCadastroServico() {
    location.replace("http://127.0.0.1:5500/public/html/cadastro-servico.html")
}

function paraCadastroAgendamento(id) {
    location.replace("http://127.0.0.1:5500/public/html/cadastro-agendamento.html?id=" + id)
}

function paraCadastroColaborador() {
    location.replace("http://127.0.0.1:5500/public/html/cadastro-colaborador.html")
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function editarDados(doque) {
    let theform

    switch (doque) {
        case 'clientes':
            theform = clientForm;
            break;
        case 'servicos':
            theform = serviceForm;
            break;
        case 'colaboradores':
            theform = employeeForm;
            break;
    }
    theform.forEach((el, i) => {
        if (i) {
            document.getElementById(el).readOnly = false
        }
    })
    document.getElementById("salvar").style.display = 'flex'
    document.getElementById("editar").style.display = 'none'
}

function salvarDados(doque) {
    let data
    let theform
    let fun
    let erros = []
    switch (doque) {
        case 'clientes':
            data = ['clientes'];
            theform = clientForm;
            fun = [af, validaNome, validaCPF, validaTelefone, validaEmail];
            break;
        case 'servicos':
            data = ['servicos'];
            theform = serviceForm;
            fun = [af, validaNome, validaDescricao, validaDuracao, validaValor];
            break;
        case 'colaboradores':
            data = ['colaboradores'];
            theform = employeeForm;
            fun = [af, validaNome, validaCPF, validaTelefone, validaRua, validaNumeroDaCasa, af, validaCEP, validaCidade, validaEstado];
            break;
    }
    data.push(getUrlVars()["id"])

    theform.forEach((el, i) => {
        //console.log('el ' + el)
        if (i) {
            console.log('valor ' + document.getElementById(el).value)
            if (fun[i](document.getElementById(el).value) != "Sucesso") {
                erros.push(fun[i](document.getElementById(el).value))
                
            }
            let texto = document.getElementById(el).value
            if (doque == 'clientes' && i == 2) {
                texto = formataCPF(texto)
            }
            if (doque == 'clientes' && i == 3) {
                texto = formataTelefone(texto)
            }
            if (doque == 'servicos' && i == 3) {
                texto = formataDuracao(texto)
            }
            if (doque == 'servicos' && i == 4) {
                texto = formataValor(texto)
            }
            if (doque == 'colaboradores' && i == 2) {
                texto = formataCPF(texto)
            }
            if (doque == 'colaboradores' && i == 4) {
                texto = formataTelefone(texto)
            }
            data.push(texto)
        }
    })

    if (!erros.length) {
        let resultado
        if (doque != 'colaboradores') resultado = window.prompt("Digite a sua senha");
        else resultado = window.prompt("Digite a senha de administrador");
        data.push(resultado)
        socket.emit('edit', data)
    } else {
        let msg = ''
        erros.forEach(e => {
            msg = msg + '\n' + e
        })

        alert(msg)
    }

}

function af(coisa) {
    return 'Sucesso';
}

function validaPin(pin) {
    if (pin.length > 8) {
        return 'o pin possui no maximo 8 caracteres'
    }
    return 'Sucesso'
}

// nome aceita acentos, hífens, espaço e apóstrofo (')
function validaNome(nome) {
    const regra = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+(([' -][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])?[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*)*$/;
    if (typeof nome === "undefined") {
        nome = document.getElementById('nome').value;
    }
    if (nome == '') {
        return 'Preencha o nome'
    } else {
        if (regra.test(nome)) {
            if (nome.length > 100) {
                return 'O tamanho do nome não é suportado'
            }
            return 'Sucesso'
        } else {
            return 'O campo nome deve conter apenas letras'
        }
    }
}

function validaComplemento(nome) {
    const regra = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+(([' -][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])?[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*)*$/;
    if (typeof nome === "undefined") {
        nome = document.getElementById('nome').value;
    }
    if (nome == '') {
        return 'Sucesso'
    } else {
        if (regra.test(nome)) {
            if (nome.length > 20) {
                return 'O tamanho do complemento não é suportado'
            }
            return 'Sucesso'
        } else {
            return 'O campo complemento deve conter apenas letras'
        }
    }
}

function validaRua(rua) {
    const regra = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+(([' -][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ])?[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]*)*$/;
    console.log('rua =  ' + rua)
    if (rua == '') {
        return 'Preencha a rua'
    } else {
        if (regra.test(rua)) {
            if (rua.length > 100) {
                return 'O tamanho da rua não é suportado'
            }
            return 'Sucesso'
        } else {
            return 'O campo rua deve conter apenas letras'
        }
    }
}

function validaValor(cash) {
    return 'Sucesso'
}

function formataValor(cash) {
    return cash;
}

function validaDescricao(nome) {
    const regra = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+(([' -][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])?[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*)*$/;
    
    if (typeof nome === "undefined") {
        nome = document.getElementById('nome').value;
    }
    if (nome == '') {
        return 'Preencha a descricao'
    } else {
        if (regra.test(nome)) {
            if (nome.length > 100) {
                return 'O tamanho da descrição não é suportado'
            }
            return 'Sucesso'
        } else {
            return 'O campo descrição deve conter apenas letras'
        }
    }
}

function validaCPF(inputCPF) {
    var soma = 0;
    var resto;

    console.log('cpf ' + inputCPF)
    inputCPF = inputCPF.split(".").join("")
    inputCPF = inputCPF.split("-").join("")

    console.log('cpf ' + inputCPF)

    //387.492.233-21

    if (typeof inputCPF === "undefined") {
        inputCPF = document.getElementById('cpf').value;
    }

    if (inputCPF == '') {
        return 'Preencha o CPF'
    }

    if (inputCPF.length != 11) return 'CPF inválido';

    if (inputCPF == '00000000000') return 'CPF inválido';
    for (i = 1; i <= 9; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(inputCPF.substring(9, 10))) return 'CPF inválido';

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(inputCPF.substring(10, 11))) return 'CPF inválido';

    return 'Sucesso';
}

// retorna o cpf formatado
function formataCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function validaTelefone(telefone) {
    telefone = telefone.split(".").join("")
    telefone = telefone.split("-").join("")
    telefone = telefone.split(" ").join("")
    telefone = telefone.split("(").join("")
    telefone = telefone.split(")").join("")

    const regra = /^(?:\+55)?\s?\(?0?[1-9][1-9]\)?\s?(?:9)?\s?\d{4}\-?\d{4}$/;

    if (typeof telefone === "undefined") {
        telefone = document.getElementById('telefone').value;
    }
    if (telefone == '') {
        return 'Preencha o telefone'
    } else {
        if (regra.test(telefone)) {
            return 'Sucesso'
        } else {
            return 'Telefone inválido'
        }
    }
}

function formataTelefone(telefone) {
    if (telefone.length == 10) {
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
}

function validaEmail(email) {
    const regra = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof email === "undefined") {
        email = document.getElementById("email").value;
    }
    if (email == '') {
        return 'Preencha o campo Email';
    } else {
        if (regra.test(email)) {
            if (email.length > 100) {
                return 'O tamanho do email não é suportado'
            }
            return 'Sucesso';
        } else {
            return 'Você digitou um formato de email inválido';
        }
    }
}

function validaNumeroDaCasa(num) {
    const regra = /^[0-9]+$/;
    if (typeof num === "undefined") {
        num = document.getElementById("numero").value;
    }
    if (num == '') {
        return 'Preencha o campo Número da casa';
    } else {
        if (regra.test(num)) {
            return "Sucesso";
        } else {
            return 'O campo "Número da casa" só permite valores inteiros';
        }
    }
}

function validaDuracao(dur) {
    const regra = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    console.log('dur '+ dur)
    if(dur.length > 6)dur=dur.slice(0, 5);
    console.log('dur '+ dur)
    if (typeof dur === "undefined") {
        dur = document.getElementById("duracao").value;
    }
    if (dur == '') {
        return 'Preencha o campo duração'
    } else {
        if (dur == '00:00') {
            return 'A duração não pode ser zero.'
        }
        if (regra.test(dur)) {
            return 'Sucesso'
        } else {
            return 'O duração deve estar no formato HH:MM e no padrão 24h'
        }
    }
}

function formataDuracao(dur) {
    return dur
}

function validaCEP(cep) {
    cep = cep.split(".").join("")
    cep = cep.split("-").join("")
    const regra = /^[0-9]{8}$/;
    if (typeof cep === "undefined") {
        cep = document.getElementById('cep').value;
    }
    if (cep == '') {
        return 'Preencha o CEP'
    } else {
        if (regra.test(cep)) {
            return 'Sucesso';
        } else {
            return 'CEP inválido'
        }
    }
}

// retorna o cep formatado
function formataCEP(cep) {
    return cep.replace(/^([\d]{5})-*([\d]{3})/, "$1-$2");
}


function validaData(data) {
    const regra = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if (typeof data === "undefined") {
        data = document.getElementById('data').value;
    }
    if (data == '') {
        return 'Preencha o campo data'
    } else {
        if (regra.test(data)) {
            return 'Sucesso'
        } else {
            return 'Digite a data num formato válido. Exemplo: 2020-12-21'
        }
    }
}

function validaEstado(estado) {
    const regra = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
    if (typeof estado === "undefined") {
        estado = document.getElementById('estado').value;
    }
    if (estado == '') {
        return 'Preencha o campo estado'
    } else {
        if (regra.test(estado)) {
            if (estado.length > 100) {
                return 'O nome do estado deve ser menor'
            }
            return 'Sucesso'
        } else {
            return 'O Nome do estado deve conter apenas letras'
        }
    }
}

function validaCidade(cidade) {
    const regra = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+(([' -][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])?[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*)*$/;
    if (typeof cidade === "undefined") {
        cidade = document.getElementById('cidade').value;
    }
    if (cidade == '') {
        return 'Preencha a cidade'
    } else {
        if (regra.test(cidade)) {
            if (cidade.length > 100) {
                return 'O nome da cidade está muito grande'
            }
            return 'Sucesso'
        } else {
            return 'O campo cidade deve ser preenchido com letras'
        }
    }
}

function validaValor(valor) {
    if (isNaN(valor)) {
        return 'O valor deve ser preenchido com números inteiros ou reais'
    } else if (valor == '') {
        return 'Preencha o campo valor'
    } else {
        return 'Sucesso'
    }
}
//INICIO PAINEL AJUDA
var painelAberto = 0
var painelGuiaAberto = 0

function AbrirPainelAjuda() {
    if (painelAberto == 0) {
        document.querySelector('.painel-ajuda').style.display = 'block';
        document.querySelector('.painel-ajuda__background__options').style.display = 'block';
        document.querySelector('.painel-ajuda__background__alteracao').style.display = 'none';
        document.querySelector('.painel-ajuda__background__consulta').style.display = 'none';
        document.querySelector('.painel-ajuda__background__cadastro').style.display = 'none';
        document.querySelector('.painel-ajuda__background__cancelamento').style.display = 'none';
        painelAberto = 1
    } else {
        document.querySelector('.painel-ajuda').style.display = 'none';
        document.querySelector('.painel-ajuda__background__options').style.display = 'none';
        document.querySelector('.painel-ajuda__background__alteracao').style.display = 'none';
        document.querySelector('.painel-ajuda__background__consulta').style.display = 'none';
        document.querySelector('.painel-ajuda__background__cadastro').style.display = 'none';
        document.querySelector('.painel-ajuda__background__cancelamento').style.display = 'none';
        painelAberto = 0
    }
}

function PressionouF1(e) {
    if (e.ctrlKey && e.keyCode == 112) {
        AbrirPainelAjuda();
    }
}
document.addEventListener('keyup', PressionouF1, false);

function AbrirAjudaConsulta() {
    if (painelGuiaAberto == 0) {
        document.querySelector('.painel-ajuda__background__options').style.display = 'none';
        document.querySelector('.painel-ajuda__background__consulta').style.display = 'block';
        painelGuiaAberto = 1
    } else {
        document.querySelector('.painel-ajuda__background__consulta').style.display = 'none';
        document.querySelector('.painel-ajuda__background__options').style.display = 'block';
        painelGuiaAberto = 0
    }
}

function AbrirAjudaCadastro() {
    if (painelGuiaAberto == 0) {
        document.querySelector('.painel-ajuda__background__options').style.display = 'none';
        document.querySelector('.painel-ajuda__background__cadastro').style.display = 'block';
        painelGuiaAberto = 1
    } else {
        document.querySelector('.painel-ajuda__background__cadastro').style.display = 'none';
        document.querySelector('.painel-ajuda__background__options').style.display = 'block';
        painelGuiaAberto = 0
    }
}

function AbrirAjudaAlteracao() {
    if (painelGuiaAberto == 0) {
        document.querySelector('.painel-ajuda__background__options').style.display = 'none';
        document.querySelector('.painel-ajuda__background__alteracao').style.display = 'block';
        painelGuiaAberto = 1
    } else {
        document.querySelector('.painel-ajuda__background__alteracao').style.display = 'none';
        document.querySelector('.painel-ajuda__background__options').style.display = 'block';
        painelGuiaAberto = 0
    }
}

function AbrirAjudaCancelamento() {
    if (painelGuiaAberto == 0) {
        document.querySelector('.painel-ajuda__background__options').style.display = 'none';
        document.querySelector('.painel-ajuda__background__cancelamento').style.display = 'block';
        painelGuiaAberto = 1
    } else {
        document.querySelector('.painel-ajuda__background__cancelamento').style.display = 'none';
        document.querySelector('.painel-ajuda__background__options').style.display = 'block';
        painelGuiaAberto = 0
    }
}

function VoltarParaSelecao() {
    document.querySelector('.painel-ajuda__background__options').style.display = 'block';
    document.querySelector('.painel-ajuda__background__alteracao').style.display = 'none';
    document.querySelector('.painel-ajuda__background__consulta').style.display = 'none';
    document.querySelector('.painel-ajuda__background__cadastro').style.display = 'none';
    document.querySelector('.painel-ajuda__background__cancelamento').style.display = 'none';
}
//FIM PAINEL AJUDA