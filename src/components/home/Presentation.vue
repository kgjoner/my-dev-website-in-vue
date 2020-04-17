<template>
  <section id="presentation">
    <div class="presentation-text">
      <p>I'm a web developer focused on frontend applications.</p>
      <p>Not afraid of learning new techs or facing implementation challenges.</p> 
      <p>Either way, all comes down to a concise and clean code.</p>
    </div>
    <div class="techs-level">
      <p><strong>My skills:</strong></p>
      <div v-for="(tech, index) in techs" :key="index">
        <div class="tech-name">
          <span>{{tech.name}}</span>
        </div>
        <div v-for="(level, index) in new Array(tech.level)" 
          :key="index" class="level-counter"></div>
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

#presentation > div {
  width: 680px;
}

#presentation p,
#presentation span {
  width: 100%;
  font-family: 'Baloo 2';
  color: #fff;
  font-size: 1.3rem;
  letter-spacing: 0.8px;
  text-align: left;
}

#presentation .techs-level {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#presentation .techs-level > div {
 display: flex;
 justify-content: flex-start; 
}

#presentation .techs-level span {
  line-height: 220%;
}

#presentation .techs-level .tech-name {
  width: 10rem;
  display: flex;
}

#presentation .techs-level .level-counter {
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

  #presentation > div {
    width: 100%;
  }
}
</style>