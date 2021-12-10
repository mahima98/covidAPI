<template>
  <Menu />
  food
  <router-view />
</template>

<script>
import Menu from "./Menu.vue";
export default {
  components: {
    Menu,
  },
};
</script>
