class IPessoaRepository {

    async buscarPorId(idPessoa) {

        throw new Error(
            'Método buscarPorId deve ser implementado'
        );

    }

}

module.exports = IPessoaRepository;