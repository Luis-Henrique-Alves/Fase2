class IAuthService {
    async login() {
        throw new Error(
            'Método login não implementado'
        );
    }
}

module.exports = IAuthService;