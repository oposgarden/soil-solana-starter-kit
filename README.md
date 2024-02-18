<img src="https://github.com/johnanthos/solana-starter-kit/assets/97734034/d1b7b200-38cf-4b05-95f0-929be8d72d1f" alt="Soil" style="max-width:512px;" />

# Soil - Solana Starter Kit

This is a template starter for any Solana project that requires authentication with signature and storage of user's information. The goal is to allow anyone that requires authentication, user persistence and database management in its project to bootstrap it and get going fast.

_Note: depending on this project's interest, it may grow and morph into different tools and use-cases._

It uses:

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth](https://next-auth.js.org/)
- [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter)
- [Tailwind](https://tailwindcss.com/)

## Getting Started

1. Create a `.env` file based on `.env.example`
2. Create a local or remote database and set its credentials on the newly created `.env` file
3. Change `NEXTAUTH_SECRET` on the `.env` file to a secure random value of your choice
4. Install dependencies: `yarn install`
5. Run migrations: `yarn migrate:dev`
6. Start the project and have fun: `yarn dev`

## Deployment

This project can be deployed on [Vercel](https://vercel.com/) as is by configuring the environment variables on the project created and use a database provider such as [Supabase](https://supabase.com/).

Environment variables required:

| Name            | Description                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| DATABASE_URL    | Database url for connection with the format `postgresql://[user]:[password]@127.0.0.1:5432/[database-name]` |
| NEXTAUTH_URL    | Not required if you're deploying to Vercel since it's automatically added                                   |
| NEXTAUTH_SECRET | You can use `openssl rand -base64 32` or https://generate-secret.vercel.app/32 to generate a random value.  |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
