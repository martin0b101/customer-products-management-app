<template>
    <div class="h-screen w-screen mx-2 overflow-auto">
        <h1 class="text-2xl font-bold tracking-wide m-10">Dashboard</h1>

       <div class="inline-block bg-white p-10 m-5 rounded-lg drop-shadow-xl text-black">
            <h1 class="text-2xl font-bold tracking-wide">Danasnji zasluzek: {{ parseFloat(today_sales).toFixed(2) }} {{ euroSign }}</h1>
       </div>


       <div class="block bg-white m-1 text-black">
        <button :disabled="isCompanySelected" v-on:click="showModal = true" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">Dodaj narocilo</button>
        <button :disabled="isCompanySelected" @click="getDoc" class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">Export v word</button>

        </div>

<div v-show="showModal" id="extralarge-modal" data-modal-placement="top-center" class="fixed flex justify-center items-center z-50 w-full p-4 overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Dodaj novo zapis
                </h3>
                <button v-on:click="showModal = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        <div class="m-10">
    <form >
        <div class="mb-6">
            <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Narocila</label>
            <input type="text" id="id" v-model="order_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 2" required>
        </div> 

        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Narocnika</label>
            <AutoComplete class="background bg-gray-500 w-full border rounded-lg" v-model="searchCustomerIdQuery" dropdown :suggestions="itemsCustomerId" @complete="searchCustomerId" @change="fillForm(event)" placeholder="npr. 5585"/>
        </div>

        <div class="mb-6">
            <label for="cutomer_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime narocnika</label>
            <input type="text" id="cutomer_name" v-model="customer_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. Janez Novak" required>
        </div> 

        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime izdelka</label>
            <AutoComplete class="background bg-gray-500 w-full border rounded-lg" v-model="searchProductQuery" dropdown :suggestions="items" @complete="search" @select="addProductToTable" @keyup.enter="addProductToTable" placeholder="npr. Kostanjeva krema" />
            <button @click="addProductToTable" class="text-white m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dodaj produkt</button>
            
            <div class="inline-block" v-for="product in addedProducts">
                <div class="bg-gray-900 rounded-full m-1 p-2 text-white">{{ product }} 
                    <button v-on:click.prevent="validate" @click="deleteSelectedProduct(product)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
                    </button>
                </div>
            </div>
        </div>


        <div class="mb-6">
            <label for="order_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cena narocenega</label>
            <input type="text" id="order_price" v-model="order_price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 200.55" required>
        </div> 

        <div class="mb-6">
            <label for="dispatch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Odprema</label>
            <input type="text" id="dispatch" v-model="dispatch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 30.1.2023" required>
        </div> 

        <div class="mb-6">
            <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonska stevilka</label>
            <input type="text" id="phone_number" v-model="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 051 555 888" required>
        </div> 

        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Popravki</label>
            <input type="text" id="description" v-model="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. Naroci se 1x">
        </div> 

    
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 m-0">
            <button @click="addNewSale" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dodaj narocilo</button>

        <button @click="updateSalesData" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shrani</button>


        </div>
    </form>
</div>
<!-- Modal footer -->
        
        </div>
    </div>
</div>


    <div class="relative overflow-x-auto">
  <table class="shadow-lg table-auto mt-10 mb-20 ml-1 mr-1">
  <thead>
    <tr>
      <th class="bg-blue-100 border text-left px-8 py-4">ID Narocila</th>
      <th class="bg-blue-100 border text-left px-8 py-4">ID Narocnika</th>
      <th class="bg-blue-100 border text-left px-8 py-4">Ime narocnika</th>
      <th class="bg-blue-100 border text-left px-8 py-4">Kreme</th>
      <th class="bg-blue-100 border text-left px-8 py-4">Znesek</th>
      <th class="bg-blue-100 border text-left px-8 py-4">Telefonska stevilka</th>
      <th class="bg-blue-100 border text-left px-8 py-4">Odprema</th>
      <th class="bg-blue-100 border text-left px-8 py-4">Popravki</th>
      <th class="bg-blue-100 border text-left px-8 py-4">Akcije</th>
    </tr>
  </thead>
  <tbody class="" v-for="sale in sales" :key="sale.id">
    <tr class="hover:bg-gray-50">
      <td class="border px-8 py-4">{{ sale.id }}</td>
      <td class="border px-8 py-4">{{ sale.customer_id }}</td>
      <td class="border px-8 py-4">{{ sale.customer_name.toUpperCase() }}</td>
      <td class="border px-8 py-4">{{ sale.orderd_products }}</td>
      <td class="border px-8 py-4">{{ sale.order_price }}  {{ euroSign }}</td>
      <td class="border px-8 py-4">{{ sale.phone_numbers }}</td>
      <td class="border px-8 py-4">{{ sale.dispatch_date }}</td>
      <td class="border px-8 py-4">{{ sale.description }}</td>
      <td class="border px-8 py-4">
        <div class="inline-flex">
            <button @click="editSale(sale.id)" class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
            <button @click="removeSale(sale.id)" type="submit" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>
        </div>
    </td>
    </tr>
  </tbody>
