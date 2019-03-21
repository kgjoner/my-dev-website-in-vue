<template>
    <div class="stores-popup-bg">
        <button class="close" @click="closePopup">Fechar</button>
        <div class="stores-popup">
            <div v-for="(store, index) in stores" class="stores-options" :key="index">
                <img v-if="!store.mail" :class="{'amazon': (store.image.includes('amazon')), 
                    'wattpad': (store.image.includes('wattpad'))}" :src="store.image" alt="">
                <a v-if="store.link" :href="store.link" target="_blank">{{store.linkName}}</a>
                <a v-if="store.link2" :href="store.link2" target="_blank">{{store.link2Name}}</a>
                <p v-if="store.obs">{{store.obs}}</p>
                <i v-if="store.mail" class="fa fa-envelope"></i>
                <div v-if="store.mail" id="mc_embed_signup">
                    <form action="//kaiogabriel.us15.list-manage.com/subscribe/post?u=214d7b05f42b86426939108b9&amp;id=f680198f7e"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
                    novalidate>
                        <div id="mc_embed_signup_scroll">
                            <div class="mc-field-group">
                                <label for="mce-FNAME" style="display: none;">Nome</label>
                                <input style="display:none" type="text" value="aventureiro" name="FNAME" class="required" id="mce-FNAME" placeholder="Nome">
                            </div>
                            <div class="mc-field-group">
                                <label for="mce-EMAIL" style="display: none;">Email</label>
                                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="E-mail">
                            </div>
                            <input v-if="$route.fullPath==='/chamado-do-cacador'" type="checkbox" value="2" name="group[1609][2]" id="mce-group[1609]-1609-0" 
                                checked="true" style="display:none">
                            <input v-if="$route.fullPath === '/anseio-pelas-artes-proibidas'" type="checkbox" value="4" name="group[1609][4]" id="mce-group[1609]-1609-1" 
                                checked="true" style="display:none">
                            <div id="mce-responses" class="clear">
                                <div class="response" id="mce-error-response" style="display:none"></div>
                                <div class="response" id="mce-success-response" style="display:none"></div>
                            </div>
                            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_27613588b850606cebd9fa4cd_c022e8edfb"
                                    tabindex="-1" value=""></div>
                            <div class="clear"><input type="submit" value="Receba por email" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StoresPopup",
    props: ['stores'],
    methods: {
        closePopup() {
            document.getElementsByClassName('stores-popup-bg')[0].style.display = 'none';
        }
    }
}
</script>

<style>
.stores-popup .wattpad {
    margin: 10px 22px 20px 22px;
    height: 60px;
}


.book-page .stores-popup-bg {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-top: 120px;
    background-color: rgba(0,0,0,0.8);
    z-index: 100;
}

.stores-popup {
    background: #f3f3f3;
    width: 800px;
    margin: 0 auto;
    border-radius: 10px;
    padding: 50px;

    display: flex;
    justify-content: space-around;
}

.stores-options {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stores-options a {
    display: block;
    padding: 8px 25px;
    margin-top: 20px;
    background-color:rgba(3, 122, 165, 1);
    color: #fcfcfc;
    border-radius: 5px;
    text-decoration: none;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    letter-spacing: -0.4px;
    width: 200px;
}

.stores-options a:hover {
    background-color: rgb(13, 147, 196);
    text-decoration: none;
    color: #fcfcfc;
}

.stores-options p {
    margin-top: 35px;
    max-width: 240px;
}

.stores-popup-bg .close {
    position: relative;
    top: 10px;
    right: calc(50vw - 400px + 40px);
    outline: none;
    font-size: 1rem;
    /* text-decoration: underline; */
    text-shadow: none;
}

.stores-popup i {
    font-size: 3rem;
    margin-bottom: 28px;
    margin-top: 0px;
    color: #6c6c6c;
}

.stores-popup .stores-options img {
    margin: 0;
}

.stores-popup #mc_embed_signup {
    padding-top: 0;
}

.stores-popup #mc_embed_signup form {
    padding-left: 0;
}

.stores-popup #mc_embed_signup_scroll {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.stores-popup #mc_embed_signup .mc-field-group input {
    margin-bottom: 0px;
    margin-right: 5px;
    margin-top: 5px;
    width: 200px;
    height: 38px;
    border-radius: 4px;
    font-family: "Philosopher";
    padding-left: 5px;
}

.stores-popup #mc_embed_signup .mc-field-group input:focus {
    outline-color: rgba(3, 122, 165, 1);
    box-shadow: 0 0 0 1px rgba(3, 122, 165, 0.5)
}

.stores-popup #mc_embed_signup .button {
    display: block;
    padding: 8px 25px;
    margin-top: 20px;
    background-color:rgba(3, 122, 165, 1);
    color: #fcfcfc;
    border-radius: 5px;
    outline: none;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    letter-spacing: -0.4px;
    width: 200px;
    border: none;
    cursor: pointer;
}

.stores-popup #mc_embed_signup .button:hover {
    background-color: rgb(13, 147, 196);
}

@media(max-width: 960px) {
    .stores-popup {
        width: 720px;
    }

    .stores-popup-bg .close {
        right: calc(50vw - 400px + 80px);
    }
}

@media(max-width: 800px) {
    .stores-popup {
        width: 600px;
    }

    .stores-popup-bg .close {
        right: calc(50vw - 400px + 140px);
    }
}

@media(max-width: 660px) {
    .stores-popup {
        width: 450px;
        padding: 40px 10px;
    }

    .stores-popup-bg .close {
        right: calc(50vw - 400px + 215px);
    }

    .stores-popup .stores-options img {
        margin: 0;
        width: 180px;
        max-width: 180px;
    }

    .stores-popup .stores-options .amazon {
        width: 140px;
        max-width: 140px;
    }

    .stores-options a {
        width: 150px;
    }

    .stores-options p {
        max-width: 180px;
    }
}

@media(max-width: 503px) {
    .book-page .stores-popup-bg {
        padding-top: 20px;
    }

    .stores-popup-bg .close {
        top: 30px;
        right: calc(5vw + 20px)
    }

    .stores-popup {
        width: 90vw;
        flex-direction: column;
    }

    .stores-options {
        margin-bottom: 30px;
    }

    .stores-options p {
        margin-top: 15px;
    }

    .stores-popup i {
        margin-bottom: 20px;
        margin-top: 30px;
    }
}
</style>
