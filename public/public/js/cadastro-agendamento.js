const socket = io('http://localhost:2000')
window.onload = function () {
    document.getElementById('voltar').cliente = getUrlVars()["id"].toString()
    console.log('aaaa')
};

socket.on('feedback', data => {
    let text = data[0]
    let ok = data[1]
    alert(text)
    console.log('feedbakc ' + text)
    if(ok){
        //voltar();
        document.getElementById('voltar').click()
    }
})


let inbet = [], slist = [], total = 0.0, tempo = 0, horarios = []
let lastTime = ''
function passo2(){
    console.log('\nchange date-----------------------------------')
    
    console.log('horarios ' + horarios)
    if(horarios.length < 1){
        document.getElementById('instrucao').innerHTML = "Selecione os servicos que o cliente deseja"
        socket.emit('getServiceList')
        slist = []
        total = 0.0
        tempo = 0
        document.getElementById('tempo').hidden = false
        document.getElementById('total').hidden = false
        document.querySelector('.main-container__content__form__right__observations').hidden = false
        document.querySelector('.main-container__content__form__left__services-selection').hidden = false
        
        let d = document.getElementById('data').value
        lastTime = d
        socket.emit('getBookingData', d)
    }else{
        alert('Para mudar a data do agendamento, desmarque os horários primeiro')
        document.getElementById('data').value = lastTime
    }
    
    console.log('end date-----------------------------------\n')
}
/*
function selectTime(str){
    t = str.slice(0, 5)
    colab = str.slice(5, str.length)
    console.log('time selected: ' + t)
    console.log('colab selected: ' + colab)

    if (Array.isArray(horarios)) {
        document.getElementById('cadastrar').hidden = false
        
        if(!horarios.length)horarios.push(colab)
    }

    console.log('dbook' + dbook)
    if(document.getElementById(str).className  == 'livre' && horarios[0] == colab && horarios.length < 3){
        inbet = getInBetween(horarios[1], t)
        if(horarios.length == 1 || checkInterval(inbet, colab)){
            console.log('ok')
            horarios.push(t)
            document.getElementById(str).className  = 'livre selecionado'
            if(horarios.length == 3){
                inbet.forEach(i => {
                    console.log('id = ', i + colab.toString())
                    document.getElementById(i + colab.toString()).className  = 'livre inbetween'
                })
            }
        }else{}
    }else{
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log('inbet' + inbet)
        inbet.forEach(i => {
            document.getElementById(i + colab.toString()).className  = 'livre'    
        })
        inbet = []
        document.getElementById(str).className  = 'livre'
        if(horarios.includes(t))horarios.splice(horarios.indexOf(t), 1)
        if(horarios.length == 1){
            document.getElementById('cadastrar').hidden = true
            horarios = []
        }
    }

    console.log('horarios' + horarios)
    console.log('bnbbbbbbbbbbbbbbbbbbb')
    
    console.log('inbet' + inbet)
}

*/


function selectTime(str){
    console.log('selecting time ---------------------------------------------')
    t = str.slice(0, 5)
    let colab = str.slice(5, str.length)
    currcol = colab
    console.log('time selected: ' + t)
    console.log('colab selected: ' + colab)
    console.log('horarios ' + horarios)
    if (Array.isArray(horarios)) {
        document.getElementById('cadastrar').style.display = 'flex'
        
        if(!horarios.length)horarios.push(colab)
    }

   

    //console.log('dbook' + dbook)
    
    console.log('horarios ' + horarios)
    if(document.getElementById(str).className  == 'livre' && horarios[0] == colab && horarios.length < 3){
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        inbet = getInBetween(horarios[1], t)
        
        if(horarios.length == 1)inbet = getInBetween(t, t)
        console.log('inbet '+ inbet)
        
        console.log('horarios ' + horarios)
        console.log('checkinterval '+ checkInterval(inbet, colab))
        if(horarios.length != 3 && checkInterval(inbet, colab)){
            console.log('ok')
            currdata = document.getElementById('data').value
            horarios.push(t)
            document.getElementById(str).className  = 'livre selecionado'
            if(horarios.length == 3){
                inbet.forEach(i => {
                    //console.log('id = ', i + colab.toString())
                    document.getElementById(i + colab.toString()).className  = 'livre inbetween'
                })
            }
        }else{inbet = []}
    }else{
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
        if(colab == horarios[0] && horarios.includes(t)){
            console.log('deselect')
            inbet.forEach(i => {
                document.getElementById(i + colab.toString()).className  = 'livre'    
            })
            inbet = []
            //console.log('inbet' + inbet)
            console.log('horaros ' + horarios)
            document.getElementById(str).className  = 'livre'
            if(horarios.includes(t))horarios.splice(horarios.indexOf(t), 1)
            if(horarios.includes(t))horarios.splice(horarios.indexOf(t), 1)
            if(horarios.length == 1){
                //document.getElementById('cadastrar').hidden = true
                horarios = []
            }
        }
        console.log('horaros ' + horarios)
    }

    //console.log('horarios' + horarios)
    //console.log('bnbbbbbbbbbbbbbbbbbbb')
    
    //console.log('inbet' + inbet)
}

function checkInterval(times, colab){
    console.log('----------------------------------')
    console.log('times checkinterval = ' + times)
    console.log('colab = ' + colab)
    console.log('dbook colab = ' + dbook[colab-1])
    let fflag = false
    times.forEach(t => {
        console.log(t)
        console.log(dbook[colab-1].includes(t))
        if(dbook[colab-1].includes(t))fflag = true
    })
    if(fflag)return false
    else return true
}



