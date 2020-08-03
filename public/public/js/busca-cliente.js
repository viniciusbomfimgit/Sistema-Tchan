const socket = io('http://localhost:2000')

socket.on('clientList', data => {
    document.getElementById("listaClientes").innerHTML = ''
    console.log('client list')

    data.forEach((element, ii) => {
        var tr = document.createElement("tr")
        element.forEach((el, i) => {
            if(window.location.href.includes("busca-cliente.html")){
                if(true){
                    let td = document.createElement("td")
                    if(!ii)td = document.createElement("th")
                    td.appendChild(document.createTextNode(el))
                    tr.appendChild(td)
                }
            }
        })

        if(ii){
            //criar atributo id
            let att = document.createAttribute('id')
            att.value = element[0]
            tr.setAttributeNode(att)

            //criar atributo onclick
            att = document.createAttribute('onclick')
            att.value = "paraCliente(this.id)"
            tr.setAttributeNode(att)      
        }
        document.getElementById("listaClientes").appendChild(tr); 
    });
})


function paraBuscaCliente(){
    let b = document.getElementById('busca')
    let normalize = b.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    location.replace("http://127.0.0.1:5500/public/html/busca-cliente.html?busca=" + normalize)
}