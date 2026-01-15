import { useState, useEffect } from 'react'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'

function App() {
  // Cargar datos desde localStorage al inicializar el estado
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem('confirmacionBoletasData')
      if (savedData) {
        return JSON.parse(savedData)
      }
    } catch (error) {
      console.error('Error loading saved data:', error)
    }
    return {
      // Datos del Confirmando
      nombre: '',
      idCatequizando: '',
      
      // Bautismo
      parroquia: '',
      libro: '',
      folio: '',
      asiento: '',
      fechabautismo: '',
      
      // Padres
      nombreMadre: '',
      idMadre: '',
      nombrePadre: '',
      idPadre: '',
      
      // Padrinos
      nombrePadrino: '',
      idPadrino: '',
      parroquiaPadrino: '',
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
    try {
      // Fetch the template from public folder
      const response = await fetch('/template.docx')
      if (!response.ok) {
        throw new Error('No se pudo cargar la plantilla. Asegúrese de que template.docx existe en la carpeta public/')
      }
      
      // Convert to array buffer
      const arrayBuffer = await response.arrayBuffer()
      
      // Load the template with PizZip
      const zip = new PizZip(arrayBuffer)
      
      // Create docxtemplater instance
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      })
      
      // Map camelCase properties to kebab-case template variables
      const templateData = {
        nombre: formData.nombre,
        'id-catequizando': formData.idCatequizando,
        parroquia: formData.parroquia,
        libro: formData.libro,
        folio: formData.folio,
        asiento: formData.asiento,
        fechabautismo: formData.fechabautismo,
        'nombre-madre': formData.nombreMadre,
        'id-madre': formData.idMadre,
        'nombre-padre': formData.nombrePadre,
        'id-padre': formData.idPadre,
        'nombre-padrino': formData.nombrePadrino,
        'id-padrino': formData.idPadrino,
        'parroquia-padrino': formData.parroquiaPadrino,
      }
      
      // Set the data to fill in the template
      doc.setData(templateData)
      
      // Render the document (replace all tags)
      doc.render()
      
      // Generate the output as a blob
      const blob = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      
      // Download the file
      saveAs(blob, 'Boleta_Confirmacion_2025.docx')
    } catch (error) {
      console.error('Error al generar el documento:', error)
      alert('Error al generar el documento: ' + error.message)
    }
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
          {/* Datos del Confirmando */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Datos del Confirmando
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre completo del confirmando"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identificación
                </label>
                <input
                  type="text"
                  name="idCatequizando"
                  value={formData.idCatequizando}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Cédula o documento de identidad"
                />
              </div>
            </div>
          </div>

          {/* Información de Bautismo */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Información de Bautismo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Libro
                </label>
                <input
                  type="text"
                  name="libro"
                  value={formData.libro}
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
                  name="folio"
                  value={formData.folio}
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
                  name="asiento"
                  value={formData.asiento}
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
                  name="fechabautismo"
                  value={formData.fechabautismo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parroquia de Bautismo
                </label>
                <input
                  type="text"
                  name="parroquia"
                  value={formData.parroquia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre de la parroquia"
                />
              </div>
            </div>
          </div>

          {/* Información de Padres */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Información de Padres
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
                  Identificación del Padre
                </label>
                <input
                  type="text"
                  name="idPadre"
                  value={formData.idPadre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="ID del padre"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identificación de la Madre
                </label>
                <input
                  type="text"
                  name="idMadre"
                  value={formData.idMadre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="ID de la madre"
                />
              </div>
            </div>
          </div>

          {/* Información de Padrinos */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Información de Padrinos
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
                  Identificación del Padrino
                </label>
                <input
                  type="text"
                  name="idPadrino"
                  value={formData.idPadrino}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="ID del padrino"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parroquia del Padrino
                </label>
                <input
                  type="text"
                  name="parroquiaPadrino"
                  value={formData.parroquiaPadrino}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Parroquia del padrino"
                />
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Previsualización de Datos
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-inner">
              <div className="text-center space-y-3">
                <p className="text-lg font-bold text-blue-900">BOLETA DE CONFIRMACIÓN 2025</p>
                <div className="border-t-2 border-blue-300 my-3"></div>
                
                <div className="text-left space-y-2 text-sm mt-4">
                  <p className="font-semibold text-blue-800">Datos del Confirmando:</p>
                  <p className="text-gray-700">
                    {formData.nombre || '[Nombre completo]'}
                  </p>
                  {formData.idCatequizando && <p className="text-gray-600 text-xs">ID: {formData.idCatequizando}</p>}
                  
                  <p className="font-semibold text-blue-800 pt-2">Datos de Bautismo:</p>
                  <p className="text-gray-700 text-xs">
                    Libro: {formData.libro || '[Libro]'} | 
                    Folio: {formData.folio || '[Folio]'} | 
                    Asiento: {formData.asiento || '[Asiento]'}
                  </p>
                  <p className="text-gray-700 text-xs">
                    Fecha: {formData.fechabautismo || '[Fecha de bautismo]'}
                  </p>
                  <p className="text-gray-700 text-xs">
                    Parroquia: {formData.parroquia || '[Parroquia de Bautismo]'}
                  </p>
                  
                  <p className="font-semibold text-blue-800 pt-2">Padres:</p>
                  <p className="text-gray-700 text-xs">
                    Padre: {formData.nombrePadre || '[Nombre del Padre]'} 
                    {formData.idPadre && ` (ID: ${formData.idPadre})`}
                  </p>
                  <p className="text-gray-700 text-xs">
                    Madre: {formData.nombreMadre || '[Nombre de la Madre]'}
                    {formData.idMadre && ` (ID: ${formData.idMadre})`}
                  </p>
                  
                  <p className="font-semibold text-blue-800 pt-2">Padrinos:</p>
                  <p className="text-gray-700 text-xs">
                    Padrino: {formData.nombrePadrino || '[Nombre del Padrino]'}
                    {formData.idPadrino && ` (ID: ${formData.idPadrino})`}
                  </p>
                  {formData.parroquiaPadrino && (
                    <p className="text-gray-700 text-xs">
                      Parroquia del Padrino: {formData.parroquiaPadrino}
                    </p>
                  )}
                </div>
                
                <div className="border-t-2 border-blue-300 my-3"></div>
                <p className="text-xs text-gray-500 italic">
                  Los datos se guardan automáticamente
                </p>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-3 text-center">
              Esta es una vista previa. El documento Word contendrá el formato completo de la plantilla.
            </p>
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
          <p className="text-xs text-gray-500 mt-2">
            Asegúrese de tener el archivo template.docx en la carpeta public/
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
