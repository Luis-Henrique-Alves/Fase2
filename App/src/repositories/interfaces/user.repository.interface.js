class IUserRepository {

    findByUserName() {
        throw new Error(
            'Método de buscar usuário por nome deve ser implementado'
        );
    }
}

module.exports = IUserRepository;