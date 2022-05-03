import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // se retornar true significa que o login deu certo, senão deu errado :)

      const { email } = user;

      try {
        await fauna.query(
          // se não existir um usuário no qual da um "match" pelo index user_by_email configurado no fauna ...
          // Case fold ignora maiusculas e minusculas
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            // se não existir, cria um user novo no banco
            q.Create(
              // nome da collection que queremos inserir
              q.Collection("users"),
              { data: { email } }
            ),
            // senão apenas busca o dado do usuário
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        );

        return true;
      } catch(err) {
        console.log(err)
        return false;
      }
    },
  },
});
