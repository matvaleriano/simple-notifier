import type { Notifier } from './types'
import { createElement } from './utils'

const removeNotifier = (container: HTMLDivElement): void => {
  document.body.removeChild(container)
}

const createNotifierBody = ({ description, container, title }: Pick<Notifier, 'description' | 'title'> & { container: HTMLDivElement}): void => {
  const body = createElement({
    className: 'notifier-body',
    parentElement: container,
    tagName: 'section',
  })

  if(title) {
    createElement({
      className: 'notifier-title',
      parentElement: body,
      tagName: 'h6',
      textContent: title,
    })
  }

  createElement({
    className: 'notifier-description',
    parentElement: body,
    tagName: 'div',
    innerHTML: description
  })
}

const createNotifierContainer = ({ delay, description, id, title }: Pick<Notifier, 'delay' | 'description' | 'id' | 'title'>) => {
  const container = document.createElement('div')
  if(id) {
    container.id = id
    container.setAttribute('data-testid', id)
  }
  container.classList.add('notifier')
  const timeout = setTimeout(() => {
    removeNotifier(container)
  }, delay)

  window.addEventListener('beforeunload', () => {
    clearTimeout(timeout)
  })

  createNotifierBody({ description, container, title })
  createElement({
    className: 'notifier-close-button',
    parentElement: container,
    tagName: 'button',
    innerHTML: '&#10006'
  }).addEventListener('click', () => {
    removeNotifier(container)
    clearTimeout(timeout)
  })

  return container
}

export const create = ({ description, eventKey = 'click', id, delay, ref, title }: Notifier): void | never => {
  if(!ref) throw new Error('Element not found')

  ref.addEventListener(eventKey, () => {
    const container = createNotifierContainer({ delay, description, id, title })
    document.body.appendChild(container)
  })
}