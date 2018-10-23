<template>

    <div class="hero-section">
        <div class="hero-section-text" aria-label="Illinois HEALS: A multi-year initiative to address child and youth victimization">

            <span class=" brand-state hero">Illinois</span>
            <span class="brand-name hero ">&nbsp;|&nbsp;Criminal Justice Coordinating Councils</span>
            <h3 class="mt-3 hero-sub">Sponsored by the Illinois Criminal Justice Information Authority</h3>
           
        </div>
    </div>



</template>

<style>
.hero-section {
  background: url('../assets/img/slider1.jpg') 50% no-repeat;
  background-size: cover;
  height: 550px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  /* margin-top: 71px; */
}
img:before {
  content: attr(alt);
}
.hero-section-text {
  color: #fff;
}
.brand-name.hero,
.brand-state.hero {
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  text-transform: uppercase;
  font-weight: 900;
}
.brand-state.hero {
  color: #aaa;
}
.highlight {
}
h4 {
  color: #222;
  font-weight: 400;
}
.hero-sub {
  /* background: #fff;
        padding: 3px 5px 3px 5px; */
  font-weight: 800;
  color: #aaa;
}
.logo {
  margin-top: 25px;
}
</style>