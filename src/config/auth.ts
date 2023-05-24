// Neste arquivo a gente vai isolar as informações de cada usuário como o "secret" que a gente utiliza tanto no "ensureAuthenticate" que é um middleware como tambem vamos utilizar no "AuthenticateUserUseCase", o tempo de expiração do token tambem, vamos fazer isso por questões de organização.
// Vamos também ter informações do nosso refreshToken
export default {
    secret_token: "cfe275e5908b5650488e0b0342c2d6cq",
    expires_in_token: "15m",
    secret_refresh_token: "125c41faf66e2c351bff02def3b22cab",
    expires_in_refresh_token: "30d",
    expires_refresh_token_days: 30,
};
// 1 - Repare que neste arquivo eu não coloquei um nome para essa váriavel exportada para que eu consiga somente acessar através de "auth.elemento que quero pegar"
