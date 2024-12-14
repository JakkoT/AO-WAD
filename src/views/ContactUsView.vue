<template>
  <div>
    <HeaderComp></HeaderComp>
    <div class="form-container">
      <h1>Our contacts:</h1>
      <p>jakko.turro@ut.ee</p>
      <p>katryn.varkel@ut.ee</p>
    </div>
  </div>
  <FooterComp></FooterComp>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "ContactUs",
  components: {
    DropdownMenu,
    HeaderComp,
    FooterComp,
  },
};
</script>

<style></style>
