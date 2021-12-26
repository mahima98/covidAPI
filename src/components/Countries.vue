<template>
  <Menu />
  <div class="p-4 flex flex-wrap">
    <div
      v-for="(country, index) in countries"
      :key="country"
      :values="country"
      :numbers="index"
      class="p-2"
    >
      <router-link
        :to="{ name: 'singleCountry', params: { countryName: index } }"
        class="px-4 py-2 my-2 bg-red-700 rounded-xl text-white hover:bg-red-900"
        >{{ index }}</router-link
      >
    </div>
    <router-view :key="$route.params.countryName" />
  </div>
</template>
<script>
import Menu from "./Menu.vue";
export default {
  components: {
    Menu,
  },

  data: () => {
    return {
      countries: [],
      countriesData: [],
    };
  },

  mounted() {
    console.log("hi");
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countriesData.value = data;
        this.countries = this.countriesData.value;
      });
  },
};
</script>
