import { TSort } from "@/types/typos";
import { IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp } from "@tabler/icons-react";

// STRAPI
export const STRAPI_URL =
  process.env.API_URL || "http://localhost:1337";
export const STRAPI_TOKEN = process.env.API_TOKEN || "some-default-token";

// TURSO
export const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
export const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

export const SORT_OPTIONS: TSort = {
  NOMBRE_ASC: "name-asc",
  NOMBRE_DESC: "name-desc",
  MAS_POPULAR: "products-desc",
};

export const SOCIAL_MEDIA_LINKS = {
  INSTAGRAM: "https://www.instagram.com/moncada_models/",
  WHATSAPP: "https://wa.me/573024512965",
  FACEBOOK: "https://www.facebook.com/profile.php?id=100086904401162"
};

export const socials = [
  {
    name: "Instagram",
    url: SOCIAL_MEDIA_LINKS.INSTAGRAM,
    icon: IconBrandInstagram
  },
  {
    name: "Facebook",
    url: SOCIAL_MEDIA_LINKS.FACEBOOK,
    icon: IconBrandFacebook
  },
  {
    name: "WhatsApp",
    url: SOCIAL_MEDIA_LINKS.WHATSAPP,
    icon: IconBrandWhatsapp
  }
];

export const siteInfo = {
  contact: {
    phone: "+57 302 451 2965",
    phoneClean: "573024512965",
    email: "moncada.models@gmail.com",
    address: "Cra 16 #35-26, Centro",
    city: "Bucaramanga, Santander",
    hours: "Lunes a Sábado, 9:00am - 7:00pm",
    whatsappUrl: SOCIAL_MEDIA_LINKS.WHATSAPP,
    googleMapsUrl(iframe: boolean) {
      return iframe
        ? "https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1768683443715!5m2!1ses-419!2sco!6m8!1m7!1seEPnNRfLxvR35fzlkk9d_A!2m2!1d7.120231701771339!2d-73.1255793301304!3f342.1510171415493!4f5.801823934491125!5f0.7820865974627469"
        : "https://www.google.com/maps/place/Pasaje+Comercial+Centro+Plaza/@7.1202317,-73.1255793,3a,75y,342.15h,95.8t/data=!3m7!1e1!3m5!1seEPnNRfLxvR35fzlkk9d_A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.801823934491125%26panoid%3DeEPnNRfLxvR35fzlkk9d_A%26yaw%3D342.1510171415493!7i16384!8i8192!4m6!3m5!1s0x8e683fd7cf7888e1:0xfa2b25c21dec77b7!8m2!3d7.1203771!4d-73.1254841!16s%2Fm%2F0274w7m?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  faqs: [
    {
      question: "¿Tienen tienda física?",
      answer: "¡Sí! Nuestra boutique principal está ubicada en Bucaramanga. Puedes encontrarnos en la Cra 16 #35-26, Centro. Te esperamos para brindarte una asesoría personalizada."
    },
    {
      question: "¿Cómo puedo realizar un pedido?",
      answer: "Es muy sencillo. Explora nuestras colecciones, selecciona las prendas que te enamoren y Agregalas al carrito. Una ves realices el pedido nuestro equipo verificará disponibilidad y te guiará personalmente en el proceso de compra."
    },
    {
      question: "¿Realizan envíos a todo el país?",
      answer: "Sí, llevamos el estilo Moncada a cada rincón de Colombia. Trabajamos con transportadoras seguras como (interrapidisimo o servientrega) para garantizar que tu prenda llegue perfecta a tus manos."
    },
    {
      question: "¿Cuáles son los métodos de pago?",
      answer: "Aceptamos transferencias virtuales (Nequi) y pagos en efectivo en nuestra boutique física o mediante envio contra entrega."
    }
  ]
};
