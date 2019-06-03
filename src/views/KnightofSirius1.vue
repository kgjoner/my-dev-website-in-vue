<template>
    <div class="knight-of-sirius">
        <div class="header-title">
            <img src="@/assets/img/title-sirius.png" alt="">
        </div>
        <BookPage id="book" title="O Cavaleiro de Sirius" pages="368" :bookImg="coverCdS"
        :synopsis="[
            `Garef sempre soube que pagaria um preço pelo manto azul. Pela espada. Pela magia.`,
            `Recém-sagrado cavaleiro, confuso e traído, ele precisa entender o que se passou no último teste. Mas para isso, 
            ele deve não só quebrar um Juramento, como colocar em risco um dos segredos mais bem guardados de Velgard.`,
            `Druidas, amantes, seres mágicos e outros cavaleiros influenciam seu caminho, quer seja para
            o bem ou para o mal.`
        ]"
        :stores="[{
                image: amazon,
                link: 'https://amzn.to/2MQyUYT',
                linkName: 'Ebook',
                link2: 'https://www.amazon.com.br/Cavaleiro-Sirius-K-G-Joner/dp/8592485312/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1530819304&sr=8-2-fkmrnull',
                link2Name: 'Impresso'
            }, { image: catarinense,
                obs: 'Disponível nas lojas da Grande Florianópolis',
            }]"/>
        <div id="order">
            <h2>A Ordem</h2>
            <hr>
            <h6>Esses cavaleiros conseguem manipular o fogo-frio como se fosse água, mas o que mais me assombra é esse controle
                resoluto que eles têm sobre a própria vontade." — Notas encontradas em Aquisgrapel.
            </h6>
            <div class="story-box">
            <p v-show="pageOrder == 1">Sirius, um dos primeiros signomantes, estava insatisfeito com o rumo que a Ordem Arcana tomava. Na época, os Arquimagos
               não conseguiam conter o avanço das artes proibidas e alguns haviam até mesmo se corrompido.</p>
            <p v-show="pageOrder == 2">Por temer o uso indevido das descobertas que havia feito, Sirius se afastou. Procurou pela reclusão e
                pelo silêncio. Ele, seus ensinamentos disruptivos e seus cavaleiros são agora um dos maiores mistérios do continente.</p>
            <p v-show="pageOrder == 3">Os cavaleiros são treinados tanto no domínio das armas quanto no domínio das leis naturais, 
                porém, tendo sua maneira peculiar de interpretar a vida, a Ordem está mais interessada no domínio da alma...</p>
            <span>{{pageOrder}}/3</span>
            <button class="button-preview" :class="{'active': pageOrder > 1}" @click="previewOrder"><p>c</p></button>
            <button class="button-next" :class="{'active': pageOrder < 3}" @click="nextOrder"><p>K</p></button>
            </div>
        </div>
        <div id="signomancy">
            <h2>Signomancia</h2>
            <hr>
            <div class="story-box" ref="sigBox">
            <p>Signomancia é a arte de guardar energia em símbolos. Mais precisamente, estocar um potencial arcano pré-conjurado...
            </p>
            <button class="interactive-rune ethereal-rune" @click="toggleLight()"><p>A</p></button>
            <button class="ethereal-light" @mousemove="e => dragLight(e)"></button>
            <p>A eficiência energética sempre foi um obstáculo para os arcanistas. Mesmo após terem destrinchado a língua dos deuses e conseguido manipular o éter direto na fonte, o avanço na 
                eficiência continuou aquém do esperado por muito tempo.</p>
            <p>Até um dos Arquimagos, Karnô, descobrir um material que não só ressoava com a língua dos deuses, 
                mas também era capaz de guardar energia: um líquido azulado batizado de likdânio.</p>
            <p>Assim surgem as runas, rótulos desenhados em likdânio, carregadas com uma frase arcana. Não são uma solução 
                direta para a eficiência energética, mas conseguem contorná-la.<p>
            <p>Infelizmente, Karnô faleceu cedo demais, e seu aluno que mais entendia sobre signomancia era Sirius. Depois 
                de ele romper os laços com os arcanistas, a signomancia acabou atrofiando; os outros discípulos ainda mantiveram a prática 
                e os estudos vivos, mas muito do conhecimento se perdeu.</p>
            <p>Por outro lado, Sirius foi além de seu mestre e descobriu como tirar o maior proveito do likdânio, tatuando-o na pele. Isso fez
                ele se aprofundar na essência de todas as coisas e veio a ser a base da magia dos seus cavaleiros.</p>
            <!-- <button class="interactive-rune fire-rune"><p>y</p></button> -->
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
        </div> -->
        <div class="bottom-links">
            <button @click="openPopup">Pegue a sua cópia!</button>
        </div>
        <About />
    </div>
</template>

<script>
import BookPage from '../components/template/BookPage'
import About from '../components/home/About'
import coverCdS from '../assets/img/cover-sirius.png'
import amazon from '../assets/img/logo-amazon.svg'
import catarinense from '../assets/img/logo-catarinense.svg'

