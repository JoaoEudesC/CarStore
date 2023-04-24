//Há certos momentos no typescript, em que nós precisamos subscrever a nossa própria tipagem (Ou seja, criar uma nova) e para que a gente consiga fazer isso, nos termos que criar essa pasta @types , dentro dessa pasta nos passamos "a bibilioteca que a gente quer subscrever, neste caso é o express" e dentro do express criamos esse arquivo, "index.d.ts"
//Neste caso nos queremos passa "User" do request do "ensureAuthenticated.ts", para dentro do request do express , e sem esse arquivo ele não deixa, pq essa tipagem não existe no express.
//Na pasta node_modules temos um arquivo chamado "@types , e dentro dele temos um "index.d.ts" onde estão todas as tipagens" entãoa  a gente subscrever esse arquivo, mas a gente vai adiocinar nas tipagens que já existe isso que a gente precisa.



declare namespace Express{
    export interface Request{
        user:{
            id:string;
        };
    }
}


//Com a adição desse campo, rapidamente o erro do "ensureAuthenticate.ts" nas linhas 39 e 40 , rapidamente desapareceram.


