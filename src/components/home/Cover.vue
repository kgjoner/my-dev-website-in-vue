<template>
    <div id="cover">
        <div class="cover-text">
            <p v-for="(line, index) in text" :key="index" 
                :class="{'first': index === 0}" ref="text">{{line}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Cover",
    data: function() {
        return {
            text: [
                `Hi, I'm Kaio.`,
                'I build websites.',
                // `I'm a web developer focused on frontend applications.`,
                // `I'm not afraid of learning new techs or facing`,
                // `implementation challenges. Either way, all comes`,
                // `down to a concise and clean code.`,
            ]
        }
    }
}
</script>

<style>

#cover {
    position: relative;
    height: 100vh;
    background-image: url('../../assets/img/cover.jpg');
    background-size: cover;
    background-position: 0% 20%;

    display: flex;
    flex-direction: column;
    padding-right: 20vw;
    padding-top: 30vh;
    max-width: 100vw;
    transform: scaleX(-1);
}

#cover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0e3c4d;
    opacity: 0.4;
}

#cover .cover-text {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    transform: scaleX(-1);
    cursor: default;
    user-select: none;
}

#cover .cover-text > p.first {
    font-size: 2.2em;
    line-height: 180%;
    margin: 10px 0 10px 0;
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

/* #cover .cover-text p.first:first-letter {
    font-size: 2.2em;
    float: left;
} */

#cover p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    line-height: 175%;
    font-size: 1.7rem;
    font-family:'Baloo 2', cursive;
    letter-spacing: 1px;
    text-align: left;
    max-width: 10vw;
    animation: appear 1s 1s backwards;
}

@media(max-width: 960px) {
    #cover {
        padding-left: 13vw;
        padding-right: 33vw;
    }
    #cover .cover-text > p.first {
        font-size: 1.5em;
        line-height: 260%;
    }

    #cover .cover-text p.first::first-letter {
        font-size: 2.2em;
    }

    #cover p {
        line-height: 175%;
        font-size: 1.3rem;
    }
    #cover .cover-text-block {
        margin-top: 40vh;
    }
}

@media(max-width: 780px) {
    #cover {
        background-image: url('../../assets/img/kgjoner-mob.jpg');
        background-position: 75% 25%;
        padding-right: 40px;
        padding-left: 20px;
    }
    #cover .cover-text-block {
        margin-top: 40vh;
    }
}

@media(max-width: 475px) {
    #cover .cover-text {
        white-space: initial;
        margin-top: 5px;
    }
    #cover .cover-text > p.first {
        font-size: 1.5em;
        line-height: 175%;
        margin-top: 0;
    }

    #cover .cover-text p.first::first-letter {
        font-size: 1.8em;
    }
}

</style>
