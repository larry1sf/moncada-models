/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly STRAPI_HOST: string
    readonly STRAPI_API_TOKEN: string
    readonly VERCEL_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
