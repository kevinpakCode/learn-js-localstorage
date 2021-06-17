export const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(()=> resolve(), ms)
  })
}

export const showTbodyContent = (tbody, productsList=null) => {
  const existProducts = localStorage.getItem('products')

  if(existProducts) {
    const products = JSON.parse(existProducts)
    productsList = products[0].list
  }

  if(productsList) {
    if(productsList.length>0) {
      const newTbody = productsList.map(row=> {
        const rowEditId = `editName${row.id}`
        return `
          <tr>
            <td>${row.id}</td>
            <td><div class="cpn-edit"><input type="text" value="${row.name}" class="cpn-edit__field" id="${rowEditId}" disabled/><button class="cpn-edit__btn" data-edit-name="${rowEditId}"><i class="icon-edit"></i></button></div></td>
            <td>${row.color}</td>
            <td>${row.number}</td>
            <td><button class="cpn-btn-delete" data-prod-id="${row.id}">Удалять</button></td>
          </tr>
        `
      })
      tbody.innerHTML = newTbody.reverse().join('').trim()
    }
  }
}


export const controlFormBtn = (btn, status=true) => {
  if(status) {
    btn.disabled = true
    btn.textContent = 'Loading... '
  }else {
    btn.disabled = false
    btn.textContent = btn.getAttribute('data-text')
  }
}
