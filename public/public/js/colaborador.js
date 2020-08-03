const socket = io('http://localhost:2000')

socket.on('feedback', data => {
    let text = data[0]
    let todo = data[1]
    alert(text)
    console.log('feedbakc ' + text)
    if(todo != 0){
        document.getElementById("salvar").hidden = true
        document.getElementById("editar").hidden = false
    }
})

socket.on('employeeData', data => {
    console.log('dta ' + data)
    employeeForm.forEach((emp, i) => {
        console.log('emp ' + emp)
        if(i){
            document.getElementById(emp).value = data[i]
            document.getElementById(emp).readOnly = true
        }
    })
})

function agendar(){
    let id = getUrlVars()["id"]
}


socket.on('bookingList', data => {
    console.log(data)

    data.forEach((element, ii) => {
        var tr = document.createElement("tr")
        element.forEach((el, iii) => {
            let td = document.createElement("td")
            let tex = el
            if(!ii){
                td = document.createElement("th")
                if(tex == null)td.appendChild(document.createTextNode(''))
                else td.appendChild(document.createTextNode(tex))
                tr.appendChild(td)
            }
            
            if(ii && (iii < 12)){
                if(iii == 2 || iii == 3)tex = el.slice(0, 5)
                else if(iii == 1)tex = el.slice(8, 10) + "/" + el.slice(5, 7) + '/' + el.slice(2, 4)
                td.appendChild(document.createTextNode(tex))
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
            
            att.value = "paraUrl(\"agendamento.html?id=" + element[0] + "&voltar=colaborador.html?id=" + getUrlVars()["id"] + "\")"
            tr.setAttributeNode(att)
        }
        document.getElementById("listaAgendamento").appendChild(tr); 
    }); 
})