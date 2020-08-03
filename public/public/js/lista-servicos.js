const socket = io('http://localhost:2000')
window.onload = function(){
    socket.emit('getServiceList')
}


socket.on('serviceList', data => {
    document.getElementById("listaServicos").innerHTML = ''
    console.log('service list list')

    data.forEach((element, ii) => {
        var tr = document.createElement("tr")
        element.forEach((el, i) => {
            if(i){
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