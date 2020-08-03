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

function validaTelefone(telefone) {
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
            return 'Telefone inválido. Verifique a quantidade de caracteres e se você utilizou letras'
        }
    }
}


function validaCEP(cep) {
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

function validaCPF(inputCPF) {
    var soma = 0;
    var resto;

    if (typeof inputCPF === "undefined") {
        inputCPF = document.getElementById('cpf').value;
    }

    if (inputCPF == '') {
        return 'Preencha o CPF'
    }

    if (inputCPF.length != 11) return false;

    if (inputCPF == '00000000000') return false;
    for (i = 1; i <= 9; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(inputCPF.substring(10, 11))) return false;

    return true;
}

// retorna o cpf formatado
function formataCPF(cpf) {
    if (validaCPF(cpf)) {
        cpf = cpf.replace(/[^\d]/g, "");
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
        return "CPF Inválido"
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
