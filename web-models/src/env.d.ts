/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly STRAPI_HOST: string
    readonly STRAPI_API_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
