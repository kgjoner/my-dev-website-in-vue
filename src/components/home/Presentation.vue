<template>
  <section id="presentation">
    <div class="presentation__container">
      <div>
        <p class="presentation__text">I'm a web developer focused on frontend applications.</p>
        <p class="presentation__text">Not afraid of learning new techs or facing implementation challenges.</p> 
        <p class="presentation__text">Either way, all comes down to a concise and clean code.</p>
      </div>
      <div class="presentation__techs">
        <p class="presentation__text">
          <strong>My skills:</strong>
        </p>
        <div class="presentation__list-of-techs" 
          v-for="(tech, index) in techs" :key="index">
          <div class="presentation__tech-name">
            <span class="presentation__text presentation__text--bigger-line">{{tech.name}}</span>
          </div>
          <div v-for="(level, index) in new Array(tech.level)" 
            :key="index" class="presentation__level-counter"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Presentation",
  data: function() {
    return {
      techs: [
        {name: 'Vue', level: 8},
        {name: 'Node.js', level: 7},
        {name: 'React', level: 5},
        {name: 'React Native', level: 3},
        {name: 'Flutter', level: 3},
      ]
    }
  }
}
</script>

<style>
#presentation {
  width: 100vw;
  padding: 100px;
  background: var(--main-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.presentation__container {
  width: 680px;
}

.presentation__text {
  width: 100%;
  font-family: 'Baloo 2';
  color: #fff;
  font-size: 1.3rem;
  letter-spacing: 0.8px;
  text-align: left;
}

.presentation__techs {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.presentation__list-of-techs {
 display: flex;
 justify-content: flex-start; 
}

.presentation__text--bigger-line {
  line-height: 220%;
}

.presentation__tech-name {
  width: 10rem;
  display: flex;
}

.presentation__level-counter {
  height: 25px;
  width: 8px;
  border-radius: 2px;
  background-color: var(--bg-color);
  display: inline-block;
  margin: 0 5px;
  opacity: 0.9;
  position: relative;
  top: 7px;
}

@media(max-width: 780px) {
  #presentation {
    padding: 100px 40px;
  }

  .presentation__container {
    width: 100%;
  }
}
</style>