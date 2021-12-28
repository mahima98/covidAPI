<template>
  <div class="container mx-auto">
    <div class="flex justify-center content-center text-center py-10">
      <div>
        COVID DETAILS FOR :
        <p class="text-2xl font-bold">{{ this.countryName }}</p>
        <div v-if="loader">loading..</div>
        <div v-else></div>
      </div>
    </div>
    <div class="py-4">
      range: {{ getRangeValue }}

      <!-- graph -->
      <canvas id="covid-chart" height="100"></canvas>
    </div>

    <!-- countries covid info -->
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
import Chart from "chart.js";
import Menu from "./Menu.vue";

export default {
  inheritAttrs: false,
  props: ["inputRange"],
  components: {
    Menu,
  },
  data: () => {
    return {
      country: [],
      countriesData: [],
      countries: [],
      oneCountry: [],
      countryIndex: [],
      covidChartData: [],
      errorMsg: "",
      loader: false,
    };
  },

  computed: {
    countryName() {
      return this.$route.params.countryName;
    },

    getRangeValue() {
      return this.$props.inputRange;
    },

    countriesDetails() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries[this.countryName].reverse();
    },

    getCountryLength() {
      return this.countries[this.countryName].length;
    },

    allCountriesName() {
      if (this.countries.length === 0) {
        return [];
      } else {
        for (const [key, value] of Object.entries(this.countries)) {
          this.countryIndex = key;
        }
      }
    },

    deathValues() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countriesDetails.map((item, index) => {
        if (index < this.getRangeValue) {
          return item.deaths;
        }
      });
    },

    dateValues() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countriesDetails.map((item, index) => {
        if (index < this.getRangeValue) {
          return item.date;
        }
      });
    },

    recoveredValues() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countriesDetails.map((item, index) => {
        if (index < this.getRangeValue) {
          return item.recovered;
        }
      });
    },
  },

  mounted() {
    this.loader = true;
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countries = data;

        console.log(this.countries[this.countryName].length);

        this.renderChart(
          this.dateValues,
          this.deathValues,
          this.recoveredValues
        );
        this.loader = false;
      })
      .catch((error) => {
        this.errorMsg = error;
      });
  },

  methods: {
    // changeRange() {
    //   this.$emit("changeRange", this.myRange);
    //   console.log("changeRange-", this.myRange);
    //   return this.myRange;
    // },
    renderChart(dateValues, deathValues, recoveredValues) {
      this.covidChartData = {
        type: "line",
        data: {
          labels: dateValues,
          datasets: [
            {
              label: "Number of deaths",
              data: deathValues,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 1,
            },
            {
              label: "Recovered",
              data: recoveredValues,
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
      };
      const ctx = document.getElementById("covid-chart");
      new Chart(ctx, this.covidChartData);
    },
  },

  // Another way to track changes when changing from a certain value is by using watch
  watch: {},
};
</script>
