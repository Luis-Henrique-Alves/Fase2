const {
    services
} = require('../config/container');

const {
    authService
} = services;

class AuthController{
  
async login(req, res) {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: 'Usuário e senha são obrigatórios.',
      });
    }

    const result = await authService.login(
      userName,
      password,
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}

}

module.exports = new AuthController();