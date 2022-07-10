import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "mario | luigi | yoshi | wario" },
        password: {  label: "Password (leave blank)", type: "password" }
      },
      //secret: process.env.NEXTAUTH_SECRET,
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const users = [
          { id: 1, name: "mario", email: "mario@example.com" },
          { id: 1, name: "luigi", email: "luigi@example.com" },
          { id: 1, name: "wario", email: "wario@example.com" },
          { id: 1, name: "yoshi", email: "yoshi@example.com" }
        ]
        for (let user in users) {
          // Any object returned will be saved in `user` property of the JWT
          if (credentials.username === users[user].name) {
            console.log("coucou")
            return users[user]
          }
        } 
      }
    })
  ],
  pages: {
    //signIn: '/auth/signin'
  }
})