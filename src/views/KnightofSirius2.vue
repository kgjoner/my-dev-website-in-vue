<template>
    <div class="knight-of-sirius">
        <div class="header-title">
            <img src="@/assets/img/title-sirius.png" alt="">
        </div>
        <div id="book" class="book-page">
            <div class="presentation">
                <div class="book-details">
                    <div class="synopsis">
                        <p>Garef sempre soube que pagaria um preço pelo 
                            manto azul. Pela espada. Pela <span style="color: #4286f4;">magia</span>.</p>
                        <p>Recém-sagrado cavaleiro, confuso e traído, ele precisa entender o que se passou no último teste. Mas para isso, 
                            ele deve não só quebrar um Juramento, como colocar em risco um dos segredos mais bem guardados de Velgard.</p>
                        <p>Druidas, amantes, seres mágicos e outros cavaleiros influenciam seu caminho, quer seja para
                            o bem ou para o mal.</p>
                    </div>
                </div>
            </div>
            <div class="stores-banner">
                <img v-for="(store, index) in stores" :key="index" :src="store.image" alt="">
            </div>
        </div>
        <div id="order">
            <h2>A Ordem</h2>
            <h6>"Esses cavaleiros conseguem manipular o fogo-frio como se fosse água, mas o que mais me assombra é o controle
                resoluto que eles têm sobre a própria vontade."
            </h6>
            <h6 class="note-reference">
                – Notas encontradas em Aquisgrapel
            </h6>
            <div class="story-box">
                <div class="page-order" ref="pageOrder">
                    <div>
                        <p>Forjados na reclusão e no silêncio, os cavaleiros de Sirius buscam a mais difícil das tarefas: alcançar a
                             maestria da <span style="color: #4286f4;">alma</span>.</p>
                        <p> Mas tolos são os que pensam que isso significa paz de espírito. </p>
                        <p> Eles precisam, afinal, ser testados, perturbados, jogados no mundo além de suas muralhas.</p>
                    </div>
                    <div>
                        <p>São treinados tanto em armas quanto nas leis da natureza, não apenas para entendê-la, mas para manipulá-la 
                            através da signomancia.</p>
                        <p>Essa é a arte das <span style="color: #4286f4;">runas</span>, a arte que eles trazem tatuada na pele. Ela talvez seja sua maior 
                            marca; ao menos, é o que mais chama atenção por onde passam, e o que mais os torna temidos.</p>
                    </div>
                    <div>
                        <p>Nem reis nem magos sabem o que se passa dentro da Ordem. O mundo desconhece sua vontade e seus caminhos. E até
                            cavaleiros ungidos permanecem à margem dos maiores segredos.</p>
                        <p>Os Grandes Mestres dizem que todo esse cuidado é em nome de um <span style="color: #4286f4;">bem</span> maior.</p>
                        <p>Será?</p>
                    </div>
                </div>
            <!-- <span>{{pageOrder}}/3</span> -->
            <!-- <button class="button-preview" :class="{'active': pageOrder > 1}" @click="previewOrder"><p>c</p></button> -->
            <!-- <button class="button-next" :class="{'active': pageOrder < 3}" @click="nextOrder"><p>K</p></button> -->
            </div>
        </div>
        <div id="signomancy">
            <h2>O Continente</h2>
            <div class="story-box" ref="sigBox">
                <img src="@/assets/img/mapa_de_velgard_grey.jpg" width="90%" style="opacity: 0.8" alt="">
                <div class="img-shadow"></div>
            </div>
        </div>
        <!-- <div id="runes">
            <h2>Runas e o Alfabeto Arcano</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis venenatis nulla non euismod. 
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce eget viverra ex. Nunc sollicitudin 
                eros vitae orci accumsan mollis. </p> 
            <p>Vestibulum turpis quis nulla interdum, ac fermentum augue eleifend. Nam arcu mi, tristique at accumsan 
                vitae, dapibus ac ante. Vivamus id diam tellus. Aliquam hendrerit tempus urna quis consectetur. Curabitur 
                sit amet lacinia dui. Integer malesuada convallis fringilla.</p>
            <p>Aenean rutrum ullamcorper turpis, sit amet venenatis eros euismod et. Fusce convallis risus ullamcorper, 
                pretium diam eu, tempor mauris. Nullam in arcu eu elit efficitur pretium eget vel quam. Quisque fermentum 
                imperdiet magna, ac lobortis velit vehicula in. </p>

                Forjados na reclusão e no silêncio, os cavaleiros de Sirius buscam a mais difícil das tarefas: alcançar a
                maestria da alma. Mas tolos são os que pensam que isso significa paz de espírito. Eles precisam, afinal, ser 
                testados, perturbados, jogados no mundo além de suas muralhas.

                Assim, são treinados tanto em armas quanto nas leis da natureza, não apenas para entendê-la, mas para manipulá-la 
                através da signomancia. Essa é a arte das runas, a arte que eles trazem tatuada na pele. Talvez isso seja sua maior 
                marca, ou ao menos, é o que mais chama atenção por onde passam, o que mais os torna temidos.

                Nem reis nem magos sabem o que se passa dentro da Ordem. O mundo desconhece sua vontade e seus caminhos. E até
                cavaleiros sagrados permanecem à margem dos maiores segredos.
                
                Os Grandes Mestres dizem que todo esse cuidado é em nome de um bem maior. Será?
        </div> -->
        <div id="runes" class="bottom-links">              
                <h5>Descubra um novo mundo.</h5>
                <h5 class="before-links">Encontre a <span style="color: #4286f4;">Maestria.</span></h5>
                <img :src="coverCdS" :alt="title">
                <div class="book-links">  
                    <button @click="openPopup()">Garanta a sua cópia!</button>
                </div>
                <div class="stores-banner">
                    <img v-for="(store, index) in stores" :key="index" :src="store.image" alt="">
                </div>
        </div>
        <div class="last-quote">
            <h6>"A vida não está nas certezas da mente, mas nas incertezas da alma."</h6>
        </div>
        <div class="book-page">
            <Stores :stores="stores" />
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '../components/template/Footer'
import Stores from "../components/template/StoresPopup"
import coverCdS from '../assets/img/cover-sirius.png'
import amazon from '../assets/img/logo-amazon.svg'
import catarinense from '../assets/img/logo-catarinense.svg'

