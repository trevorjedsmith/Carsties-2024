import NextAuth, { Profile } from "next-auth"
import { OIDCConfig } from "next-auth/providers"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        DuendeIDS6Provider({
            id: 'id-server',
            clientId: "nextApp",
            clientSecret: "secret",
            issuer: "http://localhost:5001",
            authorization: { params: { scope: 'openid profile auctionApp' } },
            idToken: true
        } as OIDCConfig<Omit<Profile, 'username'>>),
    ],
    callbacks: {
        async session({ session, token }) {
            console.log(token);
            if (token) {
                session.user.username = token.username;
                session.accessToken = token.accessToken;
            }
            return session
        },
        async jwt({ token, profile, account }) {
            console.log('Token..')
            console.log(token)
            console.log('Profile..')
            console.log(profile)
            console.log('Account..')
            console.log(account)
            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.username = profile.username;
            }
            return token;
        },
        async authorized({auth}) {
            return !!auth
        },
    }
})