<template>
	<div class="items-center w-80 h-screen overflow-hidden text-gray-400 bg-gray-900 rounded float-left">
		<div class="flex items-center w-full px-3 mt-3">
			<div class="flex flex-col items-center w-full mt-3 border-gray-700">
				<button @click="signOut" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 content-end focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Odjava</button>
			</div>
		</div>

		<div class="flex items-center w-full px-3 mt-3">
			<div class="flex flex-col items-center w-full mt-3 border-gray-700">
				<select id="company_id" @change="setCompany" v-model="selectedCompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option selected>Izberi podjetje</option>
					<option v-for="company in companies" :value="company.id"> {{ company.company_name }}</option>
				</select>
			</div>
		</div>

		<a class="flex items-center w-full px-3 mt-3" href="#">
			<svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
			</svg>
			<span class="ml-2 text-sm font-bold">DIS</span>
		</a>
		<div class="w-full px-2">
			<div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
		
					<RouterLink class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/">Domov
						
					</RouterLink>
				
					<RouterLink class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/search">Iskanje
						
					</RouterLink>
			</div>
			<div class="flex flex-col items-center w-full mt-2 border-t border-gray-700">
				<RouterLink class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/products">Produkti
						
					</RouterLink>
					<RouterLink class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/customers">Stranke
						
					</RouterLink>
					<RouterLink class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/settings">Nastavitve
						
					</RouterLink>
			</div>
		</div>
		
    </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient';
import { store } from '../store'
export default {

	data() {
    	return {
			companies: [],
			selectedCompany: 'Izberi podjetje',
		}
	},

	methods: {
		async signOut() {
			store.state.user = null;
			const { error } = await supabase.auth.signOut();
			
		},

		async getCompanies(){
			const { data, error } = await supabase.from('company').select();
			this.companies = data;
		},

		setCompany(){
			console.log("SELECTED: ", this.selectedCompany);
			sessionStorage.setItem("CompanyId", this.selectedCompany);
			window.parent.location.reload();
		},

		getCompanyId(){
			if (sessionStorage.getItem("CompanyId") <= 0) {
				return
			}
			this.selectedCompany = sessionStorage.getItem("CompanyId");
		}
	},
	mounted() {
		this.getCompanies();
		this.getCompanyId();
  	}
}

</script>