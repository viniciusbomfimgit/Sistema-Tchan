const config = { host: 'localhost', user: 'Seu usuário', password: 'Sua senha', database: 'projeto_tchan' };
const clientForm = ['id_cliente', 'nome_cliente', 'cpf_cliente', 'telefone_cliente', 'email_cliente']
const serviceForm = ['id_servico', 'nome_servico', 'descricao', "duracao", "valor"]
const employeeForm = ['id_colab', 'nome_colab', 'cpf_colab', 'telefone_colab', 'rua_colab', 'numero_casa_colab', 'complemento_colab', 'cep_colab', 'cidade_colab', 'estado_colab']
const bookForm = ['id_agendamento', 'id_cliente', 'id_colab', 'id_array', 'data_agendamento', 'hora_inicio', 'hora_termino', 'preco_total', 'observacao']
const arrayForm = ['id_array', 'id_servico_01', 'id_servico_02', 'id_servico_03', 'id_servico_04', 'id_servico_05']

module.exports = {
    config: config,
    clientForm: clientForm,
    serviceForm: serviceForm,
    employeeForm: employeeForm,
    bookForm: bookForm,
    arrayForm: arrayForm
};