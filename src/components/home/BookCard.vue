<template>
    <div class="book-card-c" :class="{ 'reverse': (reverse && windowWidth > 740) }" ref="card">
        <div class="block-enclousure">
            <div class="coloured-block" ref="color">
                <!-- <p>{{title}}</p> -->
                <p class="horizontal-title">{{fullTitle}}</p>
            </div>
        </div>
        <div class="book-card">
            <img :src="cover" alt="">
            <div class="book-info">
                <h6 ref="genre">{{genre}}</h6>
                <!-- <h4>{{fullTitle}}</h4> -->
                <p>{{synopsis}}</p>
                <a :href="link" ref="button">Saiba Mais</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:"BookCard",
    props: ['backColor', 'cover', 'title', 'fullTitle', 'titleColor', 'genre', 'synopsis', 'link', 'reverse'],
    computed: {
        backClass() {
            if(this.fullTitle.includes('Sirius')) {
                return 'cds'
            } else if(this.fullTitle.includes('Anseio')) {
                return 'aap'
            } else if(this.fullTitle.includes('Chamado')) {
                return 'cdc'
            }
            return ''
        },
        ...mapState(['windowWidth'])
    },
    mounted() {
       this.$refs.color.style.backgroundColor = `${this.backColor}`;
       this.$refs.color.style.color = `${this.titleColor}`;
       this.$refs.color.classList.add(this.backClass);
       this.$refs.genre.style.borderColor = `${this.backColor}`;
       this.$refs.button.style.backgroundColor = `${this.backColor}`;
       this.$refs.button.classList.add(this.backClass);
       if(this.genre=="Novela"){
           this.$refs.card.classList.add('short-img')
       }
    }
}
</script>

<style>

.book-card-c {
    position: relative;
    margin-top: 100px;
    margin-bottom: 30px;
}

.book-card {
    position: relative;
    margin-left: 217px;
    /* height: 320px; */
    padding: 100px 0 30px 0;
    width: 720px;
    background-color: #333;
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.reverse .book-card {
    margin-left: calc(100vw - 720px - 217px)
}

@keyframes leftSlide {
    0%{ transform: translateX(-800px)}
    100%{ transform: translateX(0px)}
}

@keyframes rightSlide {
    0%{ transform: translateX(800px)}
    100%{ transform: translateX(0px)}
}

@keyframes rightSlideReverse {
    0%{ transform: translateX(800px) scaleX(-1)}
    100%{ transform: translateX(0px) scaleX(-1)}
}

@keyframes grow {
    0%{ width: 0}
    100%{ width: 1100px}
}

.block-enclousure {
    position: absolute;
    top: -40px;
    z-index: 1;
    height: 100px;
    width: 1100px;
    animation-name: grow;
    animation-duration: 1s;
    overflow: hidden;
    display: none;
}

.book-card-c .coloured-block {
    content: "";
    position: absolute;
    z-index: 1;
    height: 100px;
    width: 1100px;
    /* border-bottom-right-radius: 15px;
    border-top-right-radius: 15px; */
    overflow: hidden;
    background-image:  -webkit-repeating-linear-gradient(bottom, hsla(26, 17%, 92%, 0.01) 0%, hsla(26, 17%, 92%, 0.05)   10%, hsla(26, 17%, 92%, 0) 20%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   24%, hsla(0,0%,  0%,.02) 33%, hsla(0,0%,  0%,0) 40%),

    linear-gradient(90deg, hsla(26, 17%, 92%, 0.6)  0%,  
    hsla(26, 17%, 92%, 0.5) 5%, 
    hsla(26, 17%, 92%, 0.01) 17%, 
    hsla(26, 17%, 92%, 0.01) 70%,
    hsla(26, 17%, 92%, 0.5) 90%,
    hsla(26, 17%, 92%, 0.6) 93%,
    hsla(26, 17%, 92%, 1)100%),

    linear-gradient(180deg, hsla(0, 0%, 0%, 0.2)  0%, 
     hsla(0, 0%, 0%, 0)  5%,
      hsla(0, 0%, 0%, 0)  90%,
       hsla(0, 0%, 0%, 0.2)  100%),

    linear-gradient(180deg, hsla(26, 17%, 92%, 0)  0%, 
     hsla(26, 17%, 92%, 0.05)  6%,
     hsla(26, 17%, 92%, 0.2)  6.5%,
     hsla(26, 17%, 92%, 0.1)  8.5%,
     hsla(26, 17%, 92%, 0)  9%,
     hsla(26, 17%, 92%, 0)  14%,
     hsla(26, 17%, 92%, 0.05)  14.8%,
     hsla(26, 17%, 92%, 0.3)  16%,
     hsla(26, 17%, 92%, 0.2)  16.5%,
     hsla(26, 17%, 92%, 0)  17%,
     hsla(26, 17%, 92%, 0)  27%,
     hsla(26, 17%, 92%, 0.05)  28%,
     hsla(26, 17%, 92%, 0.2)  29%,
     hsla(26, 17%, 92%, 0.1)  30%,
     hsla(26, 17%, 92%, 0)  31%,
     hsla(26, 17%, 92%, 0)  67%,
     hsla(26, 17%, 92%, 0.05)  68%,
     hsla(26, 17%, 92%, 0.2)  68.5%,
     hsla(26, 17%, 92%, 0.1)  70%,
     hsla(26, 17%, 92%, 0)  71%,
     hsla(26, 17%, 92%, 0)  87%,
     hsla(26, 17%, 92%, 0.05)  88%,
     hsla(26, 17%, 92%, 0.2)  88.5%,
     hsla(26, 17%, 92%, 0.1)  89%,
     hsla(26, 17%, 92%, 0)  89.5%,
     hsla(26, 17%, 92%, 0)  100%);  
}

.book-card-c .coloured-block::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0px;
    height: 100px;
    width: 1000px;
}

