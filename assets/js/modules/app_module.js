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
        return `
          <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
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
