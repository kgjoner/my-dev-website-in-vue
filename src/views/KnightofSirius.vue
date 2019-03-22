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
            o bem ou para o mal. Só que antes de descobrir o verdadeiro significado da magia, Garef terá de responder quem
            ele havia se tornado.`
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
            <h6><span class="icon">"</span>Esses cavaleiros conseguem manipular o fogo frio como se fosse água, mas o que mais me assombra é o controle
                resoluto que eles têm sobre a própria vontade."
            </h6>
            <p>Sirius, um dos primeiros signomantes, estava insatisfeito com o rumo que a Ordem Arcana tomava. Na época, os Arquimagos
                se provaram pouco eficientes em conter o avanço das artes proibidas e alguns haviam até mesmo se corrompido.
                Por temer o uso indevido de suas descobertas em signomancia, Sirius se afastou. Procurou pela reclusão e
                pelo silêncio. 
            <p>Ele, seus ensinamentos disruptivos e seus cavaleiros são agora um dos maiores mistérios do continente.</p>
            <p>Os cavaleiros são treinados tanto no domínio das armas quanto no domínio das leis naturais, 
                porém, tendo sua maneira peculiar de interpretar a vida, a Ordem está mais interessada no domínio da alma.</p>
        </div>
        <div id="signomancy">
            <h2>Signomancia</h2>
            <p>Signomancia é a arte de estocar energia em símbolos. Há muitos pormenores, mas essa definição é o suficiente 
                para um bom começo.</p>
            <p>A eficiência energética sempre foi um grande obstáculo para os arcanistas. Um daqueles difíceis de superar.</p>
            <p>Eles haviam destrinchado a língua dos deuses e conseguido manipular o éter direto na fonte, mas o avanço na 
                eficiência continuava aquém do esperado.</p>
            <p>Então Karnô aparece na história com a descoberta de um material que não só ressoava com a língua dos deuses, 
                mas era também capaz de guardar energia: um líquido azulado batizado de likdânio.</p>
            <p>Assim surgem as runas, rótulos desenhados em likdânio, carregadas com uma frase arcana. Não são uma solução 
                direta para a eficiência energética, mas conseguem contorná-la.<p>
            <p>Infelizmente, Karnô faleceu cedo demais, e seu aluno que mais entendia sobre signomancia era Sirius. Depois 
                de ele abandonar a Ordem, a signomancia acabou atrofiando; os outros discípulos ainda mantiveram a prática 
                e os estudos vivos, mas muito do conhecimento se perdeu.</p> 
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
            catarinense
        }
    },
    methods: {
        openPopup() {
            document.getElementsByClassName('stores-popup-bg')[0].style.display = 'block';
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
    margin-right: 15px;
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

.knight-of-sirius .synopsis > p:nth-child(2)::first-letter,
#order > p:first-of-type::first-letter, #signomancy p:first-of-type::first-letter, 
#runes p:first-of-type::first-letter {
    font-size: 4rem;
    float: left;
    padding-top: 16px;
    padding-right: 4px;
}

.knight-of-sirius .synopsis > p:nth-child(2) {
    margin-top: 50px;
}

.knight-of-sirius .synopsis > p:first-of-type {
    font-family: "Acadian Runes";
    font-size: 2rem;
    line-height: 150%;
    font-weight: bold;
    color: #3268af;
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

.knight-of-sirius h2 {
    font-family: "Acadian Runes";
    color: #1f5fb3;
    text-align: left;
    margin: 80px auto 50px 15vw;
    font-size: 3rem;
}

.knight-of-sirius .icon {
    position: relative;
    font-family: "Kalam";
    font-size: 3.5em;
    top: 1.5rem;
    left: -0.5rem;
    transform: rotate(10deg);
}

.knight-of-sirius #order h6 {
    font-size: 1.4em;
    font-family: 'Kalam';
    max-width: 45rem;
    font-size: 1.2em;
    line-height: 150%;
    margin-bottom: 50px;
    margin-left: 15vw;
    margin-right: 40px;
    text-align: left;
}

#order p, #signomancy p, #runes p {
    text-align: left;
    max-width: 45rem;
    font-family: 'Garamond';
    font-size: 1.2em;
    line-height: 150%;
    margin-left: 15vw;
    margin-right: 40px;
}

.knight-of-sirius .bottom-links {
    margin-top: 50px;
    padding: 20px 0;
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
