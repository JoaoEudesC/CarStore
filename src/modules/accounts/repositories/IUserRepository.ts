interface ICreateUserDTO{
    name:string;
    username:string;
    password:string;
    email:string;
    driver_license:string
}









interface IUsersRepository{
    create(data:ICreateUserDTO):Promise<void>;


}

export {IUsersRepository , ICreateUserDTO}





//Os 'isAdmin' não é o usuário que passa para a gente, por isso a gente não vai utilizar aqui