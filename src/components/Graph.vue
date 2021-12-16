<template>
  <Menu />
    <div class="bg-yellow-500 p-4 text-center">In progress..</div>
  <div class="p-4 bg-blue-400">{{oneCountriesDetails}}</div>
  <div>
    <canvas id="covid-chart" height="100"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import Menu from "../components/Menu.vue";

export const covidChartData = {
  type: "line",
  data: {
    labels: [
      "Mercury",
      "Venus",
      "Earth",
      "Mars",
      "Jupiter",
      "Saturn",
      "Uranus",
      "Neptune",
    ],
    datasets: [
      {
        label: "Number of Moons",
        data: [0, 0, 1, 2, 79, 82, 27, 14],
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

export default {
  components: {
    Menu,
  },
  data: () => {
    return {
      numbers: [],
      countriesData: [],
      countries: [],
      items: [],
      number: 2
    };
  },
  computed: {
    totalMarks() {
      console.log('number', this.number);
      return this.number * 2;
    },
    countryName() {
      return 'Mauritius';
    },
   countriesDetails() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries;
    },
    oneCountriesDetails() {
      if (this.countries.length === 0) {
        return [];
      }
      return this.countries['Mauritius'].filter((item, index) => {
        return console.log(index);
      });
    },
    
  },

  mounted() {
    const ctx = document.getElementById("covid-chart");
    new Chart(ctx, covidChartData);
    console.log("covidChartData", covidChartData);

    const numbers = [1, -1, 3, 4];
    const filtered = numbers.filter((item) => {
      return item;
    })
    console.log(filtered);

    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => res.json())
      .then((data) => {
        this.countries = data;
        this.loader = false;
      });
  },
};
</script>
.
