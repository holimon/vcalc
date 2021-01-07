<template>
  <div class="home">
    <ProgrammerCalculator></ProgrammerCalculator>
  </div>
</template>

<script>
// @ is an alias to /src
import ProgrammerCalculator from  "@/components/ProgrammerCalculator"

export default {
  name: "Home",
  components: {
    ProgrammerCalculator
  },
};
</script>
