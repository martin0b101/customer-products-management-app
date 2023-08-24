<template>
    <div class="h-screen w-screen mx-2 overflow-y-scroll">
      
        <label class="relative block mt-3">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input v-model="search" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Iskanje" type="text" name="search"/>
        </label>

        <h1 class="text-2xl font-bold tracking-wide m-10">Produkti</h1>

        <div class="block bg-white m-1 text-black">
       <button v-on:click="showModal = true" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dodaj produkt</button>
       </div>

<div v-show="showModal" id="extralarge-modal" data-modal-placement="top-center" class="fixed flex justify-center items-center z-50 w-full p-4 overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Dodaj nov produkt
                </h3>
                <button v-on:click="showModal = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        <div class="m-10">

    <form>
    <div class="mb-6">
        <label for="product_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime produkta</label>
        <input type="text" id="product_name" v-model="product_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. Kostanjeva krema" required>
    </div> 
    <div class="mb-6">
        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cena</label>
        <input type="text" id="price" v-model="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 45.55" required>
    </div> 
    <div class="mb-6">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis</label>
        <input type="text" id="description" v-model="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. opis izdelka">
    </div> 
    <div class="mb-6">
        <label for="company_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id podjetja</label>
        <input type="text" id="company_id" v-model="company_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 1" required readonly>
    </div> 
  

    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 m-0">

    <button @click="cancel" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">Preklici</button>
    <button @click="addNewProduct" type="submit" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">Dodaj</button>
    </div>
  </form>
    
</div>
<!-- Modal footer -->
        
        </div>
    </div>
</div>

    <ul class="divide-y divide-gray-200">
    <li v-for="product in searchResults" :key="product.id" class="py-4 flex">
        <div class="ml-3">
            <p class="text-sm font-medium text-gray-900"> {{ product.product_name}} </p>
            <p class="text-sm font-medium"> Cena: {{ product.price }} {{ euroSign }}</p>
            <button @click="edit(product.id)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 content-end focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
            <button @click="remove(product.id)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 content-end focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>
        </div>
    </li>
  </ul>


  </div>
</template>
<script>

import { supabase } from '../lib/supabaseClient';
import { store } from '../store'

export default {
    
  data() {
    return {
        euroSign: "€",
        products: [],
        product_name:'',
        price:'',
        description:'',
        company_id: sessionStorage.getItem("CompanyId"),
        search: '',
        showModal: false,
    }
  },
  methods: {

    async getProducts(){
        const { data } = await supabase.from('products').select().eq("company_id", this.company_id);
        this.products = data;
    },

    async edit(product_id){
      this.showModal = true;
      const { data } = await supabase.from('products').select().eq('id', product_id);
      this.product_name = data[0].product_name;
      this.price = data[0].price;
      this.description = data[0].description;
      this.company_id = data[0].company_id;

    },

    async addNewProduct(){
      console.log(this.product_name);
      const { data, error } = await supabase
          .from('products')
          .insert(
            {price: this.price, 
            product_name: this.product_name,
            description: this.description, 
            company_id: this.company_id}).select();
      if(error){
        console.log("error ", error)
      }

      if(data){
        console.log("Data:", data);
      }
    },

    async remove(product_id){
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product_id);
      this.getProducts();
    },

    setCompanyId(){
      this.company_id = sessionStorage.getItem("CompanyId");
    }
  },


  computed: {
    searchResults() {
      // Filter the data based on the search term
      return this.products.filter(product =>
      product.product_name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.getProducts();
    this.setCompanyId();
  }
}
</script>