.book-card-c .coloured-block.cds::after {
    background-image:  -webkit-repeating-linear-gradient(bottom, hsla(26, 17%, 92%, 0.01) 0%, hsla(26, 17%, 92%, 0.05)   10%, hsla(26, 17%, 92%, 0) 20%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   24%, hsla(0,0%,  0%,.05) 33%, hsla(0,0%,  0%,0) 40%),
    
    linear-gradient(90deg, hsla(214, 56%, 44%, 0)  0%,   
    hsla(214, 56%, 44%, 1) 15%, 
    hsla(214, 56%, 44%, 1) 75%,
    hsla(214, 56%, 44%, 0.4)90%,
    hsla(214, 56%, 44%, 0)100%);
}

.book-card-c .coloured-block.aap::after {
    background-image:  -webkit-repeating-linear-gradient(bottom, hsla(26, 17%, 92%, 0.01) 0%, hsla(26, 17%, 92%, 0.05)   10%, hsla(26, 17%, 92%, 0) 20%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   24%, hsla(0,0%,  0%,.05) 33%, hsla(0,0%,  0%,0) 40%),
    
    linear-gradient(90deg, hsla(214, 56%, 44%, 0)  0%,   
    hsla(268, 42%, 43%, 0.95) 15%, 
    hsla(268, 42%, 43%, 0.95) 70%,
    hsla(268, 42%, 43%, 0.35)90%,
    hsla(214, 56%, 44%, 0)100%);
}

.book-card-c .coloured-block.cdc::after {
    background-image: -webkit-repeating-linear-gradient(bottom, hsla(26, 17%, 92%, 0.01) 0%, hsla(26, 17%, 92%, 0.05)   10%, hsla(26, 17%, 92%, 0) 20%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   24%, hsla(0,0%,  0%,.05) 33%, hsla(0,0%,  0%,0) 40%),
    
    linear-gradient(90deg, hsla(214, 56%, 44%, 0)  0%,   
    rgba(204,56,67) 15%, 
    rgba(204,56,67) 70%,
    rgba(204,56,67, 0.4)90%,
    hsla(214, 56%, 44%, 0)100%);
}

.reverse .block-enclousure {
    margin-left: calc(100vw - 1100px);
}

.book-card-c.reverse .coloured-block {
    transform: scaleX(-1);
}

.book-card-c .coloured-block p {
    font-family: "Charlemagne";
    font-size: 4.5rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    position: relative;
    left: -280px;
    letter-spacing: 0.8px;
    line-height: 120%;
    transform: rotate(-90deg);
    /* color: rgba(0,0,0,0.2); */
}

.book-card-c.reverse .coloured-block p {
    left: calc(100vw - 720px - 277.2px)
}

.book-card-c .coloured-block p.horizontal-title {
    transform: rotate(0deg);
    position: absolute;
    color: #eeeae7ee;
    font-size: 2.5rem;
    z-index: 1;
    transform: scaleY(1.2);
    /* text-shadow: 2px 2px 1px rgb(55, 111, 184),
    -2px 2px 1px rgb(55, 111, 184),
    -2px -2px 1px rgb(55, 111, 184),
    2px -2px 1px rgb(55, 111, 184); */
    top: 30px;
    left: 0px;
    text-align: center;
}

