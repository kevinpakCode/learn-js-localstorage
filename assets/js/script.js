import {sleep, showTbodyContent, controlFormBtn} from './modules/app_module.js'

/*
---------------------------------------
| Modal
--------------------------------------
*/

//Default variables
const allTargetModal = document.querySelectorAll('[data-modal-target]')
const modalWrapClassName = 'cpn-modal-wrap'
const modalWrapIdName = 'app-modal-wrap'
const modalActiveClassName = 'cpn-modal--open'
const btnModalCloseClassName = 'cpn-modal__btn-close'

//function Open modal
const openModal = modalTarget => {
  const modalWrap = document.createElement('div')
  modalWrap.className = modalWrapClassName
  modalWrap.setAttribute('id', modalWrapIdName)
  document.body.append(modalWrap)
  modalTarget.classList.add(modalActiveClassName)
  
}

//function Close modal
const closeModal = modalTarget => {
  const modalWrap = document.querySelector(`.${modalWrapClassName}`)
  modalWrap.remove()
  modalTarget.classList.remove(modalActiveClassName)
}

//Open modal for each elem who has attr data-modal-target
if(allTargetModal.length) {
  allTargetModal.forEach(btn => {
    const idTarget = btn.getAttribute('data-modal-target')
    btn.onclick = () => {
      const modalTarget = document.getElementById(idTarget)
      openModal(modalTarget)
    }
  })
}

//Close modal when click on btn
const btnCloseModal = document.querySelector(`.${btnModalCloseClassName}`)
btnCloseModal.onclick = (e) => {
  const btn = e.target
  const activeModal = btn.closest(`.${modalActiveClassName}`)
  closeModal(activeModal)
}

//Close modal when click anywhere outside of the modal
window.onclick = function(event) {
  const modalWrap = event.target
  if (modalWrap.id == modalWrapIdName) {
    const openModal = document.querySelector(`.${modalActiveClassName}`)
    closeModal(openModal)
  }
}


/*
---------------------------------------
| Submit form product
--------------------------------------
*/
const form = document.getElementById('formNewProduct')
const tbody = document.getElementById('listProductRow')

//Default show product
showTbodyContent(tbody)


form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formTarget = e
  const submitError = []

  const modalTarget = form.closest('.cpn-modal--open')
  const btn = form.querySelector('button[data-text]')
  controlFormBtn(btn)

  const fieldName = form.querySelector('[name="name"]')
  const fieldColor = form.querySelector('[name="color"]:checked')
  const fieldNumber = form.querySelector('[name="number"]')

  const prodName = fieldName.value.trim()
  const prodColor = fieldColor? fieldColor.value.trim() : ''
  const prodNumber = fieldNumber.value.trim()

  if(prodName.length&&prodColor.length&&prodNumber.length) {

    const product = new Products({
      name: prodName,
      color: prodColor,
      number: prodNumber
    })

    async function saveProduct() {
      try {
        await sleep(2000)
        product.save(tbody)
        form.reset()
        closeModal(modalTarget)
      } catch(e) {
        console.error(e)
      }
    }
    saveProduct()
  }else {
    controlFormBtn(btn, false)
  }
})



/*
---------------------------------------
| Delete product
--------------------------------------
*/
const allProdDeleteBtn = document.querySelectorAll('[data-prod-id]')
if(allProdDeleteBtn) {
  allProdDeleteBtn.forEach(btn => {
    const id = Number(btn.getAttribute('data-prod-id'))
    const product = new Products({})
      
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      controlFormBtn(btn)
      async function deleteProduct() {
        try {
          await sleep(1000)
          product.delete(id)
          btn.closest('tr').remove()
        } catch(e) {
          console.error(e)
        }
      }
      deleteProduct()     
    })

  })
}