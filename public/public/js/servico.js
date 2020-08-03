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


socket.on('serviceData', data => {
    document.getElementById('nome_servico').value = data[1]
    document.getElementById('descricao').value = data[2]
    document.getElementById('duracao').value = data[3]
    document.getElementById('valor').value = data[4]

    document.getElementById('nome_servico').readOnly = true
       document.getElementById('descricao').readOnly = true
         document.getElementById('duracao').readOnly = true
           document.getElementById('valor').readOnly = true
    
})