import { mapState } from 'vuex'

export default {
    name: "KnightofSirius",
    components: { Footer, Stores },
    data: function() {
        return {
            coverCdS,
            amazon,
            catarinense,
            stores: [{
                image: amazon,
                link: 'https://amzn.to/2MQyUYT',
                linkName: 'Ebook',
                link2: 'https://www.amazon.com.br/Cavaleiro-Sirius-K-G-Joner/dp/8592485312/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1530819304&sr=8-2-fkmrnull',
                link2Name: 'Impresso'
            }, { image: catarinense,
                obs: 'Disponível nas lojas da Grande Florianópolis',
            }]
        }
    },
    computed: {
        ...mapState(['pageOrder', `allowChange`]),
        defaultFontSize() {
            return Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
        }
    },
    methods: {
        openPopup() {
            document.getElementsByClassName('stores-popup-bg')[0].style.display = 'block';
        },
        nextOrder() {
            if(this.pageOrder < 3) {
                this.pageOrder += 1;
            }
        },
        previewOrder() {
            if(this.pageOrder > 1) {
                this.pageOrder -= 1;
            }
        }
    },
    beforeCreate() {
        window.scrollTo(0, 0)
    },
    mounted() {
        document.getElementsByClassName('content')[0].classList.add('content-ready')
    },
    watch: {
        pageOrder(to, from) {
            const targetStyle = window.getComputedStyle(this.$refs.pageOrder, null)
            const start = parseInt(targetStyle.getPropertyValue('left').split('px'));
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
            const increment = (35*this.defaultFontSize+50)/800;
            const target = -(to - 1)*(35*this.defaultFontSize+50);

            const vueComp = this;
            
            function turnPage() {
                const now = 'now' in window.performance ? performance.now() : new Date().getTime();
                const time = now - startTime;

                if(to > from) {
                    const newLeft = Math.max(start - time*increment, target)
                    vueComp.$refs.pageOrder.style.left = `${newLeft}px`;
                    if(newLeft !== target) {
                        window.requestAnimationFrame(turnPage)
                    } else {
                        vueComp.$store.state.allowChange = true
                    }
                } else {
                    const newLeft = Math.min(start + time*increment, target)
                    vueComp.$refs.pageOrder.style.left = `${newLeft}px`;
                    if(newLeft !== target) {
                        window.requestAnimationFrame(turnPage) 
                    } else {
                        vueComp.$store.state.allowChange = true
                    }
                }
            }
            
            turnPage()
        }
    }
}
</script>

