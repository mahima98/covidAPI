<template>
  <div class="container mx-auto">
    <div class="flex justify-center content-center text-center py-10">
      <div>
        COVID DETAILS FOR :
        <p class="text-2xl font-bold">{{ this.countryName }}</p>
        <div v-if="loader">loading..</div>
        <div v-else>done loading</div>
      </div>
    </div>
    <div>
      <div class="grid grid-cols-6 gap-4">
        <div
          v-for="(country, index) in countriesDetails.slice(0, 30)"
          :key="country"
          :values="country"
          :numbers="index"
        >
          <div class="p-5 bg-red-50 rounded-md">
            <div class="px-4 bg-red-400 rounded-md py-1 mb-4">
              Date: {{ country.date }}
            </div>
            <div class="px-4">Confirmed: {{ country.confirmed }}</div>
            <div class="px-4">Deaths: {{ country.deaths }}</div>
            <div class="px-4">Recovered: {{ country.recovered }}</div>
          </div>
        </div>
      </div>
    </div>
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
      loader: false,
    };
  },

  computed: {
    countryName() {
      return this.$route.params.countryName;
    },

    countriesDetails() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries[this.countryName].reverse();
    },
  },

  mounted() {
    this.loader = true;
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countries = data;
        this.loader = false;
      });
  },
};
</script>
