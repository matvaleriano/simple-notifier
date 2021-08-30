/**
 * @jest-environment jsdom
 */
import { create } from '.'
import { Notifier } from './types'

const renderNotifier = (payload: Partial<Notifier> = {}) => {
  const params = {
    description: 'test',
    delay: 5000,
    eventKey: 'click' as keyof ElementEventMap,
    id: 'notifier',
    ref: document.querySelector('#btn') as HTMLElement,
    ...payload
  }
  
  if(!params.ref) throw new Error('Element ref not found')
  
  create(params)

  const evt = document.createEvent("HTMLEvents")
  evt.initEvent("click", false, true)
  params.ref.dispatchEvent(evt)
}

describe('create()', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="btn">test</button>
    `
  })

  it('should dispatch an error if ref element doesnt exist', () => {
    const payload = {
      description: 'test',
      delay: 5000,
      ref: document.querySelector('#notFound')
    }

    expect(() => create(payload)).toThrowError('Element not found')
  })

  it('should render a simple notification', () => {
    renderNotifier()

    const notifier = document.querySelector('#notifier')
    expect(notifier).toMatchInlineSnapshot(`
<div
  class="notifier"
  data-testid="notifier"
  id="notifier"
>
  <section
    class="notifier-body"
  >
    <div
      class="notifier-description"
    >
      test
    </div>
  </section>
  <button
    class="notifier-close-button"
  >
    ✖
  </button>
</div>
`)
  })

  it('should render a link at description', () => {
    renderNotifier({
      description: `Test with a <a href="#" id="link">Link</a>`
    })

    const link = document.querySelector('#link')
    expect(link?.textContent).toEqual('Link')
  })

  test('when user clicks on close button it should close notification', () => {
    renderNotifier({
      description: `Test with a <a href="#" id="link">Link</a>`
    })

    const closeButton = document.querySelector<HTMLButtonElement>('.notifier-close-button')
    expect(closeButton?.innerHTML).toEqual('✖')
    closeButton?.click()

    expect(document.querySelector('#notifier')).toBeNull()
  })

  it('should remove notification after delay', () => {
    jest.useFakeTimers()

    renderNotifier({
      delay: 0
    })

    jest.runAllTimers()

    expect(document.querySelector('#notifier')).toBeNull()
  })

  it('should remove timeout before window unloads', () => {
    jest.useFakeTimers()
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')

    renderNotifier()
    window.dispatchEvent(new Event('beforeunload'))
    
    expect(clearTimeoutSpy).toBeCalled()
  })
})