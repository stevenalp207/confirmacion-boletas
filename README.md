# Generador de Boletas de Confirmación

Una aplicación web moderna desarrollada con React y Tailwind CSS para generar boletas de confirmación en formato Word (.docx).

## Características

- ✨ Diseño elegante con esquema de colores azul y blanco
- 📝 Formulario completo dividido en secciones:
  - Datos Personales
  - Datos de Bautismo (Libro, Folio, Asiento)
  - Información de Padres
  - Información de Padrinos
- 💾 Almacenamiento automático en localStorage (sin necesidad de base de datos)
- 📄 Generación de documentos Word (.docx) profesionales con texto centrado
- 🎨 Diseño tipo tarjeta moderno y responsivo
- ⚡ Manejo de estado con React Hooks

## Tecnologías Utilizadas

- **React 19**: Framework de JavaScript para la interfaz de usuario
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS 4**: Framework CSS para estilos
- **docx**: Librería para generar documentos Word
- **file-saver**: Para descargar archivos generados

## Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/stevenalp207/confirmacion-boletas.git
cd confirmacion-boletas
```

2. Instalar las dependencias:
```bash
npm install
```

## Uso

### Modo de desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Construir para producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos construidos estarán en el directorio `dist/`.

### Vista previa de producción

Para previsualizar la versión de producción localmente:

```bash
npm run preview
```

## Cómo usar la aplicación

1. **Complete el formulario**: Ingrese todos los datos requeridos en las cuatro secciones
   - Datos Personales (nombre, apellido, fecha y lugar de nacimiento)
   - Datos de Bautismo (libro, folio, asiento, fecha y parroquia)
   - Nombres de los Padres
   - Nombres de los Padrinos

2. **Guardado automático**: Los datos se guardan automáticamente en el navegador mientras escribe

3. **Generar documento**: Haga clic en el botón "Generar Boleta en Word" para crear y descargar el documento .docx

4. **Documento generado**: El archivo Word se descargará automáticamente con un nombre basado en el nombre y apellido ingresados

## Estructura del proyecto

```
confirmacion-boletas/
├── public/          # Archivos estáticos
├── src/
│   ├── App.jsx      # Componente principal con toda la lógica
│   ├── main.jsx     # Punto de entrada de React
│   └── index.css    # Estilos globales con Tailwind
├── index.html       # Template HTML
├── package.json     # Dependencias y scripts
├── tailwind.config.js  # Configuración de Tailwind
├── postcss.config.js   # Configuración de PostCSS
└── vite.config.js   # Configuración de Vite
```

## Comandos disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la versión de producción
npm run lint     # Ejecuta el linter ESLint
```

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