</table>
    </div>
    </div>
    
</template>

<script>
import { supabase } from '../lib/supabaseClient';
import docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import JSzipUtils from 'jszip-utils';
import  saveAs  from 'file-saver';

export default {
   data() {
     return {
       euroSign: "€",
       sales: [],
       showModal: false,
       products: [],
       customers: [],
       items: [],
       itemsCustomerId: [],
       searchProductQuery: '',
       searchCustomerIdQuery: '',
       selectedProducts: null,
       price: 0,
       today_sales: 0,
       order_id:'',
       customer_id:'',
       customer_name:'',
       order_price:'',
       description:'',
       added: '',
       addedProducts: [],
       dispatch: '',
       phone_number: '',
       showModal: false,
       company_id: '',
     }
   },

   methods: {
       async getAllSales(){
        const {data} = await supabase.from('sales').select();
        this.sales = data;
       },

       async getProducts(){
           const { data } = await supabase.from('products').select();
           this.products = data;
       },

       async getCustomers(){
        const {data} = await supabase.from('customer').select();
        this.customers = data;
       },

       async getCustomerByCustomerId(customer_id){
        const {data} = await supabase.from('customer').select('first_name, last_name, phone_number1, phone_number2').eq('customer_id', customer_id);
        return data;
       },

       async getOrderId(){
        const {data} = await supabase.from('sales').select('id');
       },

       show(){
           if(this.show){
               this.show = false;
               return;
           }
           this.show = true;
           return;
       },

       addPrice(){
           this.selectedProducts.forEach(product => {
               console.log(parseFloat(product.split("-")[1]));
               this.price += parseFloat(product.split("-")[1]);
           });
       },

       async getTodaySales(){
        var dateNow = new Date();
        this.today_sales = 0;
        const {data} = await supabase.from('sales').select().gte('created_at', this.formatDate(dateNow));
        data.forEach((row) => this.today_sales += parseFloat(row.order_price));
        this.sales = data
       },

       async updateSalesData(){
        const { data, error } = await supabase
                .from('sales')
                .update([
                    { id: this.order_id, customer_id: this.searchCustomerIdQuery, orderd_products: this.concateOrderProduct(), customer_name: this.customer_name, order_price: this.order_price, description: this.description, dispatch_date: this.dispatch, phone_numbers: this.phone_number}])
                    .eq('id', this.order_id)
                    .select();
       },

        async addNewSale(){
            // debugger;
            // console.log(this.order_id);
            // const {data, error} = await supabase
            //     .from('sales')
            //     .select('*')
            //     .eq('id', parseInt(this.order_id))

            // console.log("data exist ", dataExist, "id: ", this.order_id);

            // if(dataExist != 'null'){
            //     this.updateSalesData();
            //     this.getTodaySales();
            //     return;
            // }

            // if(errorExist){
            //     console.log(errorExist);
            // }

            const { data, error } = await supabase
                .from('sales')
                .insert([
                    { id: this.order_id, customer_id: this.searchCustomerIdQuery, orderd_products: this.concateOrderProduct(), customer_name: this.customer_name, order_price: this.order_price, description: this.description, dispatch_date: this.dispatch, phone_numbers: this.phone_number}]).select();
            this.added = error.message;
       },

        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        },

        formatDateForWord(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [day, month, year].join('.');
        },


        search(event) {
            // todo add selected value
            var filters = this.products.filter(product =>
            product.product_name.toLowerCase().includes(event.query.toLowerCase()));

            this.items = filters.map((item) => item.product_name);
        },

        searchCustomerId(event){
            var filters = this.customers.filter((customer) =>
            customer.customer_id.toString().includes(event.query));

            this.itemsCustomerId = filters.map((item) => item.customer_id);
        },

        addProductToTable(event) {
            if (!this.searchProductQuery) {
                return;
            }
            this.addedProducts.push(this.searchProductQuery);
            this.searchProductQuery = '';
            this.addedProducts.forEach((product_name) => {
                this.products.forEach((product) => { 
                    if (product.product_name === product_name){
                        if(this.order_price === ''){
                            this.order_price = '0';
                        }
                        this.order_price = (parseFloat(this.order_price) + parseFloat(product.price)).toFixed(2).toString();
                    } 
                })
            });
            event.preventDefault();
            
        },

        async resolvePromisesSeq(tasks) {
            const results = [];
            for (const task of tasks) {
                results.push(await task);
            }

            return results;
        },

        async fillForm(event){
    
            this.customer_id = this.searchCustomerIdQuery;

            try{
                var name = await this.resolvePromisesSeq(await this.getCustomerByCustomerId(this.customer_id));
                if (name == '') {
                    this.customer_name = '';
                    this.phone_number = '';
                }
                this.customer_name = name[0].first_name.concat(" "+name[0].last_name);
                this.phone_number = "0" + name[0].phone_number1.concat(", "+name[0].phone_number2 == null? name[0].phone_number2 : "");
            }catch(e){
                console.log("error", e);
            }
        },

        updatePriceNumber(){
            this.order_price = "0";
            this.addedProducts.forEach((product_name) => {
                this.products.forEach((product) => { 
                    if (product.product_name === product_name){
                        this.order_price = (parseFloat(this.order_price) + parseFloat(product.price)).toString();
                    } 
                })
            });
        },

        deleteSelectedProduct(product){
            this.addedProducts = this.addedProducts.filter((item) => {
                return product !== item
            });
            this.updatePriceNumber();
        },

        concateOrderProduct(){
            var orderProduct = '';
            this.addedProducts.forEach((product) => {
                orderProduct += product + ",";
            });
            orderProduct = orderProduct.slice(0, -1);
            return orderProduct;
        },

        stripSalesForWord(){
            let salesStriped = this.sales.map((sale) => {
               
            });
            return salesStriped;
        },
         
        getDoc(event){
            this.createAndSaveDocument();
            event.preventDefault();
        },

        loadFile(url, callback){
            JSzipUtils.getBinaryContent(url,callback);
        },

        createAndSaveDocument(){
            let dateToday = this.formatDateForWord(new Date());
            let salesJson = JSON.stringify(this.sales);
            let jsonDataset = {
                "orders": JSON.parse(salesJson), 
                "today_sales": parseFloat(this.today_sales).toFixed(2).toString() + this.euroSign,
                "company_name": "Sanabela d.o.o",
                "today_date": dateToday,
            };

            this.loadFile('WordTemplate/promet-template.docx',function(error,content){
                if (error) { 
                    throw error.message;
                };
                let zip = new JSZip(content);
                let doc = new docxtemplater().loadZip(zip)
                doc.setData(jsonDataset)
                try {
                    doc.render()
                }
                catch (error) {
                    let e = {
                        message: error.message,
                        name: error.name,
                        stack: error.stack,
                        properties: error.properties,
                    }
                    console.log(JSON.stringify({error: e}));
                    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                    throw error;
                }
                // docx generating
                let out = doc.getZip().generate({
                    type:"blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });
                
                let nameOfFile = 'Promet '+ dateToday +'.docx';
                saveAs(out, nameOfFile);    // You can pass this blob to a custom file saver component in the project.  
            });
        },

        async removeSale(sale_id){
            console.log("remove id", sale_id);
            const { data, error } = await supabase
            .from('sales')
            .delete()
            .eq('id', sale_id)
            .select();
            this.getTodaySales();
        },

        storeOrderdProductsToArray(orderd_products){
            return orderd_products.split(',').filter((product) => {return product != ''});
        },

        async editSale(sale_id){
            this.showModal = true;
            this.sales.forEach((sale) =>{
                if(sale.id === sale_id){
                    this.order_id = sale.id;
                    this.customer_name = sale.customer_name;
                    this.searchCustomerIdQuery = sale.customer_id;
                    this.addedProducts = this.storeOrderdProductsToArray(sale.orderd_products);
                    this.order_price = sale.order_price;
                    this.dispatch = sale.dispatch_date;
                    this.phone_number = sale.phone_numbers;
                    //console.log("EDIT SALE:", this.storeOrderdProductsToArray(sale.orderd_products), "id", this.order_id);
                }
            })
        }, 

        getSelectedCompany(){
            this.company_id = sessionStorage.getItem("CompanyId");
        },
    },
    computed: {
        isCompanySelected(){
            return this.company_id == 'Izberi podjetje';
        }
    },

   mounted() {
    this.getProducts();
    this.getTodaySales();
    //this.getAllSales();
    this.getCustomers();
    this.getProducts();
    this.getSelectedCompany();
 }
}

</script>


<style setup>
.background {
    height: 40px;
    background-color: #374151;
        color: white;
        -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        -moz-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}

.p-autocomplete-items {
    background-color: #374151;
    background-color: white;
}

.p-autocomplete-item{
    background-color: #374151;
    color:white;
}
    

.p-autocomplete-input{
    background-color: #374151;
    margin: 5px;
}
</style>