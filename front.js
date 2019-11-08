Vue.component('catalog-element-component', {
   props: ['id', 'product_name', 'price', 'img_medium'],
   template: `
    <div class="product__element">
        <a href="" class="product__content">
            <img class="product__img" :src="img_medium" alt="">
            <div class="product__name">{{product_name}}</div>
            <div class="product__price">{{price}}.00</div>
        </a>
        <a href="#" @click.stop.prevent="handleByClick(id)" class="product__add" :data-product__id="id">Add to Cart</a>
        <img src="img/stars5.jpg" alt="stars" class="product__stars">
    </div>`,
   methods: {
      handleByClick(id) {
         this.$emit('buy', id);
      }
   },
});
Vue.component('catalog-list-component', {
   props: ['items', 'cols'],
   template:
      `<div :class="classListBox(cols)">
            <catalog-element-component 
              v-if="items.length"
              v-for="item in items"
              :key="item.id"
              :id="item.id" 
              :product_name="item.product_name" 
              :price="item.price" 
              :img_medium="item.img_medium"
              @buy="handleByClick(item)"
            ></catalog-element-component>
            <span v-else>Find nothing</span>
        </div>`,
   methods: {
      handleByClick(item) {
         this.$emit('buy', item);
      },
      classListBox(cols) {
         return `products__box products__box_x${cols} div_flex`
      },
   },
});

Vue.component('cart-element-component', {
   props: ['img_small','product_name','amount','price','id'],
   template:
      `<div class="cart__product">
            <img :src="img_small" alt="" class="cart__prod_img">
            <div class="cart__prod_title">{{product_name}}</div>
            <img src="img/stars5.jpg" alt="stars" class="cart__prod_stars">
            <div class="cart__prod_price">{{amount}}&nbsp<span class="price_x">x</span>&nbsp{{price}}</div>
            <a @click.stop.prevent="handleByClick(id)" href="#">
                <i :data-product__id="id" class="cart__prod_del fa fa-times-circle"></i>
            </a>
        </div>`,
   methods: {
      handleByClick(id) {
         this.$emit('delete', id);
      },
   },
});
Vue.component('cart-list-component', {
   props: ['items'],
   template:
      `<div>
         <template v-if="items.length">
            <cart-element-component
               v-for="item in items"
               :key="item.id"
               :id="item.id"
               :img_small="item.img_small"
               :product_name="item.product_name"
               :amount="item.amount"
               :price="item.price"
               @delete="handleByClick(item)"
            ></cart-element-component>      
         </template>
         <span v-else>Cart is empty</span>           
      </div>`,
   methods: {
      handleByClick(item) {
         this.$emit('delete', item);
      },
   },
});

Vue.component('cart-product-line-component', {
   props: ['img_medium','product_name','amount','price','id'],
   template:
      `<div class="shop_table__prodline">
         <div class="shop_table__details div_colwrap">
            <img :src="img_medium" style="width: 100px;" alt="">
            <div class="product__name product__name_cart">{{product_name}}</div>
            <div class="product__prop">
               Color: <span class="product__prop_value">Red</span>
               <br>
               Size: <span class="product__prop_value">Xll</span>
            </div>
         </div>
         <div class="shop_table__property div_flex">\${{price}}</div>
         <div class="shop_table__property div_flex">
            <input :data-product__id="id" @change="handleByChange" class="choose__box choose__box_cart" min="1" type="number" :value="amount">
         </div>
         <div class="shop_table__property div_flex">FREE</div>
         <div class="shop_table__property div_flex">\${{amount * price}}</div>
         <div class="shop_table__action div_flex">
            <a @click.stop.prevent="handleByClick(id)" href="#">
                <i :data-product__id="id" class="fa fa-times-circle" aria-hidden="true"></i>
            </a>
         </div>
      </div>`,
   methods: {
      handleByClick(id) {
         this.$emit('delete', id);
      },
      handleByChange(event) {
         this.$emit('change', {id: this.id, amount: event.target.value});
      },
   },
});
Vue.component('cart-product-table-component', {
   props: ['items'],
   template:
      `<div class="shop_table__flex">
         <template v-if="items.length">
            <div class="shop_table__header">
               <div class="shop_table__details">product details</div>
               <div class="shop_table__property div_flex">unite price</div>
               <div class="shop_table__property div_flex">quantity</div>
               <div class="shop_table__property div_flex">shipping</div>
               <div class="shop_table__property div_flex">subtotal</div>
               <div class="shop_table__action div_flex">action</div>
            </div>
            <cart-product-line-component
               v-for="item in items"
               :key="item.id"
               :id="item.id"
               :img_medium="item.img_medium"
               :product_name="item.product_name"
               :amount="item.amount"
               :price="item.price"
               @delete="handleByClick(item)"
               @change="handleByChange"
            ></cart-product-line-component>      
         </template>
         <span v-else>Cart is empty</span>           
      </div>`,
   methods: {
      handleByClick(item) {
         this.$emit('delete', item);
      },
      handleByChange(item) {
         this.$emit('change', item);
      },
   },
});

