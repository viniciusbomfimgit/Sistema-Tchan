const socket = io('http://localhost:2000')

socket.on('feedback', data => {
    let text = data[0]
    let todo = data[1]
    alert(text)
    console.log('feedbakc ' + data)
    if(todo != 0){
        document.getElementById("salvar").style.display = 'none'
        document.getElementById("editar").style.display = 'flex'
    }
})

socket.on('clientData', data => {
    clientForm.forEach((cli, i) => {
        
        if(i){
            document.getElementById(cli).value = data[i]
            document.getElementById(cli).readOnly = true
        }
    })
})

function agendar(){
    let id = getUrlVars()["id"]
}

socket.on('bookingList', data => {
    console.log(data)
    var tr = document.createElement("tr")
    data[0].forEach((el, i) => {
        
        if(true){
            if(true){
                let td = document.createElement("th")
                td.appendChild(document.createTextNode(el))
                tr.appendChild(td)
            }
        }
        
    })
    document.getElementById("listaAgendamento").appendChild(tr); 
       
    data.forEach((element, ii) => {
        if(ii){
            tr = document.createElement("tr")
            element.forEach((el, iii) => {
                if(true){
                    if(true){
                        let td = document.createElement("td")
                        let tex = el
                        if(true){
                            if(iii == 2 || iii == 3)tex = el.slice(0, 5)
                            else if(iii == 1)tex = el.slice(8, 10) + "/" + el.slice(5, 7) + '/' + el.slice(2, 4)
                            else if(iii == 11)if(el != '')tex = '*'
                        }
                        td.appendChild(document.createTextNode(tex))
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
                let txt = "paraUrl(\"agendamento.html?id=" + element[0] + "&voltar=cliente.html?id=" + getUrlVars()["id"] + "\")"
                console.log('txt = ' + txt)
                att.value = txt
                tr.setAttributeNode(att)
            }
            
            document.getElementById("listaAgendamento").appendChild(tr); 
        }
    }); 
    
})