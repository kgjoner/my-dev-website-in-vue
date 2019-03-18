<template>
    <div class="quotes">
        <b-carousel id="carousel1" :interval="20000" indicators img-height="500"   v-model="slide">
            <b-carousel-slide v-for="(quote, i) in sortedQuotes" :key="i" img-blank>
                <div class="quote-group">
                    <h1 class="icon">"</h1>
                    <p class="true-quote">{{quote.text}}</p>
                    <p class="ref-quote">{{quote.reference}}</p>
                </div>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
export default {
    name: "Quotes",
    data: function() {
        return {
            quotes: [
                { 
                    text: 'São os mistérios que nos mantêm vivos, afinal, a dança da vida consiste justamente em perseguir suas revelações. As incertezas nos dão esperanças, nos fazem sonhar e contestar nossos sonhos, nos fazem cogitar prováveis soluções e nos movem ao longo de caminhos que as comprovem ou refutem. Uma pessoa morre ao matar os seus mistérios.',
                    reference: '— O Cavaleiro de Sirius'
                }, {
                    text: 'A vida não está nas certezas da mente, mas nas incertezas da alma.',
                    reference: '— O Cavaleiro de Sirius'
                }, {
                    text: 'Somos feitos de matéria e energia e constituídos de crenças e valores, que nos preenchem. Mas também somos os nossos vazios.',
                    reference: '— O Cavaleiro de Sirius'
                }, {
                    text: 'Certas coisas não podem ser sacrificadas. O problema é que toda grande decisão exige sacrifícios. Escolher um caminho é abrir mão de todos os outros. Então quanto mais cedo descobrirem o que não deve ser sacrificado, mais fáceis serão as provações.',
                    reference: '— Um Anseio pelas Artes Proibidas'
                }, {
                    text: 'Você, e somente você, pode alimentar o que carrega na mente. O curioso é que as pessoas tendem a alimentar justamente o que se volta contra elas mais cedo ou mais tarde. Será que não percebem que, no fim dos dias, é só isso o que lhes restará?',
                    reference: '— Um Anseio pelas Artes Proibidas'
                }, {
                    text: 'Você nunca vai estar preparado. Mas vai precisar partir mesmo assim, se atender ao seu chamado. Todos recebem um alguma vez na vida, poucos o percebem.',
                    reference: '— O Chamado do Caçador'
                }
            ]
        }
    },
    computed: {
        sortedQuotes() {
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }
            return shuffle(this.quotes)
        }
    }
}
</script>

<style>

.quotes {
    padding: 40px 60px 20px 60px;
    min-height: 90vh;
    max-width: 100vw;
    background-color: #555;
}

#carousel1, .carousel-inner {
    min-height: 70vh;
    overflow: visible;
}

.quotes .carousel-item {
    position: relative;
    outline: none;
    height: 70vh;
    max-width: 55rem;
    width: 70vw;
    margin-left: 10vw;
}

.carousel-item .carousel-caption {
    top: 10px;
}

.quote-group {
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 60vh;
}

.quotes .icon {
    position: relative;
    font-family: "Kalam";
    font-size: 3.5em;
    color: rgba(255,255,255,0.8);
    top: 1.5rem;
    left: -0.5rem;
    transform: rotate(10deg)
}

.true-quote {
    text-align: left;
    color: rgba(255,255,255,0.9);
    font-size: 1.5rem;
    line-height: 175%;
    font-family: 'Kalam';
    padding-left: 2rem;
    position: relative;
    top: -40px;
}

.ref-quote {
    flex-grow: 2;
    position: absolute;
    bottom: 0px;
    right: 0px;
    /* font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
    font-family: "Philosopher";
    font-weight: bold;
    color: rgba(255,255,255,0.8);
    letter-spacing: 0.8px;
}

.quotes .carousel-indicators {
    bottom: -40px;
}

@media(max-width: 980px) {
    .carousel-item {
        margin-left: 5vw;
        /* margin-right: 0; */
    }
    .carousel-item .carousel-caption {
        left: 0px;
        right: 20px;
    }
    .true-quote {
        font-size: 1.3rem;
    }
}

@media(max-width: 740px) {
    .carousel-item {
        margin-left: 0;
        margin-right: 0;
    }
    .carousel-item .carousel-caption {
        left: -20px;
        right: 20px;
    }
}

@media(max-width: 600px) {
    .carousel-item .carousel-caption {
        left: -50px;
    }
    .true-quote {
        font-size: 1.2rem;
    }
} 

@media(max-width: 530px) {
    .quotes {
        height: 100vh;
        padding-right: 0;
        padding-left: 0;
    }
    #carousel1, .carousel-inner {
        height: 80vh;
    }
    .carousel-item {
        height: 80vh;
    }
    .true-quote {
        left: 40px;
    }
    .quotes .icon {
        left: calc(60px - 2rem);
        top: 2.2rem;
    }
    .ref-quote {
        bottom: -60px;
    }
}
</style>
