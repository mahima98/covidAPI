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
          v-model="value"
          class="px-4 py-2 my-2 bg-red-700 rounded-xl text-white hover:bg-red-900"
          >{{ index }}</router-link
        >
      </div>
    </div>
    <router-view :key="$route.params.countryName" v-model.number="value" />
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
      value: 150,
    };
  },
  mounted() {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countriesData.value = data;
        this.countries = this.countriesData.value;
      })
      .catch((error) => {
        console.log(error + "fetch");
      });
  },
};
</script>
<style></style>
