import { useState, useEffect } from 'react'
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'

function App() {
  // Cargar datos desde localStorage al inicializar el estado
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('confirmacionBoletasData')
    if (savedData) {
      return JSON.parse(savedData)
    }
    return {
      // Datos Personales
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      lugarNacimiento: '',
      
      // Bautismo
      libroBautismo: '',
      folioBautismo: '',
      asientoBautismo: '',
      fechaBautismo: '',
      parroquiaBautismo: '',
      
      // Padres
      nombrePadre: '',
      nombreMadre: '',
      
      // Padrinos
      nombrePadrino: '',
      nombreMadrina: '',
    }
  })

  // Guardar en localStorage cuando cambian los datos
  useEffect(() => {
    localStorage.setItem('confirmacionBoletasData', JSON.stringify(formData))
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateDocument = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'BOLETA DE CONFIRMACIÓN',
                bold: true,
                size: 32,
                color: '1e40af',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({
                text: '___________________________',
                size: 24,
              }),
            ],
          }),
          
          // Datos Personales
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 200 },
            children: [
              new TextRun({
                text: 'DATOS PERSONALES',
                bold: true,
                size: 28,
                color: '2563eb',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Nombre completo: ${formData.nombre} ${formData.apellido}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Fecha de nacimiento: ${formData.fechaNacimiento}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `Lugar de nacimiento: ${formData.lugarNacimiento}`,
                size: 24,
              }),
            ],
          }),
          
          // Datos de Bautismo
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 200 },
            children: [
              new TextRun({
                text: 'DATOS DE BAUTISMO',
                bold: true,
                size: 28,
                color: '2563eb',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Libro: ${formData.libroBautismo} | Folio: ${formData.folioBautismo} | Asiento: ${formData.asientoBautismo}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Fecha de bautismo: ${formData.fechaBautismo}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `Parroquia: ${formData.parroquiaBautismo}`,
                size: 24,
              }),
            ],
          }),
          
          // Padres
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 200 },
            children: [
              new TextRun({
                text: 'PADRES',
                bold: true,
                size: 28,
                color: '2563eb',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Padre: ${formData.nombrePadre}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `Madre: ${formData.nombreMadre}`,
                size: 24,
              }),
            ],
          }),
          
          // Padrinos
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 200 },
            children: [
              new TextRun({
                text: 'PADRINOS',
                bold: true,
                size: 28,
                color: '2563eb',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Padrino: ${formData.nombrePadrino}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `Madrina: ${formData.nombreMadrina}`,
                size: 24,
              }),
            ],
          }),
          
          // Pie de página
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 600 },
            children: [
              new TextRun({
                text: '___________________________',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: `Fecha de emisión: ${new Date().toLocaleDateString('es-ES')}`,
                size: 20,
                italics: true,
              }),
            ],
          }),
        ],
      }],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `boleta-confirmacion-${formData.nombre}-${formData.apellido}.docx`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Generador de Boletas de Confirmación
          </h1>
          <p className="text-blue-600">
            Complete el formulario para generar su boleta en formato Word
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Datos Personales */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Datos Personales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Juan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lugar de Nacimiento
                </label>
                <input
                  type="text"
                  name="lugarNacimiento"
                  value={formData.lugarNacimiento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Ciudad, País"
                />
              </div>
            </div>
          </div>

          {/* Datos de Bautismo */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Datos de Bautismo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Libro
                </label>
                <input
                  type="text"
                  name="libroBautismo"
                  value={formData.libroBautismo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Ej: 15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Folio
                </label>
                <input
                  type="text"
                  name="folioBautismo"
                  value={formData.folioBautismo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Ej: 234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asiento
                </label>
                <input
                  type="text"
                  name="asientoBautismo"
                  value={formData.asientoBautismo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Ej: 56"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Bautismo
                </label>
                <input
                  type="date"
                  name="fechaBautismo"
                  value={formData.fechaBautismo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parroquia
                </label>
                <input
                  type="text"
                  name="parroquiaBautismo"
                  value={formData.parroquiaBautismo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre de la parroquia"
                />
              </div>
            </div>
          </div>

          {/* Padres */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Padres
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Padre
                </label>
                <input
                  type="text"
                  name="nombrePadre"
                  value={formData.nombrePadre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre completo del padre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Madre
                </label>
                <input
                  type="text"
                  name="nombreMadre"
                  value={formData.nombreMadre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre completo de la madre"
                />
              </div>
            </div>
          </div>

          {/* Padrinos */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Padrinos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Padrino
                </label>
                <input
                  type="text"
                  name="nombrePadrino"
                  value={formData.nombrePadrino}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre completo del padrino"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Madrina
                </label>
                <input
                  type="text"
                  name="nombreMadrina"
                  value={formData.nombreMadrina}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre completo de la madrina"
                />
              </div>
            </div>
          </div>

          {/* Botón Generar */}
          <div className="flex justify-center pt-6">
            <button
              onClick={generateDocument}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200 flex items-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Generar Boleta en Word</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Los datos se guardan automáticamente en su navegador</p>
        </div>
      </div>
    </div>
  )
}

export default App
