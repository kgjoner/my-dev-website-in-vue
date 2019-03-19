<template>
    <div id="cover">
        <div class="cover-text-block">
            <div class="cover-text">
                <p class="first" ref="text"></p>
            </div>
        </div>
        <div class="cover-button">
            <button class="button" ref="arrow" src="../../assets/img/arrow-down.gif" @click="type(verticalPosition)"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Cover",
    data: function() {
        return {
            verticalPosition: 0,
            text: [
                'Todos ouvimos histórias do passado.',
                'Muitas são contadas ao redor das fogueiras.',
                'Outras foram imortalizadas por canções.',
                'Há ainda aquelas que poucos conhecem ',
                'e que jamais são ditas em voz alta.'
            ]
        }
    },
    methods: {
        type(initial, duration = 1000, join = false) {
            if(initial < 5) {
                this.$refs.arrow.style.display = 'none';
                if (!join) {
                    this.$refs.text.innerHTML = '';
                } else {
                    this.$refs.text.innerHTML = this.$refs.text.innerHTML + '<br />';
                }
                if (initial !== 0) {
                    this.$refs.text.classList.remove('first')
                }
                const strLength = this.text[initial].length
                const arrayToType = this.text[initial].split('')
                const timeStep = duration/strLength
                const stepUp = (timestamp, oldPosition) => {
                    const position = oldPosition + 1
                    this.$refs.text.innerHTML = this.$refs.text.innerHTML + arrayToType[position];
                    if (position < strLength - 1) {
                        setTimeout(() => {
                            window.requestAnimationFrame((timestamp) =>  stepUp(timestamp, position))
                        }, timeStep)
                    } else {
                        this.verticalPosition += 1;
                        if (initial%2 === 1 && window.innerWidth > 475) {
                            const newInitial = initial + 1;
                            this.type(newInitial, duration, true)
                        } else {
                            this.$refs.arrow.style.display = 'initial';
                        }
                    }
                }
                window.requestAnimationFrame((timestamp) =>  stepUp(timestamp, -1))
            } else {
                this.scrollIt(document.getElementById('books'))
                setTimeout(() => {
                    this.$refs.text.classList.add('first')
                    this.$refs.text.innerHTML = this.text[0]
                    this.verticalPosition = 1;
                }, duration)
            }
        },
        scrollIt(destination, duration = 900) {
            const start = window.pageYOffset;
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

            const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
            const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
            const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

            function scroll() {
                const now = 'now' in window.performance ? performance.now() : new Date().getTime();
                const time = Math.min(1, ((now - startTime) / duration));
                window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start -40)) + start));
                if(Math.ceil(window.scrollY) < (destinationOffsetToScroll-40)) {
                    window.requestAnimationFrame(scroll);
                }
            }
            window.requestAnimationFrame(scroll)
        }
    },
    mounted() {
        setTimeout(()=> {
            this.type(0)
        }, 500)
    }
}
</script>

<style>

#cover {
    position: relative;
    height: calc(100vh - 90px);
    background-image: url('../../assets/img/homecover.jpg');
    background-size: cover;
    background-position: 0% 25%;

    display: flex;
    flex-direction: column;
    padding-left: 13vw;
    padding-top: 100px;
    padding-right: 44vw;
    max-width: 100vw;
}

#cover .cover-text-block {
    margin-top: 18vh;
    text-align: left;
    height: calc(5.2rem + 24px);
    overflow: hidden;

    background-color: rgba(0,0,0,0.45);
    border-radius: 15px;
    padding: 10px 20px;
}

#cover .cover-text {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
}

#cover .cover-text > p.first {
    font-size: 1.5em;
    line-height: 250%;
    margin: 10px 0 10px 0;
}

#cover .cover-text p.first:first-letter {
    font-size: 2.2em;
    float: left;
}

#cover p {
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 175%;
    font-size: 1.5rem;
    font-family: "Bubblegum Sans";
    font-style: italic;
    letter-spacing: 1px;
}

#cover .cover-button {
    position: relative;
    max-width: 25px;
    height: 25px;
    overflow: hidden;
    align-self: center;
    top: -12px;
    animation: shake 1s infinite;
    border-radius: 2px;
}

#cover .button {
    display: none;
    border: 3px solid rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.8);
    height: 25px;
    width: 25px;
    transform: rotate(45deg);
    position: relative;
    top: -12px;
    cursor: pointer;
    outline: none;
    animation: appear 0.2s;
}

@keyframes shake {
    0%   {top:-12px;}
    50%   {top:-8px;}
    100%   {top:-12px;}
}

@keyframes appear {
    0% {opacity: 0}
    100% {opacity: 1}
}

#cover .animated-arrow {
    animation-name: shake;
    animation-duration: 1s;
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
        background-image: url('../../assets/img/homecover-mob.jpg');
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
