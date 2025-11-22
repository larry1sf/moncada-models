const diccionario: Record<string, string> = {
    "Rojo": "Red",
    "Celeste": "LightBlue",
    "Negro": "Black",
    "Blanco": "White",
    "Rosado": "Pink"
};

/**
 * Traduce una palabra usando el diccionario manual
 * @param texto - Texto en español
 * @returns Traducción al inglés si existe, sino mensaje por defecto
 */
function traducir(texto: string): string {
    return diccionario[texto] ?? "sin traducción";
}

export { traducir };