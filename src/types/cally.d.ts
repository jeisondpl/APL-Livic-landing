import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'calendar-range': React.HTMLAttributes<HTMLElement> & {
        value?: string
        min?: string
        max?: string
        months?: string | number
        locale?: string
        'first-day-of-week'?: string | number
        onchange?: (e: Event) => void
      }
      'calendar-month': React.HTMLAttributes<HTMLElement> & {
        offset?: string | number
      }
    }
  }
}
