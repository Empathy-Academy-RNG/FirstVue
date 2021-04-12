<template>
  <div class="about">
    <h1>Origin</h1>
    <p>
      This page is a project done by Raúl Núñez García, María Flórez Miranda and
      Ricardo Soto Estévez while enrolled as interns in the Empathy Academy.
    </p>
    <p>
      It is meant to showcase the concepts learned during the Front-end and
      Search paths.
    </p>
    <img src="../assets/empathy-logo.gif" alt="Logo of Empathy.co" />
  </div>
</template>

<script>
export default {
  name: "AboutPanel"
};
</script>

<style scoped>
h1 {
  margin-top: 140px;
  margin-bottom: 50px;
  color: white;
}

p {
  color: white;
  width: 50%;
  font-size: 1.5em;
  margin: 0 auto;
  letter-spacing: 1px;
  line-height: 2em;
}

img {
  margin-top: 100px;
  background-color: white;
  padding: 20px;
  border-radius: 50%;
}
</style>
