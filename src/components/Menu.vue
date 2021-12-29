<template>
  <div class="m-4 shadow-xl rounded-xl">
    <div class="bg-bluegrey-900 text-white">
      <div class="grid grid-cols-5 text-white">
        <router-link to="/" class="hover:bg-bluegrey-800 px-10 py-5"
          >Hw</router-link
        >
        <router-link to="/animals" class="hover:bg-bluegrey-800 px-10 py-5"
          >Animals</router-link
        >
        <router-link to="/animals/dogs" class="hover:bg-bluegrey-800 px-10 py-5"
          >Dogs</router-link
        >
        <router-link
          to="/covid/Mauritius"
          class="hover:bg-bluegrey-800 px-10 py-5"
          >Covid (Mauritius | Bahamas)</router-link
        >
        <router-link to="/countries" class="hover:bg-bluegrey-800 px-10 py-5"
          >Countries</router-link
        >
      </div>
    </div>
  </div>
</template>
<style scoped></style>
