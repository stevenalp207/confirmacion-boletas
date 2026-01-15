# Template Word (.docx) Required

## Important: You need to add your template file here!

The application expects a Word document template named `template.docx` in this folder.

### Required Template Variables

Your Word template must include the following variables (placeholders) that will be replaced with the form data:

- `{nombre}` - Full name of the confirmando
- `{id-catequizando}` - Identification of the confirmando
- `{parroquia}` - Baptism parish name
- `{libro}` - Baptism book number
- `{folio}` - Baptism folio number
- `{asiento}` - Baptism record number
- `{fechabautismo}` - Baptism date
- `{nombre-madre}` - Mother's full name
- `{id-madre}` - Mother's identification
- `{nombre-padre}` - Father's full name
- `{id-padre}` - Father's identification
- `{nombre-padrino}` - Godfather's full name
- `{id-padrino}` - Godfather's identification
- `{parroquia-padrino}` - Godfather's parish

### How to create the template

1. Create a Word document with your desired layout and formatting
2. Insert the variables above (with curly braces) where you want the data to appear
3. Save the document as `template.docx`
4. Place it in this `public/` folder
5. The application will automatically use it to generate filled documents

### Example Template Content

```
PARROQUIA INMACULADA CONCEPCIÓN
BOLETA DE CONFIRMACIÓN 2025

Nombre del Confirmando: {nombre}
Identificación: {id-catequizando}

DATOS DE BAUTISMO
Libro: {libro} | Folio: {folio} | Asiento: {asiento}
Fecha: {fechabautismo}
Parroquia: {parroquia}

INFORMACIÓN DE LOS PADRES
Padre: {nombre-padre} (ID: {id-padre})
Madre: {nombre-madre} (ID: {id-madre})

INFORMACIÓN DE LOS PADRINOS
Padrino: {nombre-padrino} (ID: {id-padrino})
Parroquia del Padrino: {parroquia-padrino}
```

Save your actual template with proper formatting and styling as `template.docx` in this directory.
