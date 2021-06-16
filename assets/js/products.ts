type IOpt = {
  name?: string
  color?: string
  number?: number
}

interface IProduct {
  name: string
  color: string
  number: number
  save(tbody: string): void
  delete(itemIndex: number): void
}

class Products implements IProduct {
  name
  color
  number
  
  constructor(opt:IOpt) {
    this.name = opt.name,
    this.color = opt.color,
    this.number = opt.number
  }

  save(tbody) {
    if(tbody) {
      const existProducts = localStorage.getItem('products')
      let products 

      if(existProducts) {
        products = JSON.parse(existProducts)
      }else{
        products = [{
          maxId: 0,
          list: []
        }]
      }

      const maxId = products[0].maxId
      const lastIdInsert = Number(maxId) + 1
      const currentList = products[0].list

      products[0].maxId = lastIdInsert
      

      const row = {
        id:  lastIdInsert,
        name: this.name,
        color: this.color,
        number: this.number
      }
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.color}</td>
        <td>${row.number}</td>
        <td><button class="cpn-btn-delete" data-prod-id="${row.id}">Удалять</button></td>
      `
      tbody.appendChild(tr)
      currentList.push(row)
      localStorage.setItem('products', JSON.stringify(products))
      document.location.reload()
      
    }
    
    
  }

  delete(id) {
    if(id) {
      const existProducts = localStorage.getItem('products')
      const products = JSON.parse(existProducts)
      const productList = products[0].list
      const itemIndex = productList.indexOf(productList.find(x=> x.id===Number(id))) 
      productList.splice(itemIndex, 1)
      products[0].list = productList

      if(productList.length > 0) {
        localStorage.setItem('products', JSON.stringify(products))
      }else{
        localStorage.removeItem('products')
      }
    }
  }

}