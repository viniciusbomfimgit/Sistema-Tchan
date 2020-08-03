const socket = io('http://localhost:2000')
socket.on('bookingList', data => {
    console.log(data)
    /*
    data.forEach((element, ii) => {
        var tr = document.createElement("tr")
        element.forEach((el, iii) => {
            let td = document.createElement("td")
            if(!ii)td = document.createElement("th")
            let tex = el
            if(ii){
                if(iii == 2 || iii == 3)tex = el.slice(0, 5)
                else if(iii == 1)tex = el.slice(8, 10) + "/" + el.slice(5, 7) + '/' + el.slice(0, 4)
                else if(iii == 11)if(el != '')tex = '*'
            }
            td.appendChild(document.createTextNode(tex))
            tr.appendChild(td)
        })

        if(ii){
            */

    var tr = document.createElement("tr")
    data[0].forEach((el, i) => {
        
        if(true){
            if(true){
                let td = document.createElement("th")
                if(i == 6)td.appendChild(document.createTextNode('Servicos'))
                else td.appendChild(document.createTextNode(el))

                if(i < 7 || i > 10)tr.appendChild(td)
            }
        }
        
    })
    document.getElementById("listaAgendamento").appendChild(tr); 
       
    data.reverse().forEach((element, ii) => {
        if(ii == data.length -1){
            return true;
        }
        tr = document.createElement("tr")
        element.forEach((el, iii) => {
            if(true){
                if(true){
                    let td = document.createElement("td")
                    let tex = el
                    if(true){
                        
                        if(iii == 2 || iii == 3)tex = el.slice(0, 5)
                        else if(iii == 1)tex = el.slice(8, 10) + "/" + el.slice(5, 7) + '/' + el.slice(2, 4)
                        else if(iii == 11){if(el != '')tex = '*'}
                        else if(iii == 6){
                            
                            for(let iiii = 7; iiii < 11; iiii++){
                                console.log(data[ii][iiii])
                                if(data[ii][iiii] != '')tex = tex + '; ' + data[ii][iiii]
                            }
                        }
                    }
                    td.appendChild(document.createTextNode(tex))
                    if(iii < 7 || iii > 10)tr.appendChild(td)
                }
            }
        })
        if(true){            

            //let td = document.createElement("button")
            
            //criar atributo id
            let att = document.createAttribute('id')
            att.value = element[0]
            tr.setAttributeNode(att)
            
            //criar atributo onclick
            /*
            att = document.createAttribute('onclick')
            att.value = "paraAgendamento(this.id)"
            td.setAttributeNode(att)
            */
            //criar atributo onclick
            att = document.createAttribute('onclick')
            let txt = "paraUrl(\"agendamento.html?id=" + element[0] + "&voltar=lista-agendamentos.html\")"
            //let txt = "paraUrl(\"agendamento.html?id=" + element[0] + "&voltar=lista-agendamentos.html?id=\")"
            console.log('txt = ' + txt)
            att.value = txt
            tr.setAttributeNode(att)
        }
        document.getElementById("listaAgendamento").appendChild(tr); 
    }); 
})

function paraBuscaAgendamento(){
    let b = document.getElementById('busca')
    location.replace("http://127.0.0.1:5500/public/html/busca-agendamento.html?busca=" + b.value)
}