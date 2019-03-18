<template>
    <div class="hunters-calling">
        <div class="header-title">
            <img src="@/assets/img/title-chamado.svg" alt="">
        </div>
        <BookPage title="O Chamado do Caçador" pages="60" :bookImg="coverCdC"
        :synopsis="[
            `Após quatro anos sozinho, Vicente faz uma visita à vila onde seu antigo companheiro de jornada se 
            estabelecera. Tinha esperanças de que o reencontro o ajudasse a aposentar sua espada, a abandonar o 
            ofício de caçador, a buscar um novo propósito…`,
            `No entanto, a vila lhe guardava mais um trabalho a ser feito: enquanto crianças desaparecem de dentro 
            de suas casas, um monstro vaga pela noite perturbando o descanso dos mortos.`,
            `Que aquela fosse, então, sua última caçada.`
        ]"
        :stores="[{
            image: amazon,
            link: 'https://amzn.to/2IeQWSX',
            linkName: 'Ebook'
        }, {
            mail: true
        }]"/>
    </div>
</template>

<script>
import BookPage from '../components/template/BookPage'
import coverCdC from '../assets/img/cover-chamado.png'
import amazon from '../assets/img/logo-amazon.svg'

export default {
    name: "HuntersCalling",
    components: { BookPage },
    data: function() {
        return {
            coverCdC,
            amazon
        }
    },
}
</script>

<style>

.hunters-calling .header-title:after {
    left: 312.5px;
}

.hunters-calling .book-page .showcase img {
    width: 55%;
}

.hunters-calling .synopsis > p:nth-child(1)::first-letter {
    color: rgba(204,56,67);
    font-size: 4rem;
    float: left;
    padding-top: 16px;
    padding-right: 4px;
}

.hunters-calling .synopsis > p:nth-child(4) {
    margin-top: 50px;
}

.hunters-calling .showcase .links button {
    background-color:rgb(129, 46, 52);
    color: #fcfcfc;
}

.hunters-calling .showcase .links button:hover {
    background-color: rgba(204,56,67);
}


/* `— […] eu vou tentar o teste de cavalaria em breve; logo que me sentir preparado o suficiente para partir daqui.`,
            'Aquilo levantou um sorriso irônico em Vicente. Balançou a cabeça e disse:',
            '— Sabe qual é o segredo, Sr. Silvário? Você nunca vai estar preparado. Mas vai precisar partir mesmo assim, se atender ao seu chamado. Todos recebem um alguma vez na vida, poucos o percebem.',
            '— É por isso que você está aqui, caçador? Por atender ao seu chamado?',
            `'Não… eu não o percebi ainda'. Porém deixou a pergunta sem resposta.` */
</style>
