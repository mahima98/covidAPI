<template>
  <Menu />
  <div v-if="loader" class="flex justify-center items-center">
    <div
      class="bg-bluegrey-200 w-40 h-10 flex items-center text-bluegrey-50 font-semibold p-4 rounded"
    >
      <svg
        class="animate-spin h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Loading...
    </div>
  </div>
  <div v-else>
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
          class="px-4 py-2 my-2 bg-bluegrey-700 rounded-xl text-white hover:bg-bluegrey-900"
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
      value: 700,
      loader: false,
    };
  },
  mounted() {
    this.loader = true;
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countriesData.value = data;
        this.countries = this.countriesData.value;
        this.loader = false;
      })
      .catch((error) => {
        console.log(error + "fetch");
      });
  },
};
</script>
<style></style>