.book-card-c .coloured-block.cds p.horizontal-title {
    color: #cddae0;
}

.book-card-c .coloured-block.aap p.horizontal-title {
    color: #f0e2ffcc;
}

.book-card-c .coloured-block.cdc p.horizontal-title {
    color: #e6d3d1ee;
}

.book-card-c.reverse .coloured-block p.horizontal-title {
    left: -50px;
    transform: scaleX(-1) scaleY(1.2);
}

.book-card img {
    position: absolute;
    display: none;
    top: 0px;
    left: -200px;
    height: 95%;
    z-index: 2;

    animation-name: leftSlide;
    animation-duration: 1s;
}

.book-card-c.short-img.reverse .book-card img {
    left: calc(720px - 126px);
    animation-name: rightSlide;
}

.book-card-c.short-img .book-card img {
    height: 82%;
    left: -100px;
    top: 20px;
}

.book-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fcfcfc;
    padding: 10px;
    /* position: absolute;
    top: 20px; */
    margin-left: 150px;
    margin-right: 20px;
    max-width: 520px;
    text-align: left;
}

.book-card-c.reverse .book-info {
    margin-left: 40px;
    margin-right: 150px;
}

.book-info h6 {
    padding: 0 5px 3px 5px;
    border-bottom: 1px solid #fff;
    /* font-family: "Signika" */
}

.book-info p {
    /* font-family: "Signika"; */
    line-height: 160%;
    letter-spacing: 0.5px;
    min-height: 100px;
    margin-top: 10px;
}

.book-info h4 {
    margin-bottom: 20px;
    font-family: "Philosopher";
    /* min-height: 60px; */
}

.book-info a {
    color: #fcfcfc;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 14px;
    letter-spacing: 0.5px;
    align-self: center;
    text-transform: uppercase;
    border-radius: 17px;
    /* margin-top: 20px; */
}

.book-info a:hover {
    color: #fff;
    text-decoration: none;
}

.book-info a.cds:hover {
    background-color: #3976c7 !important;
}

.book-info a.aap:hover {
    background-color: #7e48bbf1 !important;
}

.book-info a.cdc:hover {
    background-color: rgb(236, 61, 73) !important;
}

@media(max-width: 960px) {
    .book-card {
        width: calc(90vw - 50px);
        margin-left: 10vw;
    }

    .book-card-c .coloured-block, .book-card-c .coloured-block:after {
        top: 0px;
        left: -3vw;
        height: 150px;
        width: 103vw;
    }

    .book-card-c .coloured-block p.horizontal-title {
        font-size: 2rem;
        width: calc(100vw - 50px);
        right: 30px;
        left: 25px;
        line-height: 120%;
    }

    .book-card img {
        top: 10px;
        left: -10vw;
        height: 90%;
    }

    .book-card-c.short-img .book-card img {
        height: 77%;
        left: 40px;
        top: 30px;
    }

    .book-info {
        margin-left: 260px;
        margin-right: 20px;
    }

    .book-info p {
        margin-bottom: 30px;
    }
}

@media(max-width: 740px) {
    .book-card {
        width: calc(100vw - 80px);
        margin-left: 30px;
    }

    .book-card img {
        top: 30px;
        left: -40px;
        height: 290px;
    }
}

@media(max-width: 600px) {
    .book-card {
        margin-top: 75px;
        /* height: 500px; */
        width: calc(100vw - 50px);
        margin-left: 20px;
        margin-right: 20px;
    }

    .book-card-c .block-enclousure {
        height: 150px;
    }

    .book-card-c .coloured-block, .book-card-c .coloured-block:after {
        top: 0px;
        left: -3vw;
        height: 150px;
        width: 103vw;
    }

    .book-card-c .coloured-block p.horizontal-title {
        font-size: 1.8rem;
        width: calc(100vw - 50px);
        right: 30px;
        left: 25px;
        line-height: 140%;
        text-align: right;
    }

    .book-card img {
        top: -30px;
        left: -20px;
        height: 330px;
    }

    .book-card-c.short-img .book-card img {
        height: 280px;
        left: 40px;
        top: -10px;
    }

    .book-info {
        margin-top: 180px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .book-info p {
        margin-bottom: 30px;
    }
}

</style>
