# Generador de Boletas de Confirmación

Una aplicación web moderna y elegante desarrollada con React y Tailwind CSS para automatizar la generación de boletas de confirmación parroquiales en formato Word (.docx).

## Características

- ✨ **Diseño Clean & Professional**: Esquema de colores institucional con azules profundos, blancos y grises suaves
- 🎨 **UI Moderna**: Componentes inspirados en Shadcn/ui con bordes redondeados, sombras sutiles y tipografía Inter
- 📝 **Formulario Completo**: Dividido en secciones lógicas:
  - Datos de la Parroquia (Diócesis)
  - Datos del Confirmando (Nombre, Apellido, Identificación, Fecha y Lugar de Nacimiento)
  - Datos de Bautismo (Libro, Folio, Asiento, Fecha y Parroquia)
  - Información de Padres (Nombres e Identificaciones)
  - Información de Padrinos (Nombres e Identificaciones)
- 👁️ **Previsualización en Vivo**: Vista previa que muestra cómo se verá la boleta final antes de descargar
- 💾 **Persistencia Local**: Almacenamiento automático en localStorage (sin necesidad de base de datos)
- 📄 **Documentos Profesionales**: Generación de archivos Word (.docx) con formato oficial:
  - Encabezado con nombre de la parroquia y diócesis
  - Título centrado "BOLETA DE CONFIRMACIÓN 2025"
  - Secciones organizadas con bordes decorativos
  - Pie de página con firma del párroco y fecha de emisión
- 🔒 **Seguridad**: Sanitización de nombres de archivo y validación de entrada
- 📱 **Diseño Responsivo**: Adaptado para dispositivos móviles y escritorio

## Tecnologías Utilizadas

- **React 19**: Framework de JavaScript para la interfaz de usuario
- **Vite**: Herramienta de construcción rápida y moderna
- **Tailwind CSS 4**: Framework CSS para estilos con utilidades
- **Inter Font**: Tipografía moderna de Google Fonts
- **docx**: Librería para generar documentos Word con formato profesional
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

1. **Complete el formulario**: Ingrese todos los datos requeridos en las cinco secciones:
   - **Datos de la Parroquia**: Nombre de la diócesis
   - **Datos del Confirmando**: Nombre, apellido, identificación, fecha y lugar de nacimiento
   - **Datos de Bautismo**: Libro, folio, asiento, fecha y parroquia de bautismo
   - **Padres**: Nombres completos e identificaciones del padre y la madre
   - **Padrinos**: Nombres completos e identificaciones del padrino y la madrina

2. **Guardado automático**: Los datos se guardan automáticamente en el navegador mientras escribe

3. **Previsualización**: Revise la vista previa de la boleta en la parte inferior del formulario

4. **Generar documento**: Haga clic en el botón "Generar Boleta en Word" para crear y descargar el documento .docx

5. **Documento generado**: El archivo Word se descargará automáticamente con un nombre basado en el nombre y apellido ingresados (ej: `boleta-confirmacion-Maria-Elena-Garcia-Rodriguez.docx`)

## Formato del Documento Word

El documento generado incluye:

- **Encabezado**: 
  - Nombre de la parroquia: "PARROQUIA INMACULADA CONCEPCIÓN"
  - Diócesis (personalizable)
  - Bordes decorativos
  
- **Título Principal**: "BOLETA DE CONFIRMACIÓN 2025" (centrado y en negrita)

- **Secciones de Datos**: 
  - Datos del Confirmando (con identificación)
  - Datos de Bautismo (libro, folio, asiento, fecha y parroquia)
  - Datos de los Padres (nombres e identificaciones)
  - Datos de los Padrinos (nombres e identificaciones)

- **Pie de Página**:
  - Fecha de emisión (formato largo: "15 de enero de 2026")
  - Línea para firma del párroco
  - Nombre de la parroquia

## Estructura del proyecto

```
confirmacion-boletas/
├── public/          # Archivos estáticos
│   └── vite.svg     # Ícono de Vite
├── src/
│   ├── App.jsx      # Componente principal con toda la lógica
│   ├── main.jsx     # Punto de entrada de React
│   ├── index.css    # Estilos globales con Tailwind e Inter font
│   └── assets/      # Recursos adicionales
├── index.html       # Template HTML con Inter font
├── package.json     # Dependencias y scripts
├── postcss.config.js   # Configuración de PostCSS
├── vite.config.js   # Configuración de Vite
└── eslint.config.js # Configuración de ESLint
```

## Comandos disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la versión de producción
npm run lint     # Ejecuta el linter ESLint
```

## Características de Seguridad

- Sanitización de nombres de archivo para prevenir inyección de código
- Manejo seguro de caracteres especiales en español (á, é, í, ó, ú, ñ)
- Sin dependencias de bases de datos externas
- Almacenamiento local en el navegador del usuario
- Sin vulnerabilidades detectadas en el análisis de CodeQL

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
