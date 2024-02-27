## Airbnb Clone 
This project is built with NextJS 14, TypeScript, Next-Auth, MongoDB, Prima, TailwindCSS, Cloudinary. 
The sole purpose of this project is to explore the features of NextJS 14 and doing some UI practise. For state management I have used Zustand. To host the application I have used MongoDB Atlas, Vercel and Cloudinary services. 

## Live Demo
[`Airbnb on mehedihasan.pro`](https://airbnb.mehedihasan.pro)

## Getting Started

Before going for development, you need to setup 4 things.
- Setup MongoDB Atlas account and create database using free cluster. [https://account.mongodb.com/account/login]
- Setup Cloudinary account and create a unsigned preset. [https://console.cloudinary.com/]
- Setup Google Cloud Managemnet Console for API & Services -> Credentials [https://console.cloud.google.com/apis/credentials]
- Setup New OAuth App from Github Settings->Developer Settings [https://github.com/settings/developers]

After finishing above tasks, setup env file with proper secret IDs & keys and Database URL:

```bash
cp .env.copy .env
```
After finishing above tasks, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