<style>
@font-face {
    font-family: "Acadian Runes";
    src: url("../assets/fonts/AcadianRunes-Regular.ttf");
}

@font-face {
    font-family: "Rune";
    src: url("../assets/fonts/Rune.ttf");
}

.knight-of-sirius {
    background-color: #eeeae7;
    max-width: 100vw;
}

.header-title {
    position: fixed;
    padding: 20px 0px 20px 0px;
    width: 300px;
    background-color:hsla(0,0%,15%,  1);
    z-index: 99;
    animation-name: title;
    animation-duration: 1s;
    top: -20px;
    clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%);
}

.header-title img {
	margin: 0 40px 0 0;
	height: 90px;
	opacity: 0.8;
}

.knight-of-sirius .book-page {
    background-position: top center;
    background-attachment: fixed;
    position: relative;
}

.knight-of-sirius .book-page:before {
    content:'';
    background-image: url('../assets/img/ProfileLeft_red.jpg');
    background-size: calc(100vh - 90px);
    background-position: 10% bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 120px;
    left: 0;
    opacity: 0.2;
}

.knight-of-sirius .presentation {
    margin-left: 40%;
}

.knight-of-sirius .synopsis > p:first-of-type {
    font-family: "Acadian Runes";
    font-size: 2rem;
    line-height: 150%;
    color: #444;
}

.knight-of-sirius .synopsis > p:nth-child(2)::first-letter,
#order p:first-of-type::first-letter, #signomancy p:first-of-type::first-letter, 
#runes p:first-of-type::first-letter {
    font-size: 4rem;
    float: left;
    padding-top: 16px;
    padding-right: 4px;
}

.knight-of-sirius .synopsis > p:nth-child(2) {
    margin-top: 50px;
}

.knight-of-sirius .synopsis > p:nth-child(n+2) {
    color: #444;
}

#order, #signomancy {
    margin-right: 20%;
}

.knight-of-sirius h2 {
    font-family: "Acadian Runes";
    text-align: left;
    max-width: 35rem;
    margin: 120px auto 80px auto;
    font-size: 3rem;
    color: rgba(0,0,0,0.65);
}

.knight-of-sirius #signomancy h2 {
    margin-bottom: 50px;
}

.knight-of-sirius #order h6 {
    position: relative;
    font-family: 'Kalam';
    max-width: 35rem;
    font-size: 1.2em;
    line-height: 170%;
    margin: 70px auto 0px auto;
    text-align: left;
    color: rgba(0,0,0,0.4);
    font-style: italic;
}

.knight-of-sirius #order h6.note-reference {
    margin: 10px auto 30px auto;
    text-align: right;
    font-style: inherit;
    color: rgba(0,0,0,0.6);
}

.knight-of-sirius .story-box {
    display: block;
    margin: 0px auto 10px auto;
    width: 35rem;
    padding: 40px 0;
    margin-bottom: 100px;
    color: #333;
}

#order .story-box {
    height: 20rem;
    overflow: hidden;
}

#signomancy .story-box {
    margin: 0 auto 0 auto;
    padding: 0;
    padding-bottom: 100px;
    width: 100vw;
    position: relative;
    background-color: #dcdcdc;
}

#signomancy .img-shadow {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    border-top: 4px groove;
    /* box-shadow: inset 0 0 15px 15px #eeeae7 */
}

#order .story-box .page-order {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: calc(105rem + 100px);
}

#order p, #signomancy p, #runes p {
    text-align: left;
    max-width: 35rem;
    font-family: 'Garamond';
    font-size: 1.2rem;
    line-height: 160%;
    letter-spacing: 0.4px;
    margin-bottom: 35px;
}

