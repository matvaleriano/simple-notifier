/**
 * @jest-environment jsdom
 */
import { createElement } from './utils'

describe('createElement()', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should return an element of specific tag', () => {
    const element = createElement({
      parentElement: document.body,
      className: 'test',
      tagName: 'div'
    })

    expect(element.tagName).toEqual('DIV')
    expect(element).toBeInstanceOf(HTMLDivElement)
  });

  it('should return an element with specific css class', () => {
    const element = createElement({
      parentElement: document.body,
      className: 'test',
      tagName: 'div'
    })

    expect(element.classList.contains('test')).toBeTruthy()
  })

  it('should return an element with specific text', () => {
    const element = createElement({
      parentElement: document.body,
      className: 'test',
      tagName: 'div',
      textContent: 'content'
    })

    expect(element.textContent).toEqual('content')
  })

  it('should return an element with specific inner html', () => {
    const element = createElement({
      parentElement: document.body,
      className: 'test',
      tagName: 'div',
      innerHTML: '<pre>content</pre>'
    })

    expect(element.innerHTML).toEqual('<pre>content</pre>')
  })

  it('should append element to specified parent', () => {
    const element = createElement({
      parentElement: document.body,
      className: 'test',
      tagName: 'div',
      innerHTML: '<pre>content</pre>'
    })

    expect(document.body).toMatchInlineSnapshot(`
<body>
  <div
    class="test"
  >
    <pre>
      content
    </pre>
  </div>
</body>
`)
  })
})