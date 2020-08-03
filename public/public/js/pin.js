const socket = io('http://localhost:2000')

window.onload = function(){
    socket.emit('getPeoplesNames');
}
//<option value="volvo">Volvo XC90</option>
socket.on('feedback', data => {
    let text = data[0]
    let ok = data[1]
    alert(text)
    console.log('feedbakc ' + text)
    if(ok){
        //voltar();
        paraOpcoesDoSistema()
    }
})

socket.on('names', data => {
    data.forEach((element, ii) => {
        var op = document.createElement("option")
        //criar atributo id
        let att = document.createAttribute('value')
        att.value = element[0]
        op.setAttributeNode(att)
        
        op.appendChild(document.createTextNode(element[1]))
        
        
        document.getElementById("pessoas").appendChild(op); 
    }); 
})

function alterarSenha(){

    let pass1 = document.getElementById('pass1').value;
    let pass2 = document.getElementById('pass2').value;
    let admin = document.getElementById('admin').value;
    if(pass1 == '' || pass2 == '' || admin == ''){
        alert('Preencha todos os campos')
    }else{
        if(pass1 == pass2){
            let colab = document.getElementById('pessoas').value;

            let stuff = [colab, pass1, pass2, admin]
            console.log(stuff)
            socket.emit('alteraSenha', stuff)
        }else{
            alert('As novas senhas são diferentes')
        }
    }
}