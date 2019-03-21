<template>
    <div id="about">
        <div class="about-content">
            <img src="../../assets/img/kgjoner.jpg" alt="">
            <div class="about-text">
                <h2>Sobre o Autor</h2>
                <!-- <hr> -->
                <p>K. G. Joner é natural de Floripa e, curioso pelos mistérios da natureza, acabou se formando em engenharia mecânica 
                    sem nunca deixar de rabiscar suas histórias. Desenha com mais vontade do que habilidade, faz trilhas 
                    esporadicamente, curte um bom rock clássico e toca violão para as paredes.</p> 
                <p>Pensa na fantasia como uma forma de entender a realidade, não ignorá-la. Suas histórias unem magia e 
                    metafísica para explorar dilemas comuns, como a busca por propósito, a esperança no amor ou o desejo 
                    pela liberdade.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    nome: "About"
}
</script>

<style>
#about {
    height: 667px;
    max-width: 100vw;
}

.about-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 667px;
}

.about-content {
    position: relative;
    overflow: hidden;
}

.about-content img {
    z-index: 0;
    position: relative;
    left: calc((25vw - 320px) - 150px);
    height: 667px;
}

.about-text {
    position: relative;
    left: calc((75vw - 960px) - 300px);
    z-index: 1;
    height: 667px;
}

.about-content .about-text:before {
    content: ' ';
    position: absolute;
    height: 900px;
    width: 1024px;
    /* z-index: 0; */

    background-color: #f2f2f2;
    transform: rotate(80deg);
    top: -200px;
    left: -200px;
}

.about-content p {
    position: relative;
    max-width: 30rem;
    width: 40vw;
    text-align: left;
    line-height: 175%;
    font-size: 1.1rem;
    letter-spacing: 0.6px;
    color: rgba(0,0,0,0.8);
    z-index: 2;
}

.about-text > p:first-of-type:first-letter {
    font-size: 2rem;
    float: left;
    padding-right: 4px;
    font-weight: bold;
}

.about-content h2 {
    position: relative;
    text-align: left;
    font-family: 'Philosopher';
    margin-top: 60px;
    margin-bottom: 50px;
    text-transform: uppercase;
    line-height: 175%;
    font-size: 3rem;
    letter-spacing: 0.6px;
    color: rgba(0,0,0,0.8);
    z-index: 2;
}

@media(max-width: 1160px){
    .about-content .about-text:before {
        left: -150px;
    }
}

@media(max-width: 980px){
    .about-content img {
        left: calc((40vw - 518px) - 100px);
    }

    .about-text {
        left: calc((75vw - 960px) - 250px);
    }

    .about-content p {
        font-size: 1.05rem;
    }

    .about-content h2 {
        line-height: 125%;
        margin-bottom: 30px;
        width: 45vw;
    }
}

@media(max-width: 840px) {
    .about-content p {
        width: 45vw;
    }
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
