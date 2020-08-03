const socket = io('http://localhost:2000')

socket.on('clientList', data => {
    document.getElementById("listaClientes").innerHTML = ''
    console.log('client list')
    
    var tr = document.createElement("tr")
    data[0].forEach((el, i) => {
        
        if(window.location.href.includes("lista-clientes.html")){
            if(true){
                let td = document.createElement("th")
                td.appendChild(document.createTextNode(el))
                tr.appendChild(td)
            }
        }
        document.getElementById("listaClientes").appendChild(tr); 
    })
    document.getElementById("listaClientes").appendChild(tr); 

    data.reverse().forEach((element, ii) => {
        if(ii == data.length -1){
            return true;
        }
        tr = document.createElement("tr")
        element.forEach((el, i) => {
            if(window.location.href.includes("lista-clientes.html")){
                if(true){
                    let td = document.createElement("td")
                    td.appendChild(document.createTextNode(el))
                    tr.appendChild(td)
                }
            }
        })

        if(true){            
            //criar atributo id
            let att = document.createAttribute('id')
            att.value = element[0]
            
            tr.setAttributeNode(att)
            
            //criar atributo onclick
            att = document.createAttribute('onclick')
            
            att.value = att.value = "paraCliente(this.id)"
            tr.setAttributeNode(att)
        }
        document.getElementById("listaClientes").appendChild(tr); 
    });
})

function paraCadastroCliente(){
    location.replace("http://127.0.0.1:5500/public/html/cadastro-cliente.html")
}

function paraBuscaCliente(){
    let b = document.getElementById('busca')
    let normalize = b.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    console.log('parabusca ' + normalize)
    location.replace("http://127.0.0.1:5500/public/html/busca-cliente.html?busca=" + normalize)
}
