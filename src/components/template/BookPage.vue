<template>
    <div class="book-page">
        <div class="presentation">
            <div class="book-details">
                <div class="synopsis">
                    <p v-for="(paragraph, index) in synopsis" :key="index">
                        {{paragraph}}
                    </p>
                </div>
            </div>
            <div class="showcase">
                <img :src="bookImg" :alt="title">
                <div class="links">
                    <button @click="openPopup">Pegue a sua cópia!</button>
                </div>
            </div>
        </div>
        <div class="stores-banner">
            <img v-for="(store, index) in stores" :key="index" :src="store.image" alt="">
        </div>
        <Stores :stores="stores" />
    </div>
</template>

<script>
import Stores from "./StoresPopup"

export default {
    name: "BookPage",
    props: ['title', 'synopsis', 'bookImg', 'link', 'stores'],
    components: { Stores },
    methods: {
        openPopup() {
            document.getElementsByClassName('stores-popup-bg')[0].style.display = 'block';
        }
    }
}
</script>

<style>
.book-page {
    background-color: #eeeae7;
}

.book-page * {
    z-index: 3;
}

.presentation {
    padding: 100px 30px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.book-page .showcase {
    max-width: 25rem;
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.book-page .showcase img {
    width: 100%;
}

.showcase .links {
    margin-top: 70px;
}

.showcase .links button {
    display: block;
    padding: 8px 50px;
    border-radius: 5px;
    border: none;
    outline: none;
    text-transform: uppercase;
    padding-top: 12px;
    padding-bottom: 12px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    letter-spacing: -0.4px;
    transform: scale(1.0);
    transition: transform .5s ease-out;
    width: 20rem;
    cursor: pointer;
}

.showcase .links button:hover {
    transform: scale(1.05);
}

.book-details {
    margin-right: 25px;
}

.book-details p {
    text-align: left;
    max-width: 35rem;
    font-family: 'Garamond';
    font-size: 1.2em;
    line-height: 150%;
}

.stores-banner {
    background-color: rgba(205,205,205);
    height: 120px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.stores-banner img, .stores-options img {
    height: 80px;
    margin: 0 30px;
    max-width: 40vw;
}

.book-page .stores-banner img:nth-child(1), .stores-popup .amazon {
    height: 60px;
    margin-bottom: 20px;
    margin-top: 10px;
    max-width: 30vw;
}

@media(max-width: 740px) {
    .presentation {
        flex-direction: column;
    }

    .stores-banner {
        justify-content: space-around;
        margin: 0;
    }

    .book-page .showcase {
        margin: 0;
    }
}

</style>
