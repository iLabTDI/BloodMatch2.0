// routes/index.ts
import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Se encarga de guardar las rutas
const PATH_ROUTER = `${__dirname}`;

// Función para limpiar el nombre del archivo (rutas)
const cleanFileName = (fileName: string): string | null => {
    const file = fileName.split(".").shift();
    return file || null;
};

// Función para validar si es un archivo de ruta válido
const isValidRouteFile = (filename: string): boolean => {
    const validExtensions = ['.ts', '.js'];
    const hasValidExtension = validExtensions.some(ext => filename.endsWith(ext));
    const isNotIndex = !filename.startsWith('index');
    const isNotTest = !filename.includes('.test.') && !filename.includes('.spec.');
    
    return hasValidExtension && isNotIndex && isNotTest;
};

// Función para cargar rutas de forma asíncrona
const loadRoutes = async (): Promise<void> => {
        try {
        const files = readdirSync(PATH_ROUTER).filter(isValidRouteFile);
    
        const routePromises = files.map(async (filename) => {
        const cleanName = cleanFileName(filename);
    
        if (!cleanName) {
        console.warn(`⚠️  Nombre de archivo inválido: ${filename}`);
        return;
        }

        try {
        const moduleRouter = await import(`./${cleanName}`);
        
        if (moduleRouter.default) {
            router.use(`/${cleanName}`, moduleRouter.default);
            console.log(`✅ Ruta cargada exitosamente: /${cleanName}`);
        } else {
            console.warn(`⚠️  El módulo ${cleanName} no tiene exportación default`);
            }
        } catch (error) {
            console.error(`❌ Error cargando la ruta ${cleanName}:`, error);
        }
    });

    await Promise.all(routePromises);
    console.log(`🚀 Se cargaron ${files.length} rutas dinámicamente`);
    
    } catch (error) {
        console.error('❌ Error cargando rutas:', error);
    }
};

// Cargar rutas al inicializar
loadRoutes();

export default router;