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
                            manto azul. Pela espada. Pela magia.</p>
                        <p>Recém-sagrado cavaleiro, confuso e traído, ele precisa entender o que se passou no último teste. Mas para isso, 
                            ele deve não só quebrar um Juramento, como colocar em risco um dos segredos mais bem guardados de Velgard.</p>
                        <p>Druidas, amantes, seres mágicos e outros cavaleiros influenciam seu caminho, quer seja para
                            o bem ou para o mal.</p>
                    </div>
                    <!-- <button @click="openPopup()">Ebook</button> -->
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
            <button class="story-click" @click="openOrderInfo()">p n x y s</button>
            <div class="story-box" style="display:none">
                <button class="close" @click="closeOrderInfo()">g</button>
                <div>
                    <div class="letter">
                        <p>Forjados na reclusão e no silêncio, os cavaleiros de Sirius buscam a mais difícil das tarefas: alcançar a
                             maestria da alma.</p>
                        <p> Mas isso significa paz de espírito. Afinal, eles precisam ser testados, perturbados, jogados no mundo além de suas muralhas.</p>
                        <p>São treinados tanto em armas quanto nas leis da natureza, não apenas para entendê-la, mas para manipulá-la 
                            através da signomancia. Essa é a arte das runas, a arte que eles trazem tatuada na pele.</p>
                        <p>Nem reis nem magos sabem o que se passa dentro da Ordem. O mundo desconhece sua vontade e seus caminhos. E até
                            cavaleiros ungidos permanecem à margem dos maiores segredos.</p>
                        <p>Os Grandes Mestres dizem que todo esse cuidado é em nome de um bem maior. Será?</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="runes">
                <div>
                    <img :src="coverCdS" alt="O Cavaleiro de Sirius">
                </div>
                <div class="bottom-links">    
                    <h5>Descubra um novo mundo.</h5>
                    <h5 class="before-links">Encontre a <span style="color: rgb(43, 137, 199);">Maestria.</span></h5>
                    <img v-show="windowWidth < 701" :src="coverCdS" alt="O Cavaleiro de Sirius">
                    <img v-show="windowWidth < 500" src="../assets/img/cover-sirius-mob.png" alt="O Cavaleiro de Sirius">
                    <div class="book-links">  
                        <a :href="stores[0].link" target="_blank">{{stores[0].linkName}}</a>
                        <a :href="stores[0].link2" target="_blank">{{stores[0].link2Name}}</a>
                    </div>
                    <!-- <div class="stores-banner">
                        <img v-for="(store, index) in stores" :key="index" :src="store.image" alt="">
                    </div> -->
                </div>              
        </div>
        <div id="signomancy" class="last-quote">
            <h6>"Bem no fundo de cada um de nós há algo que nos marca e nos define, isso é o que eu chamo
                de alma. O problema é que muitas vezes ela é mantida tão no fundo de nós mesmo que se perde,
                e nesse caso, não sabemos o que buscamos..."    
            <h6 class="note-reference">
                – Soúl Lazário
            </h6>
            </h6>
            <h6 class="opposed-alignment">"Somos feitos de matéria e energia e constituídos de crenças e valores, que nos preenchem.
                Mas também somos os nossos vazios."
            <h6 class="note-reference">
                – Liana de Karqus
            </h6>
            </h6>
            <!-- <h6>"A vida não está nas certezas da mente, mas nas incertezas da alma."</h6> -->
            <Footer />
        </div>
        <div class="book-page">
            <Stores :stores="stores" />
        </div>
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
            }],
            windowWidth: 0
        }
    },
    computed: {
        ...mapState(['pageOrder', `allowChange`]),
        defaultFontSize() {
            return Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
        },
    },
    methods: {
        openPopup() {
            document.getElementsByClassName('stores-popup-bg')[0].style.display = 'block';
        },
        openOrderInfo() {
            document.getElementsByClassName('story-box')[0].style.display = 'block';
            window.addEventListener('click', this.checkCloseOrderInfo)
        },
        closeOrderInfo() {
            document.getElementsByClassName('story-box')[0].style.display = 'none';
            window.removeEventListener('click', this.checkCloseOrderInfo)
        },
        checkCloseOrderInfo(ev) {
            if(!document.getElementsByClassName('story-box')[0].contains(ev.target) &&
            !document.getElementsByClassName('story-click')[0].contains(ev.target)) {
                this.closeOrderInfo()
            }
        },
        getWindowWidth() {
            this.windowWidth = window.innerWidth;
        }
    },
    beforeCreate() {
        window.scrollTo(0, 0)
    },
    mounted() {
        document.getElementsByClassName('content')[0].classList.add('content-ready')
        this.getWindowWidth()
        window.addEventListener('resize', this.getWindowWidth)
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

@font-face {
    font-family: "Trajan";
    src: url("../assets/fonts/Trajan-Pro-Bold.ttf");
}

.knight-of-sirius {
    background-color: #eeeae7;
    max-width: 100vw;
    /* color: rgb(43, 137, 199) */
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
    background-image: url('../assets/img/capa_sirius.jpg');
    background-size: cover;
    background-position: 0% top;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    width: 100%;
    height: 100%;
    position: absolute;
    top: -90px;
    left: 0;
    opacity: 0.5;
}

.knight-of-sirius .book-page:after {
    content:'';
    background-image: url('../assets/img/capa-garef.png');
    background-size: calc(100vh - 90px);
    background-position: 10% bottom;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 120px;
    left: -90px;
    opacity: 0.9;
}

.knight-of-sirius .presentation {
    margin-left: 40%;
}

.knight-of-sirius .synopsis > p:first-of-type {
    font-family: "Trajan";
    font-size: 1.6rem;
    line-height: 150%;
    color: rgba(75, 102, 102, 0.8);
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

#order {
    padding-right: 20%;
    padding-bottom: 100px;
}

.knight-of-sirius h2 {
    font-family: "Acadian Runes";
    text-align: left;
    max-width: 35rem;
    padding-top: 120px;
    margin: 0px auto 50px auto;
    font-size: 4rem;
    /* color: rgba(0,0,0,0.65); */
    color: #ffffffaa;
    position: relative;
}


.knight-of-sirius #order {
    position: relative;
}

