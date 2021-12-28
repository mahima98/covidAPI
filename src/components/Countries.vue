<template>
  <Menu />

  <div>
    <div class="p-4 flex flex-wrap">
      <div
        v-for="(country, index) in countries"
        :key="country"
        :values="country"
        :numbers="index"
        class="p-2"
      >
        <router-link
          :to="{
            name: 'singleCountry',
            params: { countryName: index },
          }"
          class="px-4 py-2 my-2 bg-red-700 rounded-xl text-white hover:bg-red-900"
          >{{ index }}</router-link
        >
      </div>
    </div>
    <div class="p-4 flex justify-center align-items">
      <input type="range" min="0" max="1200" v-model="myRange" width="400" />
      {{ myRange }}
    </div>
    <Country :key="$route.params.countryName" :inputRange="getRange" />
  </div>
</template>
<script>
import Menu from "./Menu.vue";
import Country from "./Country.vue";
export default {
  inheritAttrs: false,
  components: {
    Menu,
    Country,
  },

  data: () => {
    return {
      countries: [],
      countriesData: [],
      myRange: 150,
    };
  },

  computed: {
    getRange() {
      return this.myRange;
    },
  },

  mounted() {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countriesData.value = data;
        this.countries = this.countriesData.value;
      });
  },
};
</script>
<style></style>
