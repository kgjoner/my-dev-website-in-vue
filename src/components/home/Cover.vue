<template>
    <section class="cover" :id="sections.HERO">
        <div class="cover__container">
            <p v-for="(line, index) in text" :key="index" 
                class="cover__text" :class="{'cover__text--first': index === 0}" 
                ref="text">{{line}}</p>
        </div>
    </section>
</template>

<script>
import { sections } from '../../constants'

export default {
    name: "Cover",
    data: function() {
        return {
            text: [
                `Hi, I'm Kaio.`,
                'Let\'s build a website!',
            ],
            sections
        }
    }
}
</script>

<style>

.cover {
    position: relative;
    height: 100vh;
    width: 100%;
    background-image: url('../../assets/img/cover.jpg');
    background-size: cover;
    background-position: 70% 20%;

    display: flex;
    flex-direction: column;
    padding-right: 20vw;
    padding-top: 30vh;
    transform: scaleX(-1);
}

.cover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0e3c4d;
    opacity: 0.4;
}

.cover__container {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    transform: scaleX(-1);
    cursor: default;
    user-select: none;
}

.cover__text {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    line-height: 175%;
    font-size: 2.2rem;
    font-family:'Baloo 2', cursive;
    letter-spacing: 1px;
    text-align: left;
    max-width: 10vw;
    animation: appear 1s 1s backwards;
}

.cover__text--first {
    font-size: 1.7em;
    line-height: 150%;
    margin: 10px 0 0px 0;
    animation: appear 1s ease-out;
}

@keyframes appear {
    0%{
        position: relative;
        top: 30px;
        opacity: 0;
    }
    100% {
        position: relative;
        top: 0;
        opacity: 1;
    }
}

/* #cover .cover__container p.cover__text--first:first-letter {
    font-size: 2.2em;
    float: left;
} */

/* @media(max-width: 960px) {
    #cover {
        padding-left: 13vw;
        padding-right: 33vw;
    }
    #cover .cover__container > p.cover__text--first {
        font-size: 1.5em;
        line-height: 260%;
    }

    #cover .cover__container p.cover__text--first::first-letter {
        font-size: 2.2em;
    }

    #cover p {
        line-height: 175%;
        font-size: 1.3rem;
    }
    #cover .cover__container-block {
        margin-top: 40vh;
    }
} */

/* @media(max-width: 780px) {
    #cover {
        background-image: url('../../assets/img/cover.jpg');
        background-position: 75% 25%;
        padding-right: 40px;
        padding-left: 20px;
    }
    #cover .cover__container-block {
        margin-top: 40vh;
    }
}

@media(max-width: 475px) {
    #cover .cover__container {
        white-space: initial;
        margin-top: 5px;
    }
    #cover .cover__container > p.cover__text--first {
        font-size: 1.5em;
        line-height: 175%;
        margin-top: 0;
    }

    #cover .cover__container p.cover__text--first::first-letter {
        font-size: 1.8em;
    }
} */

</style>