.knight-of-sirius #order:before {
    content:'';
    background-image: url('../assets/img/contracapa.jpg');
    background-size: cover;
    background-position: 0% center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    opacity: 0.8;
}

.knight-of-sirius #order h6 {
    position: relative;
    font-family: 'Kalam';
    max-width: 35rem;
    font-size: 1.2em;
    line-height: 170%;
    margin: 70px auto 0px auto;
    text-align: left;
    color: rgba(255,255,255,0.7);
    /* color: rgba(0,0,0,0.4); */
    font-style: italic;
    border-left: 5px solid rgb(102, 146, 175);
    padding-left: 20px;
}

.knight-of-sirius #order h6.note-reference {
    margin: 15px auto 30px auto;
    text-align: right;
    font-style: inherit;
    color: rgba(255,255,255,0.85);
    /* color: rgba(0,0,0,0.6); */
    border-left: none;
}

.knight-of-sirius .story-click {
    width: 500px;
    height: 60px;
    margin-top: 20px;
}

.knight-of-sirius .story-box {
    display: block;
    position: fixed;
    top: 130px;
    left: calc(50vw - 17.5rem);
    z-index: 50;
}

#order .story-box > div {
    height: 75vh;
    overflow-y: scroll;
}

#order .story-box ::-webkit-scrollbar {
    width: 12px;
}

/* #order .story-box ::-webkit-scrollbar-track {
    background-color:rgb(212, 212, 212);
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px; 
}*/

#order .story-box ::-webkit-scrollbar-thumb {
  background: rgb(75, 75, 75);
  border-radius: 10px;
}

#order .story-box ::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

#order .story-box .letter {
    position: relative;
    top: -3px;
    background-image: url('../assets/img/old-paper2.jpg');
    background-size: cover;
    background-position: center top;
    width: 35rem;
    padding: 60px 20px 70px 30px;
    border-radius: 10px;
    animation: openLetter 1s;
}

#order .story-box .letter p {
    font-family: 'Kalam';
    font-size: 1.2rem;
}

@keyframes openLetter {
    0% {height: 0;
        overflow: hidden}
    100% {height: 100%;
        overflow: hidden}
}

#order .story-box button {
    position: absolute;
    top: -20px;
    right: -10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    z-index: 10;
    font-size: 1.4rem;
    opacity: 1;
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

.knight-of-sirius #runes {
    margin-top: 0px;
    padding: 80px;
    /* background-color: rgba(205,205,205); */
    display: flex;
    align-items: center;
    position: relative;
}

.knight-of-sirius #runes::before {
    content: ' ';
    background-image: url('../assets/img/mockup-back.jpg');
    background-size: cover;
    background-position: 0% top;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
}

.knight-of-sirius #runes::after {
    content: ' ';
    /* background-image: url('../assets/img/mockup-back.jpg'); */
    background-color: rgba(83, 82, 70, 0.3);
    background-size: cover;
    background-position: 0% top;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.knight-of-sirius #runes img {
    /* width: 32rem; */
    max-width: 30vw;
    margin-right: 50px;
    margin-top: 50px;
    position: relative;
    z-index: 2;
}

.knight-of-sirius .bottom-links {
    display: flex;
    flex-direction: column;
    align-items: left;
    position: relative;
    z-index: 2;
}

.knight-of-sirius .bottom-links h5 {
    position: relative;
    font-family: 'Trajan';
    max-width: 35rem;
    font-size: 2em;
    line-height: 150%;
    letter-spacing: 0.8px;
    text-align: left;
    color: rgba(255,255,255,0.8);
    /* color: rgba(0,0,0,0.5); */
    /* font-style: italic; */
}

.knight-of-sirius .bottom-links .book-links a {
    display: block;
    padding: 18px 20px;
    margin: 20px auto 10px 0;
    border-radius: 5px;
    border: none;
    outline: none;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    letter-spacing: -0.4px;
    transform: scale(1.0);
    transition: transform .5s ease-out;
    width: 300px;
    cursor: pointer;
    background-color:rgb(87, 147, 187);
    color: #fcfcfcee;
    text-decoration: none;
}

