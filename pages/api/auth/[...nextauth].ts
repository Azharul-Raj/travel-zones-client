import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/app/libs/prismadb';
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GithubProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credential){
                if(!credential?.email||!credential.password){
                    throw new Error("Invalid Credentials")
                }
                const user= await prisma.user.findUnique({
                    where:{
                        email:credential.email
                    }
                })
                if(!user || !user.hashedPassword){
                    throw new Error("Invalid Credentials")
                }
                const isCorrectPassword=await bcrypt.compare(credential.password,user.hashedPassword)
                if(!isCorrectPassword){
                    throw new Error("Invalid Credentials")
                }
                return user;
            },            
        })
    ],
    pages:{
        signIn:"/"
    },
    debug:process.env.NODE_ENV==='development',
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions);