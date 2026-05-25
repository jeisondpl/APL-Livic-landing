import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidad · LIVIC',
  description:
    'Política de tratamiento de datos personales de LIVIC, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.',
}

const LAST_UPDATE = '24 de mayo de 2026'

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-20 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <header>
            <p className="text-xs text-livic-pink uppercase tracking-[0.18em] font-semibold mb-2">
              Documentos legales
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Política de Privacidad y Tratamiento de Datos Personales
            </h1>
            <p className="text-sm text-gray-500 mt-3">Última actualización: {LAST_UPDATE}</p>
          </header>

          <Section title="1. Responsable del tratamiento">
            <p>
              <strong>LIVIC</strong> (operación turística y administración de inmuebles en Santa Marta,
              Magdalena, Colombia) es responsable del tratamiento de los datos personales
              recolectados a través de este sitio web y sus servicios asociados.
            </p>
            <ul>
              <li><strong>Razón social:</strong> LIVIC</li>
              <li><strong>Domicilio:</strong> Santa Marta, Magdalena, Colombia</li>
              <li>
                <strong>Email de contacto para Habeas Data:</strong>{' '}
                <a href="mailto:privacidad@alojateconlivic.com" className="text-livic-pink hover:underline">
                  privacidad@alojateconlivic.com
                </a>
              </li>
            </ul>
          </Section>

          <Section title="2. Datos que recolectamos">
            <p>Cuando enviás una solicitud de cotización en nuestro catálogo, recolectamos:</p>
            <ul>
              <li>Nombre completo.</li>
              <li>Dirección de correo electrónico.</li>
              <li>Número de teléfono (preferentemente WhatsApp).</li>
              <li>
                Datos asociados a tu solicitud: apartamento de interés, fechas de check-in /
                check-out, número de huéspedes.
              </li>
            </ul>
            <p>
              Estos datos son <strong>obligatorios</strong> para procesar tu solicitud. Sin ellos
              no podemos contactarte ni gestionar tu reserva.
            </p>
          </Section>

          <Section title="3. Finalidad del tratamiento">
            <p>Tus datos personales serán tratados con las siguientes finalidades:</p>
            <ul>
              <li>
                <strong>Contacto comercial:</strong> nuestros operadores te contactarán por WhatsApp o
                correo electrónico para coordinar los detalles de tu reserva y resolver dudas.
              </li>
              <li>
                <strong>Gestión de la reserva:</strong> procesar el pago, coordinar el check-in y
                check-out, y proveer información del alojamiento.
              </li>
              <li>
                <strong>Cumplimiento legal:</strong> emitir facturación, cumplir requerimientos de
                autoridades de turismo o tributarias colombianas.
              </li>
              <li>
                <strong>Mejora del servicio:</strong> en forma agregada y anonimizada, para
                estadísticas internas (ocupación, satisfacción).
              </li>
            </ul>
            <p>
              <strong>NO</strong> vendemos ni cedemos tus datos a terceros con fines de marketing.
            </p>
          </Section>

          <Section title="4. Transferencia y transmisión a terceros">
            <p>Tus datos pueden ser compartidos con:</p>
            <ul>
              <li>
                <strong>Operadores LIVIC autorizados</strong> vía WhatsApp Business (Meta Platforms),
                exclusivamente para el contacto comercial relacionado con tu solicitud.
              </li>
              <li>
                <strong>Proveedores de infraestructura tecnológica</strong> (Vercel, Railway, Neon,
                Cloudinary) bajo acuerdos de tratamiento de datos. Estos proveedores actúan como
                encargados del tratamiento, no como responsables.
              </li>
              <li>
                <strong>Autoridades competentes</strong> cuando exista un requerimiento legal.
              </li>
            </ul>
          </Section>

          <Section title="5. Tus derechos (Ley 1581 de 2012)">
            <p>Como titular de los datos, tenés derecho a:</p>
            <ul>
              <li><strong>Conocer</strong> los datos personales que tenemos sobre vos.</li>
              <li>
                <strong>Actualizar y rectificar</strong> tus datos cuando sean inexactos o estén
                incompletos.
              </li>
              <li>
                <strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento.
              </li>
              <li>
                <strong>Revocar la autorización</strong> y/o <strong>solicitar la supresión</strong>{' '}
                del dato cuando no se respeten los principios, derechos y garantías constitucionales y
                legales.
              </li>
              <li>
                <strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio
                (SIC) por infracciones a la Ley 1581 de 2012.
              </li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, escribinos a{' '}
              <a href="mailto:privacidad@alojateconlivic.com" className="text-livic-pink hover:underline">
                privacidad@alojateconlivic.com
              </a>
              . Responderemos en un plazo máximo de <strong>15 días hábiles</strong>.
            </p>
          </Section>

          <Section title="6. Tiempo de retención">
            <p>
              Conservaremos tus datos personales por el tiempo necesario para cumplir con las
              finalidades descritas, salvo que exista obligación legal de conservarlos por más
              tiempo. Las solicitudes de cotización no concretadas se conservan por{' '}
              <strong>1 año</strong>. Las reservas confirmadas se conservan por <strong>5 años</strong>{' '}
              por obligación contable y tributaria.
            </p>
            <p>
              Si solicitás la supresión de tus datos, los borraremos en el plazo legal indicado,
              salvo retención obligatoria.
            </p>
          </Section>

          <Section title="7. Seguridad">
            <p>
              Implementamos medidas técnicas, físicas y administrativas razonables para proteger
              tus datos contra pérdida, acceso no autorizado, alteración o divulgación. Esto
              incluye: cifrado en tránsito (HTTPS), control de acceso por roles, logs de auditoría
              y backups periódicos.
            </p>
          </Section>

          <Section title="8. Cambios a esta política">
            <p>
              Podemos actualizar esta política para reflejar cambios en nuestras prácticas o
              requerimientos legales. La fecha de última actualización aparece al inicio del
              documento. Cambios sustanciales se comunicarán por correo electrónico cuando sea
              posible.
            </p>
          </Section>

          <Section title="9. Marco legal aplicable">
            <p>
              Esta política se rige por la <strong>Ley 1581 de 2012</strong>, el{' '}
              <strong>Decreto 1377 de 2013</strong> y demás normas concordantes de la República de
              Colombia sobre protección de datos personales.
            </p>
          </Section>

          <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
            <Link href="/catalogo" className="text-livic-pink hover:underline">
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-livic-pink [&_a:hover]:underline">
        {children}
      </div>
    </section>
  )
}
