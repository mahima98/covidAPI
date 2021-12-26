<template>
  <div class="bg-red-900">
    <div class="grid grid-cols-5 text-white">
      <router-link to="/" class="hover:text-red-700 hover:bg-red-50 px-10 py-5"
        >Hw</router-link
      >
      <router-link
        to="/animals"
        class="hover:bg-red-50 hover:text-red-700 px-10 py-5"
        >Animals</router-link
      >
      <router-link
        to="/animals/dogs"
        class="hover:bg-red-50 hover:text-red-700 px-10 py-5"
        >Dogs</router-link
      >
      <router-link
        to="/covid/Mauritius"
        class="hover:bg-red-50 hover:text-red-700 px-10 py-5"
        >Covid (Mauritius | Bahamas)</router-link
      >
      <router-link
        to="/countries"
        class="hover:bg-red-50 hover:text-red-700 px-10 py-5"
        >Countries</router-link
      >
    </div>
  </div>
</template>
<style scoped></style>
