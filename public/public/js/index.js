const socket = io('http://localhost:2000')

function listaAgendamento(){
    let d = document.getElementById('data').value
    socket.emit('getBookingData', d)
}

socket.on('bookingList', data => {
    console.log('booking list ' + data)
    document.getElementById("listaAgendamentos").innerHTML = ''

    data.forEach(f => {
        console.log(JSON.stringify(f))

        let div, div2, div3, div4, att
        div = document.createElement('div')
        att = document.createAttribute('class')
        att.value = 'subcontainer'
        div.setAttributeNode(att)

        div2 = document.createElement('div')
        att = document.createAttribute('class')
        att.value = 'subsubcontainer'
        div2.setAttributeNode(att)

        att = document.createAttribute('id')
        att.value = f[1]
        div2.setAttributeNode(att)
        div2.appendChild(document.createTextNode(f[1]))

        div.appendChild(div2)

        div3 = document.createElement('div')
        att = document.createAttribute('class')
        att.value = 'subsubcontainer'
        div3.setAttributeNode(att)

        let times = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
        times.forEach(t => {
            div4 = document.createElement('div')
            att = document.createAttribute('class')
            if(f.includes(t)){
                //console.log('includes ' + t)
                att.value = 'reservado'
            }else{
                att.value = 'livre'
            }
            div4.setAttributeNode(att)
            div4.appendChild(document.createTextNode(t))
            div3.appendChild(div4)
        })

        div.appendChild(div3)
        
        document.getElementById('listaAgendamentos').appendChild(div)
    })
})
/*
document.getElementById("listaClientes").innerHTML = ''
    console.log('client list')

    data.forEach(element => {
        var tr = document.createElement("tr")
        element.forEach((el, i) => {
            if(window.location.href.includes("buscacliente.html") || window.location.href.includes("listacliente.html")){
                if(i < 2){
                    let td = document.createElement("td")
                    td.appendChild(document.createTextNode(el))
                    tr.appendChild(td)
                }
            }else{
                let td = document.createElement("td")
                td.appendChild(document.createTextNode(el))
                tr.appendChild(td)
            }
        })

        let td = document.createElement("button")

        //criar atributo id
        let att = document.createAttribute('id')
        att.value = element[0]
        td.setAttributeNode(att)

        //criar atributo onclick
        att = document.createAttribute('onclick')
        att.value = "paraCliente(this.id)"
        td.setAttributeNode(att)

        td.appendChild(document.createTextNode('Ver'))
        tr.appendChild(td)

        document.getElementById("listaClientes").appendChild(tr); 
    });

<div id = "f1" class="subcontainer">
            <div class="subsubcontainer">Funcionario</div>
            <div class="subsubcontainer">
                <div class = "item">8:00</div>
                <div class = "item">8:30</div>
                <div class = "item">9:00</div>
                <div class = "item">9:30</div>
                <div class = "item">10:00</div>
                <div class = "item">10:30</div>
                <div class = "item">11:00</div>
                <div class = "item">11:30</div>
                <div class = "item">12:00</div>
                <div class = "item">12:30</div>
                <div class = "item">13:00</div>
                <div class = "item">13:30</div>
                <div class = "item">14:00</div>
                <div class = "item">14:30</div>
                <div class = "item">15:00</div>
                <div class = "item">15:30</div>
                <div class = "item">16:00</div>
                <div class = "item">16:30</div>
            </div>
        </div>
        */