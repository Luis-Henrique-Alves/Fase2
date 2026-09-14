const IAuthService = require('./interfaces/auth.service.interface');
const { generateToken } = require('../utils/jwt');

const {
    AppError
} = require('../middlewares/error-handler');

const bcrypt = require('bcryptjs'); 

class AuthService extends IAuthService {

  constructor(
        userRepository
    ) {

        super();

        this.userRepository = userRepository;

    }

   async login(userName, password){
      const user = await this.userRepository.findByUserName(userName);
   
      if (!user) {
         throw new AppError('Usuário ou senha inválidos.');
      }

      if (!user.usuarioAtivo) {
         throw new AppError('Usuário inativo.');
      }
      
      const passwordIsValid = await bcrypt.compare(
                                            password,
                                            user.password,
                                            );

       if (!passwordIsValid) {
          throw new AppError('Usuário ou senha inválidos.');
       }

         const tokenPayload = {
                                idUsuario: user.idUsuario,
                                idPessoa: user.idPessoa,
                                userName: user.userName,
                                tipoUsuario: user.codigoTipoPessoa
                              };

         const accessToken = generateToken(tokenPayload);

       return {accessToken};
   }

}

module.exports = AuthService;