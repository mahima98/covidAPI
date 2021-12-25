<template>
  <Menu />
  <div class="py-4">
    <canvas id="covid-chart" height="100"></canvas>
    <div class="p-4 flex justify-start align-items">
      <input
        type="range"
        min="0"
        max="1200"
        v-model="myRange"
        @change="changeRange"
      />
      {{ myRange }}
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Menu from "../components/Menu.vue";

export default {
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
      number: 2,
      covidChartData: [],
      myRange: 150,
      newRangeValue: "",
    };
  },

  computed: {
    totalMarks() {
      return this.number * 2;
    },

    countryName() {
      return "Mauritius";
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

    deathValuesForOneCountry() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries["Mauritius"].map((item, index) => {
        if (index <= 200) {
          return item.deaths;
        }
      });
    },

    datesForOneCountry() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries["Mauritius"].map((item, index) => {
        if (index <= 200) {
          return item.date;
        }
      });
    },
  },

  mounted() {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countries = data;

        // this.countries["Mauritius"].filter((item, index) => {
        //   if (index < 200) {
        //     this.dates.push(item.date);
        //     this.deathValues.push(item.deaths);
        //   }
        // });

        this.setCovidChartData(
          this.datesForOneCountry,
          this.deathValuesForOneCountry
        );
        this.loader = false;
      });
  },

  methods: {
    changeRange() {
      this.$emit("changeRange", this.myRange);
      console.log("changeRange-", this.myRange);
      return this.myRange;
    },
    setCovidChartData(dates, deathValues) {
      this.covidChartData = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Number of deaths",
              data: deathValues,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3,
            },
            //   {
            //     label: "covidary Mass (relative to the Sun x 10^-6)",
            //     data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
            //     backgroundColor: "rgba(71, 183,132,.5)",
            //     borderColor: "#47b784",
            //     borderWidth: 3
            //   }
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
};
</script>
