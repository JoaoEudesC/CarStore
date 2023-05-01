import { users } from "../entities/User";

interface ICreateUserDTO{
    name:string;
    password:string;
    email:string;
    driver_license:string;
    id?:string;
    avatar?:string;
}









interface IUsersRepository{
    create(data:ICreateUserDTO):Promise<void>;
    findByEmail(email:string):Promise<users>;
    findById(id:string):Promise<users>


}

export {IUsersRepository , ICreateUserDTO}





//Os 'isAdmin' não é o usuário que passa para a gente, por isso a gente não vai utilizar aqui