function getInBetween(h1, h2, i){
    if(h1 > h2){
        let ht = h1;
        h1 = h2;
        h2 = ht;
    }

    let times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
    //console.log(times.slice(times.indexOf(h1)+1, times.indexOf(h2)))
    return times.slice(times.indexOf(h1)+1, times.indexOf(h2))
}


function updateList(id, n, checked){
    console.log('update list -------------------------------')
    console.log('slist ' + slist)
    console.log('id ' + id)
    console.log('checked '+ checked)
    let t = n.slice(0,5)
    let val = parseInt(n.slice(5, n.length))
    console.log('t ' + t)
    console.log('val ' + val)
        
    if(checked && !slist.includes(parseInt(id))){
        slist.push(parseInt(id))
        tempo += time2min(t)
        total  += val       
    }else{
        console.log('slist ' + JSON.stringify(slist))
        
        if(slist.includes(parseInt(id)))slist.splice(slist.indexOf(parseInt(id)), 1)
        tempo -= time2min(t)
        total -= val    
    }
    console.log('slist ' + slist)
    document.getElementById('tempo').innerHTML = "Duração estimada: " + tempo + "min."
    document.getElementById('total').innerHTML = "Valor estimado: R$"+total + "."
}

function time2min(t){
    let h = 60* parseInt(t.slice(0, 2))
    let m = parseInt(t.slice(3, 5))

    console.log('t2m ', h+m)
    return h+m
}


socket.on('serviceList', data => {
    console.log('services ' + JSON.stringify(data))
    document.getElementById('listaServicos').innerHTML = ""

    data.forEach((s,ii) => {
        var tr = document.createElement("tr")        
        s.forEach((el, i) => {
            if(i){
                let td = document.createElement("td")
                if(!ii)td = document.createElement("th")
                td.appendChild(document.createTextNode(el))
                tr.appendChild(td)
            }
        })

        if(ii){
            let td = document.createElement("input")
            
            //criar atributo id
            let att = document.createAttribute('id')
            att.value = s[0]
            td.setAttributeNode(att)
            
            //criar atributo duracao
            att = document.createAttribute('name')
            att.value = s[3]+s[4]
            td.setAttributeNode(att)
            
            //criar atributo valor
            //att = document.createAttribute('valor')
            //att.value = s[4]
            //td.setAttributeNode(att)
            
            //criar type
            att = document.createAttribute('type')
            att.value = 'checkbox'
            td.setAttributeNode(att)
            
            //criar atributo onchanges
            att = document.createAttribute('onChange')
            att.value = "updateList(this.id, this.name, this.checked)"
            td.setAttributeNode(att)
            
            tr.appendChild(td)
        }
        document.getElementById("listaServicos").appendChild(tr); 
    })    
})
function tPlus30(t){
    //console.log(t.substring(3,4))
    if(t.substring(3,4) != '0'){
        let h = parseInt(t.substring(0, 2))
        h = h + 1
        if(h < 10)t = '0'
        else t = ''
        t = t + h.toString() + ':00'
        
    }else{
        t = t.substring(0,3) + '30'
    }
    console.log('t final ' + t)
    return t
}
function cadastrarAgendamento(){
    if(horarios.length == 0){
        alert('Nenhum horario selecionado')
    }else if(slist.length == 0){
        alert('Nenhum servico selecionado')
    }else{
        let resultado = window.prompt("Digite a sua senha");
        let stuff
    
        if(horarios.length == 3)stuff = [getUrlVars()['id'], horarios[0], document.getElementById('data').value, [horarios[1], tPlus30(horarios[2])],slist, total, document.getElementById('observacoes').value, resultado]
        else stuff = [getUrlVars()['id'], horarios[0], document.getElementById('data').value, [horarios[1], tPlus30(horarios[1])],slist, total, document.getElementById('observacoes').value, resultado]

        console.log('stuff ' + JSON.stringify(stuff))
        horarios.push(getUrlVars()['id'])
        console.log('cadadstrar agendamento')
        console.log('horarios' + stuff)   
        socket.emit('newBook', stuff)
    }
}

socket.on('clientList', data => {
    document.getElementById("listaClientes").innerHTML = ''
    console.log('client list')

    data.forEach(element => {
        var tr = document.createElement("tr")
        element.forEach((el, i) => {
            if(window.location.href.includes("busca-cliente.html") || window.location.href.includes("lista-cliente.html")){
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
})
let dbook = []
socket.on('bookingList', data => {
    console.log('booking list ' + data)
    dbook = data
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

        let times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
        times.forEach(t => {
            div4 = document.createElement('div')
            
            att = document.createAttribute('id')
            att.value = t + f[0]
            div4.setAttributeNode(att)

            att = document.createAttribute('class')
            if(f.includes(t)){
                //console.log('includes ' + t)
                att.value = 'reservado'
            }else{
                att.value = 'livre'
                div4.setAttributeNode(att)

                att = document.createAttribute('onClick')
                att.value = 'selectTime(this.id)'
            }
            div4.setAttributeNode(att)
            div4.appendChild(document.createTextNode(t))
            div3.appendChild(div4)
        })

        div.appendChild(div3)
        
        document.getElementById('listaAgendamentos').appendChild(div)
    })
})

// Dropdown seleção de serviços
var on = 0
function ExibirListaServicos() {
    if (!on) {
        document.querySelector('.main-container__content__form__left__services-selection__table').hidden = false;
        on++;
    } else {
        document.querySelector('.main-container__content__form__left__services-selection__table').hidden = true;
        on--;
    }
}