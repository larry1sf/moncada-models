# 👗 Tienda de Blusas - Astro Ecommerce

Una tienda en línea moderna, hermosa y adorable construida con **Astro**, diseñada para vender blusas de moda con una interfaz intuitiva y atractiva.

## ✨ Características

- 🎨 **Diseño hermoso y adorable** - Paleta de colores suave y acogedora (crema, azul cielo, coral)
- 📱 **Responsive** - Se adapta perfectamente a dispositivos móviles
- ⚡ **Súper rápido** - Construido con Astro para máximo rendimiento
- 🛍️ **Gestión de productos** - Sistema completo de catálogo de blusas
- 💬 **Newsletter** - Suscripción a noticias y ofertas exclusivas
- 🎯 **Filtro de categorías** - Busca productos fácilmente
- 💳 **Carrito de compras** - Interfaz amigable para el usuario

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone <your-repo-url>
cd astro-ecommerce

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ProductCard.astro      # Tarjeta de producto
│   ├── ProductList.astro      # Lista de productos
│   ├── CategoryFilter.astro   # Filtro de categorías
│   ├── Newsletter.astro       # Suscripción a newsletter
│   ├── Cart.astro             # Carrito de compras
│   └── Welcome.astro          # Sección de bienvenida
├── layouts/             # Layouts principales
│   ├── BaseLayout.astro       # Layout base con header/footer
│   └── Layout.astro           # Layout raíz
├── pages/               # Rutas de la aplicación
│   └── index.astro            # Página principal
├── data/                # Datos estáticos
│   └── products.ts            # Catálogo de productos
├── styles/              # Estilos globales
│   └── global.css             # Estilos CSS globales
└── assets/              # Imágenes y recursos
```

## 🎨 Paleta de Colores

- **Crema**: `#faf9f7` - Fondo principal
- **Azul Cielo**: `#87ceeb` - Acentos
- **Coral**: `#FF7F50` - Énfasis
- **Tonos Tierra**: `#a89080`, `#c4a47a` - Detalles

## 🛠️ Personalización

### Agregar nuevos productos

Edita `src/data/products.ts`:

```typescript
{
  id: 'blusa-id',
  name: 'Nombre de la Blusa',
  description: 'Descripción detallada',
  price: 49.99,
  image: 'url-de-imagen',
  inStock: true,
  colors: ['Color 1', 'Color 2'],
  rating: 4.8,
}
```

### Modificar estilos

- Estilos globales: `src/styles/global.css`
- Estilos por componente: En el bloque `<style>` de cada archivo `.astro`

## 📦 Tecnologías

- **Astro 5+** - Framework web estático
- **TypeScript** - Tipado seguro
- **CSS 3** - Estilos modernos con gradientes y animaciones
- **Poppins Font** - Tipografía moderna

## 🚢 Deployment

### Build para producción

```bash
pnpm run build
```

### Preview local

```bash
pnpm run preview
```

### Desplegar en:
- **Netlify** - Conecta tu repositorio directo
- **Vercel** - Despliegue automático
- **GitHub Pages** - Hospedaje estático gratuito

## 📝 Características Futuras

- [ ] Sistema de autenticación
- [ ] Carrito persistente
- [ ] Integración de pagos (Stripe, PayPal)
- [ ] Página de detalles del producto
- [ ] Sistema de reseñas
- [ ] Wishlist/Favoritos
- [ ] Administrador de tienda
- [ ] Analytics

## 💡 Tips de Desarrollo

- Usa `pnpm` para mejor rendimiento
- Los componentes Astro son solo HTML + CSS/JS
- Los estilos son scoped por defecto (no hay conflictos)
- Aprovecha la renderización estática para mejor SEO

## 📧 Contacto y Soporte

¿Preguntas o sugerencias? ¡Abre un issue en el repositorio!

---

Hecho con 💝 y Astro ✨
