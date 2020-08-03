const socket = io('http://localhost:2000')
let dbook = [] //agendamento marcado
let serv = [] 
let inbet = []
let abook 
let slist = [], total = 0.0, tempo = 0, horarios = []
let idcol //id do colaborador
let currcol, currdata
let firstTime = true

socket.on('feedback', async data => {
    let text = data[0]
    let todo = data[1]
    
    //console.log('feedbakc ' + text)
    const res = await alert(text);
    if(todo != 0){
        //window.setTimeout(() => {onclickfn();}, 500)   
        onclickfn();
    }
  })
  

function updateServiceList(id, n, checked){
    console.log('update services =-------------')
    console.log(JSON.stringify(slist))
    console.log('id ' + id)
    console.log('checked '+ checked)
    let t = n.slice(0,5)
    let val = parseInt(n.slice(5, n.length))
    //console.log('t ' + t)
    //console.log('val ' + val)
    
    if(checked && !slist.includes(parseInt(id))){
        slist.push(parseInt(id))
        tempo += time2min(t)
        total  += val       
    }else{
        console.log('slist ' + JSON.stringify(slist))
        
        if(slist.includes(parseInt(id)))slist.splice(slist.indexOf(parseInt(id)), 1)
        
        else console.log( ' noooooooooooooooooo')
        console.log('slist ' + slist)
        tempo -= time2min(t)
        total -= val    
    }

    console.log('slist = ' + slist)
    console.log('gggggggggggggggggggggggggggggggggggggggggg')

    document.getElementById('tempo').innerHTML = "Duração estimada: " + tempo + "min."
    document.getElementById('total').innerHTML = "Valor estimado: R$"+total + "."
}

socket.on('aBook', async d => {
   abook = d
    console.log(abook)
    document.getElementById('data').value = d[1]
    /*
    document.getElementById('cliente').value = d[4]
    document.getElementById('data').value = d[1]
    document.getElementById('colab').value = d[5]
    let serv = ''
    for(let i = 0; i < 5; i++){
        if(d[6 + i] != null)serv = serv + ', ' + d[6+i]
    }
    document.getElementById('servicos').value = serv
    document.getElementById('inicio').value = d[2]
    document.getElementById('termino').value = d[3]
    */

    for(let i = 6; i < 11; i++){
        if(d[i] !== null)serv.push(d[i])
    }
    
    socket.emit('getServiceList')
    slist = []
    total = 0.0
    tempo = 0
    document.getElementById('tempo').hidden = false
    document.getElementById('total').hidden = false
    document.querySelector('.main-container__content__form__right__observations').hidden = false
    document.querySelector('.main-container__content__form__left__services-selection').hidden = false
    document.getElementById('observacoes').value = d[11]
    
    socket.emit('getBookingData', d[1])
})

socket.on('bookingList', data => {
    dbook = data;
    //console.log('booking list ' + data)
    document.getElementById("listaAgendamentos").innerHTML = ''

    data.forEach(f => {
        //console.log(JSON.stringify(f))

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
                div4.setAttributeNode(att)

                att = document.createAttribute('onClick')
                att.value = 'selectTime(this.id)'
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

        if(f[1] == abook[5])idcol = f[0]
        
    })
    changeThisBookTimes();
})

function changeDate(){
    console.log('\nchange date-----------------------------------')
    
    console.log('horarios ' + horarios)
    if(horarios.length < 1){
        socket.emit('getBookingData', document.getElementById('data').value)
    }else{
        alert('Para mudar a data do agendamento, desmarque os horários primeiro')
        document.getElementById('data').value = abook[1]
    }
    
    console.log('end date-----------------------------------\n')
}

function changeThisBookTimes(){
    //console.log(abook[2].slice(0, 5) + idcol.toString())
    let inicio, fim
    console.log('change this book horarios ' + horarios)
    if(firstTime){
        inicio = document.getElementById(abook[2].slice(0, 5) + idcol.toString());
        console.log('fim casdfasefes ' + tMinus30(abook[3].slice(0, 5)))
        fim = document.getElementById(tMinus30(abook[3].slice(0, 5)) + idcol.toString());
        firstTime = false;

        currcol = idcol;
        currdata = document.getElementById('data').value;

        horarios.push(idcol.toString())
        horarios.push(abook[2].slice(0, 5))
        
        horarios.push(tMinus30(abook[3].slice(0, 5)))
        console.log('horarios sdsfasdfsadf' + horarios)
        firstTime = false;

        inicio.className = 'livre selecionado'
        inicio.setAttribute('onClick',  'selectTime(this.id)')

        fim.className = 'livre selecionado'
        fim.setAttribute('onClick',  'selectTime(this.id)')

        console.log('ddddddddddddddddddddddddddd')
    
        console.log(dbook[idcol-1])
        let toremove = getInBetween(horarios[1], horarios[2])
        toremove.push(horarios[1])
        toremove.push(horarios[2])
        console.log('horarios ' + horarios)
        console.log('to remove ' + toremove)
        toremove.forEach(r => {
            if(dbook[idcol-1].includes(r))dbook[idcol-1].splice(dbook[idcol-1].indexOf(r), 1)
    
        })
        console.log(dbook[idcol-1])
    
        console.log('horariostttttttttttttttttttttttttt' + horarios)
        inbet = getInBetween(abook[2].slice(0, 5), tMinus30(abook[3].slice(0, 5)))
        inbet.forEach(i => {
            //console.log()
           document.getElementById(i + idcol.toString()).className = 'livre inbetween'
        }) 
        firstTime = false
    
    }else{
        let toremove = getInBetween(abook[2].slice(0, 5), abook[3].slice(0, 5))
        toremove.push(abook[2].slice(0, 5))
        toremove.push(abook[3].slice(0, 5))
        console.log('toremove ' + toremove)
        toremove.forEach(t => {
            document.getElementById(t + idcol.toString()).className = 'livre';
        })

        if(document.getElementById('data').value == abook[1]){
            if(horarios.length == 2){
                inicio = document.getElementById(horarios[1] + currcol.toString())
                inicio.className = 'livre selecionado'
            }else if(horarios.length == 3){
                inicio = document.getElementById(horarios[1] + currcol.toString())
                inicio.className = 'livre selecionado'
                inicio = document.getElementById(horarios[2] + currcol.toString())
                inicio.className = 'livre selecionado'
                inbet = getInBetween(horarios[1], horarios[2])
                inbet.forEach(i => {
                    //console.log()
                   document.getElementById(i + currcol.toString()).className = 'livre inbetween'
                }) 
            }
        }
    }

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

    if(document.getElementById(str).className  == 'livre' && horarios[0] == colab){
        document.getElementById(str).className  = 'livre selecionado'
        horarios.push(t)
    }else{
        
        document.getElementById(str).className  = 'livre'
        if(horarios.includes(t))horarios.splice(horarios.indexOf(t), 1)
        if(horarios.length == 1){
            document.getElementById('cadastrar').hidden = true
            horarios = []
        }
    }

    console.log('horarios' + horarios)
}
*/

