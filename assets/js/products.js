var Products = /** @class */ (function () {
    function Products(opt) {
        this.name = opt.name,
            this.color = opt.color,
            this.number = opt.number;
    }
    Products.prototype.save = function (tbody) {
        if (tbody) {
            var existProducts = localStorage.getItem('products');
            var products = void 0;
            if (existProducts) {
                products = JSON.parse(existProducts);
            }
            else {
                products = [{
                        maxId: 0,
                        list: []
                    }];
            }
            var maxId = products[0].maxId;
            var lastIdInsert = Number(maxId) + 1;
            var currentList = products[0].list;
            products[0].maxId = lastIdInsert;
            var row = {
                id: lastIdInsert,
                name: this.name,
                color: this.color,
                number: this.number
            };
            var rowEditId = "editName" + row.id;
            var tr = document.createElement('tr');
            tr.innerHTML = "\n        <td>" + row.id + "</td>\n        <td><div class=\"cpn-edit\"><input type=\"text\" value=\"" + row.name + "\" class=\"cpn-edit__field\" id=\"" + rowEditId + "\" disabled/><button class=\"cpn-edit__btn\" data-edit-name=\"" + rowEditId + "\"><i class=\"icon-edit\"></i></button></div></td>\n        <td>" + row.color + "</td>\n        <td>" + row.number + "</td>\n        <td><button class=\"cpn-btn-delete\" data-prod-id=\"" + row.id + "\">\u0423\u0434\u0430\u043B\u044F\u0442\u044C</button></td>\n      ";
            tbody.appendChild(tr);
            currentList.push(row);
            localStorage.setItem('products', JSON.stringify(products));
            document.location.reload();
        }
    };
    Products.prototype["delete"] = function (id) {
        if (id) {
            var existProducts = localStorage.getItem('products');
            var products = JSON.parse(existProducts);
            var productList = products[0].list;
            var itemIndex = productList.indexOf(productList.find(function (x) { return x.id === Number(id); }));
            productList.splice(itemIndex, 1);
            products[0].list = productList;
            if (productList.length > 0) {
                localStorage.setItem('products', JSON.stringify(products));
            }
            else {
                localStorage.removeItem('products');
            }
        }
    };
    return Products;
}());
