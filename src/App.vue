<script>

import NavbarComponent from '@/components/General/NavbarComponent.vue';

export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  components: {

    NavbarComponent,
  },
}
</script>

<template>
  <v-app>
      <NavbarComponent />
  </v-app>
</template>

<style>
* {
  font-family: 'Poppins', sans-serif;
}

.bold-text {
  font-weight: 700;
}

.semibold-text {
  font-weight: 500;

}

.normal-text {
  font-weight: 300;
}
</style>