export default {
    name: "KnightofSirius",
    components: { BookPage, About },
    data: function() {
        return {
            coverCdS,
            amazon,
            catarinense,
            pageOrder: 1,
            isDrag: false
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
        },
        dragLight(e) {
            const item = e.target
            if (e.buttons) { //se e.buttons for diferente de zero, significa que houve um clique
                item.style.top = `${window.scrollY + e.clientY - item.clientHeight/2 - this.$refs.sigBox.offsetTop}px`
                item.style.left = `${e.clientX - item.clientWidth/2 - this.$refs.sigBox.offsetLeft}px`
            }
        },
        toggleLight() {
            document.getElementsByClassName('ethereal-light')[0].classList.toggle('active');
            document.getElementsByClassName('ethereal-rune')[0].classList.toggle('active');
        }
    },
    mounted() {
        document.getElementsByClassName('content')[0].classList.add('content-ready')
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

.knight-of-sirius .about-content .about-text:before {
    background-color: #eeeae7;
}

.knight-of-sirius .about-content h2 {
    margin-left: 0;
    margin-top: 60px;
    font-family: "Philosopher";
    color: #4c4c4c;
}

.header-title {
    position: fixed;
    padding: 20px 0px 20px 5px;
    /* margin-right: 15px; */
    background-color:hsla(0,0%,15%,  1);
    z-index: 99;
    animation-name: title;
    animation-duration: 1s;
    top: -20px;
}

.header-title:after {
  content: ' ';
  position: absolute;
  bottom: 6px;
  left: 226px;
  height: 116px;
  width: 48.8px;
  background-color:hsla(0,0%,15%,  1);
  transform: rotate(20deg)
}

.header-title img {
	margin: 0 40px;
	height: 90px;
	opacity: 0.8;
}


.knight-of-sirius header h4 {
    color: #fcfcfc;
    font-family: "Philosopher";
    font-size: 2em;
}

.knight-of-sirius .book-page {
    background: linear-gradient(to top, rgb(161, 161, 138) 0%, rgb(119, 133, 121) 20%, rgb(56, 105, 146) 100%);
    background-position: top center;
    background-attachment: fixed;
    position: relative;
}

.knight-of-sirius .book-page:before {
    content:'';
    /* background-image: url('../assets/img/backCdS.svg'); */
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 120px;
    left: 0;
    opacity: 0.15;
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
    color: #fcfcfc;
}

.knight-of-sirius .synopsis > p:first-of-type {
    font-family: "Salsa";
    font-size: 2rem;
    line-height: 150%;
    color: #fcfcfc;
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

.knight-of-sirius #signomancy {
    /* background-color:rgb(240, 240, 240); */
    /* background-color:rgb(114, 114, 114); */
    padding: 5px 0;
}

.knight-of-sirius h2 {
    font-family: "Acadian Runes";
    /* color: #1f5fb3; */
    text-align: left;
    max-width: 45rem;
    margin: 80px auto 0 auto;
    font-size: 3rem;
    color: rgba(0,0,0,0.65);
}

.knight-of-sirius #signomancy h2 {
    margin-top: 20px;
    /* color: #fcfcfc; */
}

.knight-of-sirius hr {
    width: 45rem;
    margin-bottom: 50px;
    margin-top: 10px;
    /* border: 1px solid #1f5fb3; */
}

/* .knight-of-sirius #signomancy hr {
    border-color: #fcfcfc;
} */

.knight-of-sirius #order h6:before {
    position: absolute;
    content: '"';
    font-family: "Kalam";
    font-size: 5em;
    color: rgba(0,0,0,0.6);
    top: 2rem;
    left: 10px;
    transform: rotate(5deg);
}

.knight-of-sirius #order h6 {
    position: relative;
    font-family: 'Kalam';
    max-width: 46rem;
    font-size: 1.3em;
    line-height: 170%;
    padding-left: 60px;
    margin: 0 auto 50px auto;
    text-align: left;
    color: rgba(0,0,0,0.7)
}

#order .story-box, #signomancy .story-box {
    /* background-color: rgba(172, 172, 172, 0.3); */
    background: rgba(0, 0, 0, 0.6);
    color: #fcfcfc;
    display: block;
    margin: 10px auto 10px auto;
    width: 50rem;
    padding: 40px;
    padding-top: 60px;
    border-radius: 6em 0em;
    /* border: 6px ridge rgb(180, 180, 180); */
    margin-bottom: 100px;
    position: relative;
}

#order button, #signomancy .interactive-rune {
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

#order button p, #signomancy button p {
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

#order button.active:hover p, #signomancy .interactive-rune:hover p,
#signomancy .interactive-rune.active p {
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

#order p, #signomancy p, #runes p, 
#order .story-box span {
    text-align: left;
    max-width: 45rem;
    font-family: 'Garamond';
    font-size: 1.2rem;
    line-height: 160%;
    letter-spacing: 0.4px;
    margin-bottom: 35px;
}

#order .story-box span {
    position: relative;
    float: right;
    right: 70px;
    bottom: 25px;
}

#signomancy p {
    color: #333;
}

