const socket = io('http://localhost:2000')

socket.on('serviceList', data => {
    document.getElementById("listaServicos").innerHTML = ''
    console.log('service list')
    console.log(data)

    data.forEach((element, ii) => {
        var tr = document.createElement("tr")
        element.forEach((el, i) => {
            if(window.location.href.includes("busca-servico.html")){
                let td = document.createElement("td")
                if(!ii)td = document.createElement("th")
                td.appendChild(document.createTextNode(el))
                tr.appendChild(td)
            }
        })

        if(ii){
            //criar atributo id
            let att = document.createAttribute('id')
            att.value = element[0]
            tr.setAttributeNode(att)

            //criar atributo onclick
            att = document.createAttribute('onclick')
            att.value = "paraServico(this.id)"
            tr.setAttributeNode(att)
        }
        document.getElementById("listaServicos").appendChild(tr); 
    });
})
