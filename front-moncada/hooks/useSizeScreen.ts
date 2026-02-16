
import { useEffect, useState } from "react";
export function useSizeScreen() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        };

        // Agregar el event listener
        window.addEventListener('resize', handleResize);

        // Ejecutar una vez al montar el componente
        handleResize();

        // Limpiar el event listener al desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return { width }
}