<template>
    <div class="forbidden-arts">
        <div class="header-title">
            <img src="@/assets/img/title-anseio.svg" alt="">
        </div>
        <BookPage title="Um Anseio pelas Artes Proibidas" pages="32" :bookImg="coverAAP"
        :synopsis="[
            `Os arcanistas clamaram ter descoberto a língua dos deuses, e tornaram-se capazes de manipular
            a natureza como se conversassem com ela. Só que não demorou para alguns começarem a brincar
            com a vida e com a morte...`,
            `Gregório precisa corrigir as consequências de um acidente. Acabou largando os estudos e se 
            atirou no mundo, incerto sobre até que ponto aquilo valerá a pena. `,
            `Enquanto isso, Pauline, sua irmã, tenta impedi-lo antes que seja tarde. Ela sabe que há riscos 
            em jogo muito piores do que a morte.`
        ]"
        :stores="[{
            image: wattpad,
            link: 'https://www.wattpad.com/580316339-um-anseio-pelas-artes-proibidas-citação',
            linkName: 'Leia Online'
        }, {
            mail: true
        }]"/>
    </div>
</template>

<script>
import BookPage from '../components/template/BookPage'
import coverAAP from '../assets/img/cover-anseio.png'
import wattpad from '../assets/img/logo-wattpad.svg'

export default {
    name: "ForbiddenArts",
    components: { BookPage },
    data: function() {
        return {
            coverAAP,
            wattpad
        }
    },
    mounted() {
        document.getElementsByClassName('content')[0].classList.add('content-ready')
    }
}
</script>

<style>

.forbidden-arts .header-title:after {
    left: 227.5px;
    height: 130px;
}

.forbidden-arts .header-title img {
    height: 100px;
}

.forbidden-arts .book-page .showcase img {
    width: 55%;
}

.forbidden-arts .synopsis > p:nth-child(1)::first-letter {
    color: rgb(84, 56, 185);
    font-size: 4rem;
    float: left;
    padding-top: 16px;
    padding-right: 4px;
}

.forbidden-arts .synopsis > p:nth-child(4) {
    margin-top: 50px;
}

.forbidden-arts .showcase .links button {
    background-color:rgb(54, 29, 145);
    color: #fcfcfc;
}

.forbidden-arts .showcase .links button:hover {
    background-color: rgb(84, 56, 185);
}

</style>