.knight-of-sirius .bottom-links a:hover {
    transform: scale(1.06);
    text-decoration: none;
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    position: relative;
    padding-top: 130px;
}

.last-quote h6 {
    position: relative;
    font-family: 'Kalam';
    max-width: 45rem;
    font-size: 1.2em;
    line-height: 170%;
    letter-spacing: 0.8px;
    padding-left: 100px;
    padding-right: 20px;
    color: rgba(255, 255, 255, 0.8);
    font-style: italic;
    text-align: left;
}

.last-quote h6.opposed-alignment {
    text-align: right;
    align-self: flex-end;
    padding-right: 100px;
    padding-left: 20px;
}

.last-quote .note-reference {
    text-align: right;
    padding-top: 10px;
}

.knight-of-sirius .last-quote::before {
    content: ' ';
    background-image: url('../assets/img/contracapa.jpg');
    background-size: cover;
    background-position: 0% bottom;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
}

.knight-of-sirius .book-page .stores-banner {
    position: relative;
    /* z-index: 10; */
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
    clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 52%, 0% 48%);
    border-radius: 50px;
    outline: none;
    border: none;
    cursor: pointer;
    position: relative;
    padding: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%),
    url('../assets/img/stone-texture.png');
    /* color:#1f5fb3aa; */
    font-family: "Rune";
    /* color: rgb(75, 125, 161); */
    background-color:burlywood;
    color:rgba(0,0,0,0.5);
    font-weight: bold;
    font-size: 1.7rem;
    letter-spacing: 5px;
    width: 400px;
}

#order button:hover {
     /* color:#2c7fecaa; */
     color: rgb(78, 135, 175);
     background: radial-gradient(circle, rgb(90, 120, 141, 0.25) 50%, rgba(0,0,0,0) 100%),
        linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%),
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
    background: none;
    position: relative;
    bottom: 0px;
    opacity: 0.5;
}

@media (max-width: 950px) {
    .knight-of-sirius .book-page:after {
        left: -160px;
    }

    .knight-of-sirius #runes {
        min-height: calc(100vh - 60px);
        padding: 80px 40px 80px 20px;
    }

    .knight-of-sirius .bottom-links h5 {
        font-size: 1.5em;
    }

    .knight-of-sirius .bottom-links .book-links {
        margin-top: 20px;
    }

    .knight-of-sirius #runes img {
        max-width: 350px;
    }
}

@media (max-width: 780px) {
    .knight-of-sirius .book-page:after {
        content: '';
        background: none;
    }

    .knight-of-sirius .book-page:before {
        background-position: 30% top;
    }

    .knight-of-sirius .presentation {
        margin-left: 40px;
    }

    #order {
        padding-left: 15px;
        padding-bottom: 100px;
    }

    .knight-of-sirius .bottom-links h5 {
        font-size: 1.4em;
    }

    .knight-of-sirius .bottom-links .book-links {
        margin-top: 20px;
    }

    .knight-of-sirius #runes img {
        max-width: 300px;
        margin-right: 30px;
        margin-top: 50px;
    }

    .last-quote h6.opposed-alignment {
        text-align: left;
        align-self: flex-start;
        padding-right: 20px;
        padding-left: 100px;
    }
}

@media (max-width: 700px) {
    .knight-of-sirius #runes > div:first-of-type {
        display: none;
    }

    .knight-of-sirius .bottom-links {
        margin-top: 30px;
    }

    .knight-of-sirius .bottom-links h5 {
        font-size: 1.8em;
    }

    .knight-of-sirius .bottom-links .book-links {
        margin: 20px auto 40px auto;
    }

    .knight-of-sirius #runes img {
        max-width: 350px;
        margin: 30px auto 0 auto;
    }

    .last-quote h6, .last-quote h6.opposed-alignment {
        text-align: left;
        align-self: flex-start;
        padding-right: 40px;
        padding-left: 40px;
    }
}

@media (max-width: 650px) {
    .knight-of-sirius .story-box {
        left: calc(50vw - 200px);
    }

    #order .story-box .letter {
        width: 400px;
        padding: 60px 20px 20px 30px;
    }
}

@media (max-width: 500px) {
    .knight-of-sirius .story-box {
        left: calc(50vw - 175px);
    }

    #order .story-box .letter {
        width: 350px;
        padding: 60px 20px 10px 30px;
    }

    #order .story-box .letter p {
        font-size: 1.1rem;
        line-height: 150%;
    }

    .knight-of-sirius .bottom-links h5 {
        font-size: 1.5em;
    }

    .knight-of-sirius #runes img {
        max-width: 300px;
    }
}

@media (max-width: 400px) {
    .knight-of-sirius .story-box {
        left: calc(50vw - 150px);
    }

    #order .story-box .letter {
        width: 300px;
        padding: 60px 20px 10px 30px;
    }

    #order .story-box .letter p {
        font-size: 1.1rem;
        line-height: 150%;
    }
}
</style>
