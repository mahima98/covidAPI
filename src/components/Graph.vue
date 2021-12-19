<template>
  <Menu />
  <div class="bg-yellow-500 p-4 text-center">In progress..</div>
  <div class="bg-blue-500 p-4 text-center">{{ dates }}</div>
  <div class="bg-blue-500 p-4 text-center">{{ deathValues }}</div>
  <div>
    <canvas id="covid-chart" height="100"></canvas>
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
      numbers: [],
      country: [],
      countriesData: [],
      countries: [],
      oneCountry: [],
      countryIndex: [],
      items: [],
      dates: [],
      deathValues: [],
      number: 2,
    };
  },

  computed: {
    totalMarks() {
      console.log("number", this.number);
      return this.number * 2;
    },

    countryName() {
      return "Mauritius";
    },

    allCountriesName() {
      if (this.countries.length === 0) {
        console.log("empty array");
        return [];
      } else {
        for (const [key, value] of Object.entries(this.countries)) {
          this.countryIndex = key;
        }
      }
    },

    deathValuessForOneCountry() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries["Mauritius"].filter((item, index) => {
        return item.deaths;
      });
    },
    datesForOneCountry() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries["Mauritius"].filter((item, index) => {
        return item.date;
      });
    },
  },

  mounted() {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countries = data;

        this.countries["Mauritius"].filter((item, index) => {
          if (index < 30) {
            this.dates.push(item.date);
            this.deathValues.push(item.deaths);
          }
        });

        this.loader = false;
      });
    console.log("dates", this.dates);
    console.log("deaths", this.deathValues);

    const covidChartData = {
      type: "line",
      data: {
        labels: this.dates.slice(0, 30),
        datasets: [
          {
            label: "Number of Moons",
            data: this.deathValues.slice(0, 30),
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
    new Chart(ctx, covidChartData);
  },
};
</script>
