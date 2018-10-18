<template>
  <v-layout
    >
    <!-- <v-flex
      xs12
      sm8
      md6>
      <div v-for="item in $store.state.siteMeta" style="margin-bottom: 10px">
        <h2>{{ item.title}}</h2>
        {{ item.excerpt}}
     
      </div>
      
    </v-flex> -->
    <v-flex xs12 sm6>
       <div v-for="item in $store.state.siteMeta" :key="item.id" style="margin-bottom: 10px">
      <v-card>
       

        <v-card-title primary-title>
          <div>
            <router-link :to="item.route">
              <h3 class="headline mb-0">{{ item.title}}</h3>
            </router-link>
            <div>{{ item.excerpt}}</div>
          </div>
        </v-card-title>

       
      </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  watchQuery: true
}
</script>