const regMailExp = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])',); //E-mail official standard
const regLoginExp = new RegExp('^[a-z][a-z0-9-_\\.]{1,19}$','i'); //Login 2-20 chars latin+nums
const regPasswordExp = new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'); //Pswd 8+ characters latin+nums+symbols
const app = new Vue({
   el: '#root',
   data: {
      catalog: [],
      query: '',
      filteredCatalog: [],
      cart: {
         amount: 0,
         totalCost: 0,
         items: [],
      },
      // userName: '',
      // userPassword: '',
      logOrRegStatus: 0,
      loginForm: {
         Name: '',
         Password: '',
      },
      registerForm: {
         Age: '',
         Mail: '',
      },
      user: {
         name: '',
         mail : '',
         age: '',
      },
   },
   methods: {
      fetchRequest(url) {
         return fetch(url)
            .then(response => {
               if (response.ok) {
                  return response.json()
               } else {throw new Error(`${response.status}`)}
            })
      },
      fetchCatalog() {
         this.fetchRequest('/catalog')
            .then(items => {
               this.catalog = items;
               this.filteredCatalog = items;
            })
      },
      fetchCart(url) {
         return this.fetchRequest(url).then(items => {
            this.cart.items = items;
            return items
         });
      },
      fetchCurrentUsername() {
         return this.fetchRequest('/userSettings')
            .then(settings => {
                  if (settings.username !== '') {
                     this.user.name = settings.username;
                  } else {throw new Error('empty name')}
               })
            },
      fetchUser() {
         return this.fetchRequest(`/users/${this.user.name}`)
            .then(user => {
               if (user.id) {
                  this.user.name = user.id;
                  this.user.age = user.age;
                  this.user.mail = user["e-mail"];
               } else {
                  throw new Error('id is undefined')
               }
               // return user
            })
      },
      filterCatalog() {
         const regExp = new RegExp(this.query,'i');
         this.filteredCatalog = this.catalog.filter(item => {
            return regExp.test(item.product_name)
         });
      },
      productsBoxClickHandler(item) {
         return this.addToCart(+item.id);
      },
      cartXClickHandler(item) {
         return this.deleteFromCart(item.id);
      },
      cartAmountChangeHandler(item) {
         return this.updateCart(item.id, item.amount)
      },
      logoutClickHandler() {
         //Удаление записи с сервера
         fetch(`/userSettings`, {
            method: 'PATCH',
            body: JSON.stringify({username: ''}),
            headers: {
               'Content-type': 'application/json',
            }
         }).then(response => response.json());
         //Кинуть корзину в юзера
         fetch(`/users/${this.user.name}`, {
            method: 'PATCH',
            body: JSON.stringify({cart: this.cart.items}),
            headers: {
               'Content-type': 'application/json',
            }
         }).then(response => response.json());
         //удаляем корзину
         this.fetchCart('/cart').then(items => {
            items.forEach(item => {
               this.delete(item.id)
            })
         }).then(() => {
            this.cart.items = [];
         });
         //Удаляем самого юзера
         this.user = {name:'',age:'',};
      },
      loginClickHandler() {
         if (this.loginForm.Name !== '') {
            if (!this.logOrRegStatus) {  //Login
               fetch(`/users/${this.loginForm.Name}`)
               // Проверка логина
                  .then(response => {
                     if (response.ok) {
                        return response.json()
                     } else {
                        throw new Error('User not found')
                     }
                  })
                  // Проверка пароля
                  .then(user => {
                     if (this.loginForm.Password === user.password) {
                        return user
                     } else {
                        throw new Error('Password is incorrect')
                     }
                  })
                  //Записываем, что юзер успешно вошел
                  .then(user => {
                     this.user.name = user.id;
                     this.user.age = user.age;
                     this.user.mail = user["e-mail"];
                     fetch(`/userSettings`, {
                        method: 'PATCH',
                        body: JSON.stringify({username: user.id}),
                        headers: {
                           'Content-type': 'application/json',
                        }
                     });
                     return user
                  })
                  // Забрать корзину юзера
                  .then(user => {
                     if (user.cart.length+1) {
                        this.cart.items = user.cart;
                        user.cart.forEach(item => {
                           this.add('/cart',item)
                        })
                     } else {this.cart.items = []}
                  })
                  .catch(error => alert(error))
            } else {  //Register
               fetch(`/users/${this.loginForm.Name}`)
               // Проверка логина
                  .then(response => {
                     if (!response.ok) {
                        return !response.ok
                     } else {
                        throw new Error('User already exist')
                     }
                  })
                  //Проверка введенных данных
                  .then(() => {
                     if (!regLoginExp.test(this.loginForm.Name)) {throw new Error('Login must be 2-20 symbols from latin and numbers')}
                     if (!regPasswordExp.test(this.loginForm.Password)) {throw new Error('Password must be at least 8 characters, including latin and special symbols and numbers')}
                     if (!regMailExp.test(this.registerForm.Mail)) {throw new Error('Enter valid e-mail')}
                  })
                  //Создание учетки
                  .then(() => {
                     let user = {
                        id: this.loginForm.Name,
                        password: this.loginForm.Password,
                        age: this.registerForm.Age,
                        'e-mail': this.registerForm.Mail,
                     };
                     this.loginForm.Name = '';
                     this.loginForm.Password = '';
                     this.registerForm.Age = '';
                     this.registerForm.Mail = '';
                     this.add(`/users`, user)
                  })
                  .catch(error => alert(error))
            }}},
      loginOrRegisterClickHandler(type) {
         this.logOrRegStatus = type
      },
      loginButtonClass(type) {
         return type ? `my_account__button_active button div_flex` : `my_account__button_inactive button div_flex`
      },
      searchById(array,id) {
         let index = array.map(item => +item.id).indexOf(+id);
         return index
      },
      addToCart(id) {
         let index = this.searchById(this.cart.items,id);
         if (index+1) {
            return this.update(id,this.cart.items[index].amount+1)
               .then(() => {
                  this.cart.items[index].amount++
               })
         } else {
            let item = this.catalog[this.searchById(this.catalog,id)];
            return this.add('/cart',item).then(item => {
               this.cart.items.push(item);
            });
         }
      },
      deleteFromCart(id) {
         if (confirm('Are you serious?')) {
            return this.delete(id).then(() => {
               let index = this.searchById(this.cart.items,id);
               if (index+1) {
                  this.cart.items.splice(index,1);
               }
            })
         }
      },
      updateCart(id, amount) {
         if (amount !== 0) {
            return this.update(id, amount).then(() => {
               let index = this.searchById(this.cart.items,id);
               if (index+1) {
                  this.cart.items[index].amount = amount;
               }
            })
         } else {
            return this.deleteFromCart(id)
         }
      },
      update(id, value) {
         return fetch(`/cart/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({amount: value}),
            headers: {
               'Content-type': 'application/json',
            }
         }).then(response => response.json())
      },
      add(url,item) {
         return fetch(url, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
               'Content-type': 'application/json',
            }
         }).then(response => response.json())
      },
      delete(id) {
         return fetch(`/cart/${id}`, {
            method: 'DELETE',
         }).then(response => response.json())
      },
   },
   computed: {
      amountCart: function() {
         return this.cart.items.reduce((amount, item) => {
            return amount += item.amount;
         },0)
      },
      totalCostCart: function () {
         return this.cart.items.reduce((cost, item) => {
            return cost += item.amount * item.price;
         },0)
      },
      showCart: function () {
         return this.cart.items.length > 0
      },
      showCatalog: function () {
         return this.filteredCatalog.length > 0
      },
      logOrReg: function () {
         return this.logOrRegStatus ? 'Register' : 'Login'
      }
   },
   mounted: function () {
      this.fetchCatalog();
      this.fetchCurrentUsername()
         .then(() => this.fetchUser())
         .then(() => {
            this.fetchCart('/cart');
         })
         .catch(error => {
            this.fetchCart('/cart');
         });
   },
});