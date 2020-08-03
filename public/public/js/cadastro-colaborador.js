const socket = io('http://localhost:2000')

socket.on('feedback', data => {
    let text = data[0]
    let ok = data[1]
    alert(text)
    console.log('feedbakc ' + text)
    if(ok){
        //voltar();
        //document.getElementById('voltar').click()
        paraListaColaboradores();
    }
})

function cadastrarColaborador(){
    let stuff = ['id', 'nome', 'cpf', 'telefone', 'rua', 'numero', 'complemento', 'cep', 'cidade', 'estado']
    let data = []
    let erros = []
    let fun = [af, validaNome, validaCPF, validaTelefone, validaRua, validaNumeroDaCasa, validaComplemento, validaCEP, validaCidade,validaEstado, validaPin]
    //stuff.forEach((s, i) => {
    stuff.forEach((el, i) => {
        if(i){
        console.log('el ' + el)
        //data.push(document.getElementById(s).value)
        if (fun[i](document.getElementById(el).value) != "Sucesso") {
            erros.push(fun[i](document.getElementById(el).value))
        }
        let texto = document.getElementById(el).value
        if(i == 2){texto = formataCPF(texto)}
        data.push(texto)
    }
    })

    let p1 = document.getElementById('pass1').value;
    let p2 = document.getElementById('pass2').value;
    
    if(p1 == '' || p2 == '')erros.push('Preencha as duas senhas')
    else if(p1.length > 8 || p2.length > 8)erros.push('As senhas só podem ter 8 caracteres')
    else if(p1 != p2)erros.push('As senhas não são iguais')
    
    if (!erros.length) {
        data.push(p1)
        if(document.getElementById('isOwner').checked == true)data.push(1)
        else data.push(0)
        
        let resultado = window.prompt("Digite a senha de administrador");
        data.push(resultado)
        socket.emit('newColab', data)
    } else {
        let msg = ''
        erros.forEach(e => {
            msg = msg + '\n' + e
        })

        alert(msg)
    }
}