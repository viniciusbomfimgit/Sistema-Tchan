const socket = io('http://localhost:2000')

socket.on('employeeList', data => {
    document.getElementById("listaColaboradores").innerHTML = ''
    console.log('colab list')
    console.log(data)

    data.forEach((element, ii) => {
        var tr = document.createElement("tr")
        element.forEach((el, i) => {
            if(window.location.href.includes("lista-colaboradores.html")){
                let td = document.createElement("td")
                if(!ii)td = document.createElement("th")
                if(el == null)td.appendChild(document.createTextNode(''))
                else td.appendChild(document.createTextNode(el))
                tr.appendChild(td)
            }
        })

        if(ii){
        
/*
       var tr = document.createElement("tr")
       data[0].forEach((el, i) => {
           
           if(window.location.href.includes("lista-colaboradores.html")){
               if(true){
                   let td = document.createElement("th")
                   td.appendChild(document.createTextNode(el))
                   tr.appendChild(td)
               }
           }
           document.getElementById("listaColaboradores").appendChild(tr); 
       })
       document.getElementById("listaColaboradores").appendChild(tr); 
   
        data.reverse().forEach((element, ii) => {
            if(ii == data.length -1){
                return true;
            }
            tr = document.createElement("tr")
            element.forEach((el, i) => {
                if(window.location.href.includes("lista-colaboradores.html")){
                    if(true){
                        let td = document.createElement("td")
                        if(el == null)td.appendChild(document.createTextNode(''))
                        else td.appendChild(document.createTextNode(el))
                        tr.appendChild(td)
                    }
                }
            })
   
           if(true){            
            */
            //criar atributo id
            let att = document.createAttribute('id')
            att.value = element[0]
            tr.setAttributeNode(att)

            //criar atributo onclick
            att = document.createAttribute('onclick')
            att.value = "paraColaborador(this.id)"
            tr.setAttributeNode(att)
        }
        document.getElementById("listaColaboradores").appendChild(tr); 
    });
})
