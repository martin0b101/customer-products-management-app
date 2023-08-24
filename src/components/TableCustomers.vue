<template>
    <div class="h-screen w-screen mx-2 overflow-y-scroll">
      
        <label class="relative block mt-3">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input v-model="search" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Iskanje" type="text" name="search"/>
        </label>

        <h1 class="text-2xl font-bold tracking-wide m-10">Stranke</h1>

        <div class="block bg-white m-1 text-black">
       <button v-on:click="showModal = true" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dodaj stranko</button>
       </div>

<div v-show="showModal" id="extralarge-modal" data-modal-placement="top-center" class="fixed flex justify-center items-center z-50 w-full p-4 overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Dodaj novo stranko
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
        <label for="customer_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Customer</label>
        <input type="text" id="customer_id" v-model="customer_id_new" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 445577" required>
    </div> 
    <div class="mb-6">
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime</label>
        <input type="text" id="first_name" v-model="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. Janez" required>
    </div> 
    <div class="mb-6">
        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priimek</label>
        <input type="text" id="last_name" v-model="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. Novak" required>
    </div> 
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
        <input type="text" id="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. janez.novak@gmail.com">
    </div> 
    <div class="mb-6">
        <label for="phone_number1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonska stevilka 1</label>
        <input type="text" id="phone_number1" v-model="phone_number1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 051 788 999" required>
    </div> 
    <div class="mb-6">
        <label for="phone_number2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonska stevilka 2</label>
        <input type="text" id="phone_number2" v-model="phone_number2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="npr. 031 444 555">
    </div> 

    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 m-0">

    <button @click="update" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shrani</button>
    <button @click="cancel" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">Preklici</button>
    <button @click="addNewCustomer" type="submit" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">Dodaj</button>
    </div>
  </form>
    
</div>
<!-- Modal footer -->
        
        </div>
    </div>
</div>


    <ul class="divide-y divide-gray-200">
    <li v-for="person in searchResults" :key="person.customer_id" class="py-4 flex">
        <div class="ml-3">
            <p class="text-sm font-medium text-gray-900"> {{ person.first_name.toUpperCase() }} {{ person.last_name.toUpperCase() }}</p>
            <p class="text-sm font-medium"> Stevlika 1: {{ splitNumber(person.phone_number1) }} </p>
            <p class="text-sm font-medium" v-if="person.phone_number2"> Stevilka 2: {{ splitNumber(person.phone_number2) }}</p>
            <button @click="edit(person.customer_id)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 content-end focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
        </div>
    </li>
  </ul>
  </div>
</template>
<script>

import { supabase } from '../lib/supabaseClient';

export default {
    
  data() {
    return {
        customers: [],
        search: '',
        customer_id_new:'',
        first_name:'',
        last_name:'',
        email:'',
        phone_number1:'',
        phone_number2: '',
        showModal: false,
    }
  },
  methods: {

    async getCustomers(){
        const { data } = await supabase.from('customer').select()
        this.customers = data
        console.log("DATA:", this.customers);
    },

    splitNumber(number){
        var num = '0'.concat(number);
        if (num.length > 8){
            var firstThree = num.substring(0, 3)
            var secThree = num.substring(3, 6); 
            var lastThree = num.substring(6, 9);
            var wholeNumber = firstThree+' '+secThree+' '+lastThree;
            num = wholeNumber;
        }
        return num;
    }, 
   
    async edit(id_customer){
      this.showModal = true;
      const { data } = await supabase.from('customer').select().eq('customer_id', id_customer);
      this.customer_id_new = data[0].customer_id;
      this.first_name = data[0].first_name;
      this.last_name = data[0].last_name;
      this.email = data[0].email;
      this.phone_number1 = data[0].phone_number1;
      this.phone_number2 = data[0].phone_number2;
    },

    cancel(){
      this.customer_id_new='';
      this.first_name='';
      this.last_name='';
      this.email='';
      this.phone_number1='';
      this.phone_number2= '';
    },

    async update(){
      if (this.first_name && this.last_name && this.phone_number1 && this.customer_id_new) {
        const { data, error } = await supabase.from('customer')
        .update({ first_name: this.first_name, last_name: this.last_name, email: this.email, phone_number1: this.phone_number1, phone_number2: this.phone_number2 })
        .eq('customer_id', this.customer_id_new).select();

        if(error){
          console.log(error.message);
        }

        if(data){
          console.log(data);
        }
      }else{
        console.log("customer_id:", this.customer_id_new);
      }
    },

    async addNewCustomer(){
      //TODO not working
      if (this.first_name && this.last_name && this.phone_number1 && this.customer_id_new) {
        const { data, error } = await supabase
            .from('customer')
            .insert(
              {customer_id: parseInt(this.customer_id_new), 
              first_name: this.first_name, 
              last_name: this.last_name, 
              email: this.email, 
              phone_number1: this.phone_number1, 
              phone_number2: this.phone_number2}).select();

      }
    }
  },

  computed: {
    searchResults() {
      // Filter the data based on the search term
      return this.customers.filter(customer =>
      customer.first_name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.getCustomers()
  }
}
</script>