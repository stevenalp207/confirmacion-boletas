# Generador de Boletas de Confirmación

Una aplicación web moderna y elegante desarrollada con React y Tailwind CSS para automatizar la generación de boletas de confirmación parroquiales en formato Word (.docx) usando plantillas personalizables.

## Características

- ✨ **Diseño Clean & Professional**: Esquema de colores institucional con azules profundos, blancos y grises suaves
- 🎨 **UI Moderna**: Componentes inspirados en Shadcn/ui con bordes redondeados, sombras sutiles y tipografía Inter
- 📝 **Formulario Completo**: Dividido en secciones lógicas:
  - Datos del Confirmando (Nombre completo e Identificación)
  - Información de Bautismo (Libro, Folio, Asiento, Fecha y Parroquia)
  - Información de Padres (Nombres e Identificaciones)
  - Información de Padrinos (Nombre, Identificación y Parroquia)
- 👁️ **Previsualización en Vivo**: Vista previa que muestra los datos antes de generar el documento
- 💾 **Persistencia Local**: Almacenamiento automático en localStorage (sin necesidad de base de datos)
- 📄 **Sistema de Plantillas**: Usa plantillas Word personalizables con variables:
  - Mapeo automático de datos del formulario a variables de la plantilla
  - Soporte para plantillas profesionales con formato institucional
  - Fácil personalización según las necesidades de cada parroquia
- 🔒 **Seguridad**: Validación de entrada y manejo seguro de archivos
- 📱 **Diseño Responsivo**: Adaptado para dispositivos móviles y escritorio

## Tecnologías Utilizadas

- **React 19**: Framework de JavaScript para la interfaz de usuario
- **Vite**: Herramienta de construcción rápida y moderna
- **Tailwind CSS 4**: Framework CSS para estilos con utilidades
- **Inter Font**: Tipografía moderna de Google Fonts
- **docxtemplater**: Librería para llenar plantillas Word con datos del formulario
- **pizzip**: Manejo de archivos ZIP para procesar documentos .docx
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

3. **IMPORTANTE**: Agregar su plantilla Word:
   - Coloque su archivo de plantilla `template.docx` en la carpeta `public/`
   - La plantilla debe contener las variables especificadas (ver sección "Variables de la Plantilla")
   - Consulte `public/TEMPLATE_README.md` para más detalles sobre cómo crear la plantilla

## Variables de la Plantilla

El sistema mapea los campos del formulario a estas variables en el archivo `template.docx`:

| Variable | Descripción |
|----------|-------------|
| `{nombre}` | Nombre completo del confirmando |
| `{id-catequizando}` | Cédula o documento de identidad del confirmando |
| `{parroquia}` | Nombre de la parroquia de bautismo |
| `{libro}` | Número del libro de bautismo |
| `{folio}` | Número del folio de bautismo |
| `{asiento}` | Número del asiento de bautismo |
| `{fechabautismo}` | Fecha de bautismo |
| `{nombre-madre}` | Nombre completo de la madre |
| `{id-madre}` | Cédula o documento de identidad de la madre |
| `{nombre-padre}` | Nombre completo del padre |
| `{id-padre}` | Cédula o documento de identidad del padre |
| `{nombre-padrino}` | Nombre completo del padrino |
| `{id-padrino}` | Cédula o documento de identidad del padrino |
| `{parroquia-padrino}` | Nombre de la parroquia del padrino |

### Ejemplo de Plantilla

Cree un documento Word con el siguiente contenido (puede personalizar el formato):

```
PARROQUIA INMACULADA CONCEPCIÓN
BOLETA DE CONFIRMACIÓN 2025

DATOS DEL CONFIRMANDO
Nombre: {nombre}
Identificación: {id-catequizando}

DATOS DE BAUTISMO
Libro: {libro} | Folio: {folio} | Asiento: {asiento}
Fecha de Bautismo: {fechabautismo}
Parroquia: {parroquia}

INFORMACIÓN DE LOS PADRES
Padre: {nombre-padre} (ID: {id-padre})
Madre: {nombre-madre} (ID: {id-madre})

INFORMACIÓN DE LOS PADRINOS
Padrino: {nombre-padrino} (ID: {id-padrino})
Parroquia del Padrino: {parroquia-padrino}

_____________________________
Firma del Párroco
```

Guarde este archivo como `template.docx` en la carpeta `public/`.

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

1. **Preparar la plantilla**:
   - Asegúrese de tener el archivo `template.docx` en la carpeta `public/`
   - La plantilla debe contener las variables listadas arriba entre llaves `{}`

2. **Complete el formulario**: Ingrese todos los datos requeridos en las cuatro secciones:
   - **Datos del Confirmando**: Nombre completo e identificación
   - **Información de Bautismo**: Libro, folio, asiento, fecha y parroquia de bautismo
   - **Información de Padres**: Nombres completos e identificaciones del padre y la madre
   - **Información de Padrinos**: Nombre, identificación y parroquia del padrino

3. **Guardado automático**: Los datos se guardan automáticamente en el navegador mientras escribe

4. **Previsualización**: Revise la vista previa de los datos en la parte inferior del formulario

5. **Generar documento**: Haga clic en el botón "Generar Boleta en Word" para crear y descargar el documento .docx

6. **Documento generado**: El archivo Word se descargará automáticamente como `Boleta_Confirmacion_2025.docx` con todos los campos de la plantilla rellenados con los datos ingresados

## Formato del Documento Word

El documento generado usa su plantilla personalizada `template.docx` y rellena automáticamente todas las variables con los datos del formulario. El formato, estilo, colores, fuentes y estructura dependen completamente de su plantilla.

### Ventajas del sistema de plantillas:

- **Personalización total**: Defina el diseño exacto que necesita su parroquia
- **Formato profesional**: Use todos los elementos de Word (tablas, imágenes, encabezados, pies de página, etc.)
- **Fácil actualización**: Cambie la plantilla sin modificar el código de la aplicación
- **Consistencia**: Mantenga el mismo formato en todos los documentos generados

## Estructura del proyecto

```
confirmacion-boletas/
├── public/              # Archivos estáticos
│   ├── vite.svg         # Ícono de Vite
│   ├── template.docx    # Plantilla Word (debe ser agregada por el usuario)
│   └── TEMPLATE_README.md  # Instrucciones para crear la plantilla
├── src/
│   ├── App.jsx          # Componente principal con formulario y lógica
│   ├── main.jsx         # Punto de entrada de React
│   ├── index.css        # Estilos globales con Tailwind e Inter font
│   └── assets/          # Recursos adicionales
├── index.html           # Template HTML con Inter font
├── package.json         # Dependencias y scripts
├── postcss.config.js    # Configuración de PostCSS
├── vite.config.js       # Configuración de Vite
└── eslint.config.js     # Configuración de ESLint
```

## Comandos disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la versión de producción
npm run lint     # Ejecuta el linter ESLint
```

## Características de Seguridad

- Validación de entrada de datos
- Manejo seguro de archivos Word mediante docxtemplater y pizzip
- Sin dependencias de bases de datos externas
- Almacenamiento local seguro en el navegador del usuario
- Error handling robusto para casos de plantilla faltante o corrupta

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
