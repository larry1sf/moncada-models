export const categoriasMook = [
    {
        id: 1,
        documentId: "1",
        title: "Blusas Elegantes",
        slug: "blusas-elegantes",
        description: "Sofisticación y estilo para tus eventos más importantes.",
        image: {
            id: 1,
            documentId: "1",
            url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop"
        },
        products: [{
            id: 1,
            documentId: "1",
            gender: "mujer",
            clothing_type: "casual",
            slug: "blusa-seda-premium",
            name: "Blusa Seda Premium",
            description: "Elegante blusa de seda con detalles en encaje.",
            price: 35000,
            isActive: true,
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Blanco", "Negro", "Rosa", "Azul"],
            texture: null,
            images: [
                {
                    id: 1,
                    documentId: "1",
                    url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop"
                }
            ],
            product_category: {
                id: 1,
                documentId: "1",
                title: "Blusas Elegantes",
                slug: "blusas-elegantes",
                description: "Sofisticación y estilo para tus eventos más importantes.",
                image: {
                    id: 1,
                    documentId: "1",
                    url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop"
                }
            }
        }]
    },
    {
        id: 2,
        documentId: "2",
        title: "Casual Collection",
        slug: "casual",
        description: "Comodidad sin perder el estilo en tu día a día.",
        image: {
            id: 2,
            documentId: "2",
            url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"
        },
        products: []

    },
    {
        id: 3,
        documentId: "3",
        title: "Noche & Gala",
        slug: "noche",
        description: "Deslumbra con nuestra selección de prendas nocturnas.",
        image: {
            id: 3,
            documentId: "3",
            url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop"
        },
        products: []
    }
];

export const productosMook = [
    {
        id: 1,
        documentId: "1",
        slug: "blusa-seda-premium",
        name: "Blusa Seda Premium",
        description: "Elegante blusa de seda con detalles en encaje.",
        price: 35000,
        isActive: true,
        size: ["XS", "S", "M", "L", "XL"],
        color: ["Blanco", "Negro", "Rosa", "Azul"],
        texture: null,
        images: [
            {
                id: 1,
                documentId: "1",
                url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop"
            }
        ],
        gender: "mujer",
        product_type: "casual",
        product_category: {
            id: 1,
            documentId: "1",
            title: "Blusas Elegantes",
            slug: "blusas-elegantes",
            description: "Sofisticación y estilo para tus eventos más importantes.",
            image: {
                id: 1,
                documentId: "1",
                url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop"
            }
        }
    },
    {
        id: 2,
        documentId: "2",
        slug: "vestido-floral",
        name: "Vestido Floral Verano",
        description: "Frescura y color para tus tardes de sol.",
        price: 48000,
        isActive: true,
        size: ["XS", "S", "M", "L"],
        color: ["Rojo", "Verde", "Amarillo", "Azul"],
        texture: null,
        gender: "mujer",
        product_type: "deportiva",
        images: [
            {
                id: 2,
                documentId: "2",
                url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"
            }
        ],
        product_category: {
            id: 2,
            documentId: "2",
            title: "Casual Collection",
            slug: "casual",
            description: "Comodidad sin perder el estilo en tu día a día.",
            image: {
                id: 2,
                documentId: "2",
                url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"
            }
        }
    },
    {
        id: 3,
        documentId: "3",
        slug: "pantalon-sastre",
        name: "Pantalón Sastre Gris",
        description: "Corte impecable para un look profesional.",
        price: 52000,
        isActive: true,
        size: ["S", "M", "L", "XL", "XXL"],
        color: ["Gris", "Negro", "Azul marino"],
        texture: null,
        images: [
            {
                id: 3,
                documentId: "3",
                url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop"
            }
        ],
        gender: "mujer",
        product_type: "formal",
        product_category: {
            id: 3,
            documentId: "3",
            title: "Noche & Gala",
            slug: "noche",
            description: "Deslumbra con nuestra selección de prendas nocturnas.",
            image: {
                id: 3,
                documentId: "3",
                url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop"
            }
        }
    }
];