#signomancy .story-box {
    /* background-color: rgba(189, 189, 189, 0.7); */
    background-color: inherit;
    /* border: 6px ridge rgb(224, 224, 224); */
    padding-top: 0;
    margin-top: 0;
}

#signomancy .ethereal-light {
    position: absolute;
    opacity: 0;
    transition: 1s;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(0,0,0,0) 50%);
    border-radius: 50%;
    border: none;
    outline: none;
}

#signomancy .ethereal-light.active {
    background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(26, 102, 201, 0.2) 60%, rgba(26, 102, 201, 0.4) 100%),
    rgba(26, 102, 201, 0.2);
    transition: 0.5s;
    box-shadow: 0px 0px 30px 100px rgba(26, 102, 201, 0.4);
    cursor: move;
    opacity: 1;
    animation: flame 2.5s 0.5s infinite;
}

@keyframes flame {
    0%{
        background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(26, 102, 201, 0.2) 60%, rgba(26, 102, 201, 0.4) 100%),
        rgba(26, 102, 201, 0.2);
        box-shadow: 0px 0px 30px 100px rgba(26, 102, 201, 0.38);
    }
    15%{
        background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(26, 102, 201, 0.2) 68%, rgba(26, 102, 201, 0.4) 100%),
        rgba(26, 102, 201, 0.3);
        box-shadow: 0px 0px 30px 103px rgba(26, 102, 201, 0.42);
    }
    25%{
        background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(26, 102, 201, 0.2) 64%, rgba(26, 102, 201, 0.4) 100%),
        rgba(26, 102, 201, 0.25);
        box-shadow: 0px 0px 30px 101px rgba(26, 102, 201, 0.4);
    }
    55%{
       background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(26, 102, 201, 0.2) 72%, rgba(26, 102, 201, 0.4) 100%),
        rgba(26, 102, 201, 0.34);
       box-shadow: 0px 0px 30px 105px rgba(26, 102, 201, 0.45);
    }
    90%{
        background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(26, 102, 201, 0.2) 56%, rgba(26, 102, 201, 0.4) 100%),
         rgba(26, 102, 201, 0.2);
        box-shadow: 0px 0px 30px 98px rgba(26, 102, 201, 0.36);
    }
    100%{
        background: radial-gradient(circle, rgba(67, 137, 230, 0.849) 0%, rgba(26, 102, 201, 0.2) 60%, rgba(26, 102, 201, 0.4) 100%),
         rgba(26, 102, 201, 0.2);
        box-shadow: 0px 0px 30px 100px rgba(26, 102, 201, 0.38);
    }
}

#signomancy .ethereal-rune:hover ~ .ethereal-light {
    opacity: 1;
}

#signomancy .ethereal-rune {
    width: 60px;
    top: -10px;
    left: -12rem;
    margin: 20px 0;
    border-radius: 50% 20%;
    transform: rotate(5deg);
    position: relative;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.7),
    inset 0.5px 0.5px 1px rgba(0,0,0,0.4),
    inset -3px -4px 1px rgba(0,0,0,0.6);
    transition: 0.5s;
}

#signomancy .ethereal-rune.active {
    background: radial-gradient(circle, rgba(48, 111, 184, 0.3) 0%, rgba(0,0,0,0) 100%),
        linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%),
        url('../assets/img/stone-texture.png');
}

#signomancy .ethereal-rune p {
    width: 60px;
    margin-top: 5px;
    position: relative;
    left: -5px;
    transform: scale(0.5) rotate(-50deg)
}

.knight-of-sirius .bottom-links {
    margin-top: 0px;
    padding: 70px 0;
    background-color: rgba(205,205,205);
}

.knight-of-sirius .bottom-links button {
    display: block;
    padding: 25px 50px;
    margin: 50px auto 50px auto;
    border-radius: 5px;
    border: none;
    outline: none;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    letter-spacing: -0.4px;
    transform: scale(1.0);
    transition: transform .5s ease-out;
    width: 75vw;
    cursor: pointer;
}

@keyframes title {
  from{top: -90px;}
  to{top:-20px;}
}

@media(max-width: 740px) {
    #about {
        height: auto;
    }

    .about-content {
        flex-direction: column;
        height: auto;
    }

    .about-content img {
        left: 0px;
        height: 500px;
    }

    .about-text {
        left: 0px;
    }

    .about-content .about-text:before {
        content: ' ';
        height: 900px;
        width: 1024px;

        transform: rotate(80deg);
        top: -5px;
        left: -200px;
    }

    .about-text p {
        max-width: 45rem;
        width: 80vw;
        top: -100px;
        font-size: 1.1rem;
    }

    .about-text h2 {
        text-align: right;
        width: 40vw;
        top: -120px;
        right: -40vw;
    }
}


@media(max-width: 500px){
    .about-text h2 {
        font-size: 2.7rem;
        width: 400px;
        top: -80px;
        right: 0;
        left: -50px;
    }

    .about-text p {
        max-width: 45rem;
        width: 80vw;
        left: calc(230px - 50vw);
        top: -80px;
        font-size: 1.1rem;
    }
}
</style>