function paraOrigem(or){
    console.log(or)
   location.replace('http://127.0.0.1:5500/public/html/' + or)
}

function alterarAgendamento(){
    console.log('alterar agendamentoooooooooooooooooooooooooooooooo')
    console.log('currcol ' + currcol)
    console.log('horarios ' + horarios)
    if(horarios.length == 0){
        alert('Nenhum horario selecionado')
    }else if(slist.length == 0){
        alert('Nenhum servico selecionado')
    }else{
        let resultado = window.prompt("Digite a sua senha");
        let stuff
        if(horarios.length == 3)stuff = [getUrlVars()['id'], currcol, currdata, horarios[1], tPlus30(horarios[2]), slist, total, document.getElementById('observacoes').value]
        else stuff = [getUrlVars()['id'], currcol, currdata, horarios[1], tPlus30(horarios[1]), slist, total, document.getElementById('observacoes').value]
        stuff.push(resultado)
        console.log('stufff' + JSON.stringify(stuff))
        socket.emit('alteraAgendamento', stuff)
    }
}

console.log('\n\n\n\\n')
console.log(getUrlVars()["voltar"].replace('cliente.html?id=', ''))
console.log('\n\n\n\\n')

function selectTime(str){
    console.log('selecting time ---------------------------------------------')
    t = str.slice(0, 5)
    let colab = str.slice(5, str.length)
    currcol = colab
    console.log('time selected: ' + t)
    console.log('colab selected: ' + colab)
    console.log('horarios ' + horarios)
    if (Array.isArray(horarios)) {
        //document.getElementById('cadastrar').hidden = false
        
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
    
    console.log('Check interval ----------------------------------')
    console.log('times checkinterval = ' + times)
    console.log('colab = ' + colab)
    console.log('dbook colab = ' + dbook[colab-1])
    
    let fflag = false
    times.forEach(t => {
        console.log(t)
        console.log(dbook[colab-1].includes(t))
        if(dbook[colab-1].includes(t))fflag = true
    })
    console.log('fflag ' + fflag)
    console.log('End check interval ----------------------------------\n\n')
    if(fflag)return false
    else return true
}

function getInBetween(h1, h2){
    if(h1 > h2){
        let ht = h1;
        h1 = h2;
        h2 = ht;
    }

    let times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
    //console.log(times.slice(times.indexOf(h1)+1, times.indexOf(h2)))
    return times.slice(times.indexOf(h1)+1, times.indexOf(h2))
}

socket.on('serviceList', data => {
    //console.log('services ' + JSON.stringify(data))
    document.getElementById('listaServicos').innerHTML = ""

    

    data.forEach((s,ii) => {
        //console.log('s ', s)
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
            
            if(serv.includes(s[1])){
                //deixar checkado
                att = document.createAttribute('checked')
                //att.value = 'checked'
                td.setAttributeNode(att)
                //document.getElementById(s[1]).checked = true;
                //slist.push(id)
                updateServiceList(s[0], s[3] + s[4], 'checked')
            }
            //criar atributo onchanges
            att = document.createAttribute('onChange')
            att.value = "updateServiceList(this.id, this.name, this.checked)"
            td.setAttributeNode(att)
            
            tr.appendChild(td)
        }
        document.getElementById("listaServicos").appendChild(tr); 
    })    
    
})
function time2min(t){
    let h = 60* parseInt(t.slice(0, 2))
    let m = parseInt(t.slice(3, 5))

    //console.log('t2m ', h+m)
    return h+m
}

function onclickfn(){
    if(getUrlVars()["voltar"])location.replace("http://127.0.0.1:5500/public/html/" + getUrlVars()["voltar"])
    else paraListaAgendamentos()
}

function deletarAgendamento(){
    let pass = window.prompt("Digite a sua senha para deletar o agendamento");
    socket.emit('deletaAgendamento', [getUrlVars()['id'], pass])
}

console.log('Minus -------------------')
tMinus30('08:00')
console.log('Plus --------------------')
tPlus30('08:00')
function tMinus30(t){
    //console.log(t.substring(3,4))
    let ret = '';
    if(t.substring(3,4) == '0'){
        let h = parseInt(t.substring(0, 2))
        console.log('h ' + h)
        h = h - 1
        if(h < 10){ret = '0'; console.log('menor que 10');}
        ret = ret + h.toString() + ':30'
    }else{
        ret = t.substring(0,3) + '00'
    }
    console.log('t final ' + ret)
    return ret
}

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