<template>
  <header>

    <div class="wrapper">
      
    </div>
  </header>

  <SignIn v-if="!store.state.user"/>
  <RouterView v-else/>
  

</template>


<script>
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient';
import { store } from './store'
import SignIn from './components/SignIn.vue';

export default {
  components: { SignIn },
    setup() {
        // we initially verify if a user is logged in with Supabase
        store.state.user = supabase.auth.getUser();
        // we then set up a listener to update the store when the user changes either by logging in or out
        supabase.auth.onAuthStateChange((event, session) => {
          if (event == "SIGNED_OUT") {
            store.state.user = null;
          } else {
            store.state.user = session;
          }
        });

        return {
          store,
      };
    },
    
    
}

</script>

