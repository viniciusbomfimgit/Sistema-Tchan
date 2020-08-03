exports.queryCallback = (err, results, fields) => {
    if (err) {
        console.log('Erro: ', err.message);
        return;
    }
    console.log('Operação executada!');
};

exports.endCallback = (err) => {
    if (err) {
        console.log('Erro: ', err.message);
        return;
    }
    console.log('Conexão finalizada!');
};


