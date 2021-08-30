export type Notifier = Readonly<{
  delay?: number
  description: string
  eventKey?: string
  id?: HtmlElement['id']
  ref: Element | HTMLElement | null
  title?: string
}>