.knight-of-sirius .bottom-links {
    margin-top: 0px;
    padding: 80px;
    background-color: rgba(205,205,205);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.knight-of-sirius .bottom-links img {
    width: 32rem;
    max-width: 70vw;
    margin-right: 50px;
    margin-top: 50px;
}

.knight-of-sirius .bottom-links h5 {
    position: relative;
    font-family: 'Acadian Runes';
    max-width: 35rem;
    font-size: 2.2em;
    line-height: 170%;
    letter-spacing: 0.8px;
    text-align: left;
    color: rgba(0,0,0,0.5);
    font-style: italic;
}

.knight-of-sirius .bottom-links button {
    display: block;
    padding: 20px 50px;
    margin: 50px auto 10px auto;
    border-radius: 5px;
    border: none;
    outline: none;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    letter-spacing: -0.4px;
    transform: scale(1.0);
    transition: transform .5s ease-out;
    width: 50vw;
    cursor: pointer;
}

.knight-of-sirius .bottom-links button:hover {
    transform: scale(1.06);
}

.knight-of-sirius .bottom-links .stores-banner {
    height: 60px;
    margin-top: 20px;
}

.knight-of-sirius .bottom-links .stores-banner img {
    width: 140px;
    margin: 30px 20px;
}

.knight-of-sirius .bottom-links .stores-banner img:nth-child(1) {
    width: 120px;
}

.last-quote {
    height: calc(100vh - 60px - 90px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.last-quote h6 {
    position: relative;
    font-family: 'Kalam';
    max-width: 28rem;
    font-size: 1.4em;
    line-height: 170%;
    letter-spacing: 0.8px;
    color: rgba(0,0,0,0.4);
    font-style: italic;
}

@keyframes title {
  from{top: -90px;}
  to{top:-20px;}
}

@keyframes appear {
    from{left: -45rem}
    to{left: 0}
}

#order button {
    box-shadow: 2px 2px 5px rgba(0,0,0,0.7),
    inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
    inset -3px -4px 1px rgba(0,0,0,0.6);
    outline: none;
    border: none;
    cursor: pointer;
    position: relative;
    padding: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%),
    url('../assets/img/stone-texture.png');
}

#order button p {
    font-family: "Rune";
    color:#1f5fb3;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    transform: scale(0.55);
    width: 200px;
    margin-top: 4px;
}

#order .button-preview p {
    width: 140px;
}

#order .button-next {
    width: 100px;
    height: 40px;
    border-radius: 20px 5px;
    transform: skew(-15deg, -10deg);
    top: 25px;
    right: 0px;
    float: right;
}

#order button.active:hover {
     animation: levitate 2.5s infinite;
     background: radial-gradient(circle, rgba(48, 111, 184, 0.3) 0%, rgba(0,0,0,0) 100%),
        linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%),
        url('../assets/img/stone-texture.png');
}

#order button.active:hover p {
    color:#4294ff;
}

#order .button-preview {
    width: 80px;
    height: 50px;
    border-radius: 40%;
    transform: rotate(2deg);
    top: 18px;
    float: left;
}


@keyframes levitate {
    0% {
        top: 5px;
        box-shadow: 9px 22px 5px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    12% {
        top: 4px;
        left: 1px;
        box-shadow: 8.5px 23px 6.5px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    25% {
        top: 3px;
        left: 2px;
        box-shadow: 8px 24px 8px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    37% {
        top: 4px;
        left: 1px;
        box-shadow: 8.5px 23px 6.5px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    50% {
        top: 5px;
        left: 0;
        box-shadow: 9px 22px 5px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    63% {
        top: 4px;
        left: 1px;
        box-shadow: 8.5px 23px 6.5px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    75% {
        top: 3px;
        left: 2px;
        box-shadow: 8px 24px 8px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    88% {
        top: 4px;
        left: 1px;
        box-shadow: 8.5px 23px 6.5px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
    100% {
        top: 5px;
        left: 0;
        box-shadow: 9px 22px 5px rgba(0,0,0,0.4),
        inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
        inset -3px -4px 1px rgba(0,0,0,0.6);
    }
}

.knight-of-sirius .showcase .links {
    margin-top: 40px;
}

.knight-of-sirius .showcase .links button,
.knight-of-sirius .bottom-links button  {
    background-color:#1f5fb3;
    color: #fcfcfc;
}

.knight-of-sirius .showcase .links button:hover,
.knight-of-sirius .bottom-links button:hover {
    background-color: #3e7ed1;
    box-shadow: 0 0 20px 1px #4294ff
}


.knight-of-sirius .footer {
    height: 60px;
}
</style>
