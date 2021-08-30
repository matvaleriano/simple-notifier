type Params = Pick<Element, 'parentElement' | 'tagName'> 
  & Partial<Pick<Element, 'innerHTML' | 'textContent'>>
  & { className?: string }

export const createElement = (params: Params) => {
  const element = document.createElement(params.tagName)
  if(params.className) element.classList.add(params.className)
  if(params.textContent) element.textContent = params.textContent
  if(params.innerHTML) element.innerHTML = params.innerHTML
  params.parentElement?.appendChild(element)
  return element
}