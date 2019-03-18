<template>
    <div id="books" class="books">
        <BookCard backColor="#3268af" :cover="coverCdS" genre="Romance"
            title="O Cavaleiro de Sirius" fullTitle="O Cavaleiro de Sirius" titleColor="#14509e" 
            synopsis="Garef sempre soube que pagaria um preço pelo manto azul. Pela espada. Pela magia.
            Mas recém-sagrado cavaleiro, tudo o que sente é um gosto amargo."
            link="/cavaleiro-de-sirius"/>
        <BookCard backColor="#6b409cf1" :cover="coverAAP" genre="Novela" :reverse="true"
            title="Um Anseio pelas Artes Proibidas" fullTitle="Um Anseio pelas Artes Proibidas" titleColor="rgba(94,56,138)"
            synopsis="Gregório largou os estudos para tentar reparar um acidente. Enquanto isso, Pauline 
            está à sua procura, pois teme o que ele pode descobrir."
            link="/anseio-pelas-artes-proibidas"/>
        <BookCard backColor="rgba(204,56,67)" :cover="coverCdC" genre="Novela"
            title="O Chamado o Caçador" fullTitle="O Chamado do Caçador" titleColor="rgba(163,45,54)"
            synopsis="Vicente espera conseguir aposentar a espada e buscar seu propósito. Mas antes terá uma
            última caçada a fazer."
            link="/chamado-do-cacador">
        </BookCard>
    </div>
</template>

<script>
import BookCard from './BookCard'
import coverCdC from '../../assets/img/cover-chamado.png'
import coverAAP from '../../assets/img/cover-anseio.png'
import coverCdS from '../../assets/img/cover-sirius.png'

export default {
    name: "Books",
    components: { BookCard },
    data: function() {
        return {
            coverCdC,
            coverAAP,
            coverCdS
        }
    }
}

//#492672   #174e97
</script>

<style>

.books {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    flex-wrap: wrap;
    width: 100vw;
    overflow: hidden;

    padding-top: 180px;
    padding-bottom: 100px;
    position: relative;

    background-color: #eeeae7; 
}

.books::before {
    content: 'Livros';
    position: absolute;
    font-family: 'Philosopher';
    top: 100px;
    left: 50px;
    text-transform: uppercase;
    line-height: 175%;
    font-size: 3rem;
    letter-spacing: 0.6px;
    color: rgba(0,0,0,0.8);
    z-index: 2;
}
</style>
