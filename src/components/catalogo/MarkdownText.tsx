'use client';

/**
 * MarkdownText — renderiza texto markdown con estilo Tailwind LIVIC.
 *
 * Soporta:
 *  - Negritas, cursivas
 *  - Listas con bullets (`-` o `*`) y numeradas (`1.`)
 *  - Links (auto-detect URLs via remark-gfm)
 *  - Saltos de línea (single \n se respeta como <br>, double \n = párrafo nuevo)
 *  - Encabezados (##, ###)
 *  - Citas (>)
 *  - Tablas (remark-gfm)
 *
 * Uso típico:
 *   <MarkdownText source={apartment.descripcionLarga} />
 *
 * Para tamaño compacto usar `compact` (text-sm).
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  source: string | undefined | null;
  /** Aplica text-sm en vez del default text-base. */
  compact?: boolean;
}

export default function MarkdownText({ source, compact = false }: Props) {
  if (!source?.trim()) return null;

  const textCls = compact ? 'text-sm' : 'text-base';

  return (
    <div className={`prose prose-sm max-w-none ${textCls} text-gray-700 leading-relaxed`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Estilo de párrafo: margen entre párrafos, hereda color
          p: ({ children }) => (
            <p className='text-gray-600 leading-relaxed mb-3 last:mb-0'>{children}</p>
          ),
          // Listas con bullets propios + indent
          ul: ({ children }) => <ul className='list-disc list-outside ml-5 mb-3 space-y-1'>{children}</ul>,
          ol: ({ children }) => <ol className='list-decimal list-outside ml-5 mb-3 space-y-1'>{children}</ol>,
          li: ({ children }) => <li className='text-gray-600 leading-relaxed'>{children}</li>,
          // Headings dentro de descripciones (poco frecuente pero soportado)
          h1: ({ children }) => <h3 className='text-lg font-bold text-gray-900 mt-4 mb-2'>{children}</h3>,
          h2: ({ children }) => <h4 className='text-base font-bold text-gray-900 mt-3 mb-2'>{children}</h4>,
          h3: ({ children }) => <h5 className='text-sm font-bold text-gray-900 mt-3 mb-1'>{children}</h5>,
          // Negritas / cursivas
          strong: ({ children }) => <strong className='font-semibold text-gray-900'>{children}</strong>,
          em: ({ children }) => <em className='italic text-gray-700'>{children}</em>,
          // Citas
          blockquote: ({ children }) => (
            <blockquote className='border-l-4 border-livic-pink/40 pl-4 italic text-gray-600 my-3'>
              {children}
            </blockquote>
          ),
          // Links con color de marca y target blank por defecto si es externo
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className='text-livic-pink hover:text-livic-purple underline underline-offset-2'
              >
                {children}
              </a>
            );
          },
          // hr para separadores
          hr: () => <hr className='my-4 border-gray-200' />,
          // tablas (con remark-gfm)
          table: ({ children }) => (
            <div className='overflow-x-auto my-3'>
              <table className='w-full text-sm border-collapse'>{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className='border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-900'>
              {children}
            </th>
          ),
          td: ({ children }) => <td className='border border-gray-200 px-3 py-2 text-gray-700'>{children}</td>,
          // code inline + bloque
          code: ({ children, className }) => {
            const isBlock = className?.startsWith('language-');
            if (isBlock) {
              return (
                <pre className='bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-xs'>
                  <code>{children}</code>
                </pre>
              );
            }
            return <code className='bg-gray-100 text-livic-purple px-1.5 py-0.5 rounded text-xs font-mono'>{children}</code>;
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
