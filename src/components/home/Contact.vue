<template>
    <div id="contact">
        <div class="contact-info">
            <h2>Email e Redes Sociais</h2>
            <hr>
            <div class="contact-media">
                <a class="social-icon" href="mailto:contato@kgjoner.com" title="Email">
                    <i class="fa fa-envelope"></i></a>
                <p>contato@kgjoner.com</p>
            </div>
            <div class="icons">
                <div class="contact-media">
                    <a class="social-icon fb" href="https://facebook.com/kgjoner" title="Facebook">
                        <i class="fa fa-facebook-f"></i></a>
                    <p class="social-description">/kgjoner</p>
                </div>
                <div class="contact-media">
                    <a class="social-icon ig" href="https://instagram.com/kgjoner" title="Instagram">
                        <i class="fa fa-instagram"></i></a>
                    <p class="social-description">@kgjoner</p>
                </div>
                <div class="contact-media">
                    <a class="social-icon wt" href="https://wattpad.com/user/kgjoner" title="Wattpad">
                        <i class="icon-wattpad"></i></a>
                    <p class="social-description">/kgjoner</p>
                </div>
            </div>
        </div>
        <b-form name="contact" method="POST" data-netlify="true" action="/cavaleiro-de-sirius" class="contact-form">
            <h2>Deixe uma mensagem!</h2>
            <hr>
            <b-col md="12" sm="12">
                <b-form-group label-for="contact-name">
                    <b-form-input id="contact-name" type="text" v-model="name" required placeholder="Nome"/>
                </b-form-group>
                <b-form-group label-for="contact-email">
                    <b-form-input id="contact-email" type="text" v-model="email" required placeholder="Email"/>
                </b-form-group>
            </b-col>
            <b-col md="12" sm="12">
                <b-form-group label-for="contact-content">
                    <b-form-textarea id="contact-content" rows="4" max-rows="4" v-model="text" placeholder="Mensagem"/>
                </b-form-group>
            </b-col>
            <b-col class="send">
                <b-button type="submit" variant="primary" @click="showSuccess">Enviar</b-button>
            </b-col>
        </b-form>
        <SuccessPopup :name="name"/>
    </div>
</template>

<script>
import SuccessPopup from './SuccessPopup'

export default {
    name: "Contact",
    components: { SuccessPopup },
    data: function() {
        return {
            name: '',
            text: '',
            email: ''
        }
    },
    methods: {
        showSuccess() {
            const checkedName = this.name.split(' ').join('')
            const checkedEmail = this.email.split(' ').join('')
            const checkedText = this.text.split(' ').join('')
            if(checkedName != '' && checkedEmail != '' && checkedText != '') {
                document.getElementsByClassName('success-popup-bg')[0].style.display = 'block';
            }
        }
    }
}
</script>

<style>
#contact {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin: 80px 50px;
    padding: 130px 40px 40px 40px;
    max-width: 100vw;
    overflow: hidden;
    background-color: rgba(62, 65, 66, 0.8);
    color: #fcfcfc;
    position: relative;
}

#contact:before {
    content: 'Contato';
    position: absolute;
    top: 20px;
    left: 50px;
    text-align: left;
    font-family: 'Philosopher';
    text-transform: uppercase;
    line-height: 175%;
    font-size: 3rem;
    letter-spacing: 0.6px;
}

#contact h2 {
    margin-bottom: 0px;
    padding-left: 10px;
    font-family: "Philosopher";
    font-size: 1.8rem;
}

#contact hr {
    margin: 0 0 20px 0;
    width: 100%;
    background-color: rgba(255,255,255,0.8)
}

.contact-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    padding-right: 100px;
    position: relative;
    top: 0;
}

.contact-info p {
    font-size: 1rem;
    margin-left: 10px;
    margin-bottom: 0;
}

.contact-media {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 15px;
}

.social-icon {
    height: 2.25rem;
    width: 2.25rem;
    background-color: #fafafa;
    border-radius: 0.25rem;
    margin-left: 10px;

    color: #4c4c4c;
    text-decoration: none;
    font-size: 1.3rem;

    display: flex;
    align-items: center;
    justify-content: center;
}

.social-icon:hover {
    background-color: #4c4c4c;
    text-decoration: none;
    color: #fafafa;
}

.social-icon.fb:hover {
    background-color: rgba(66,103,178)
}

.social-icon.ig:hover {
    background-color: rgba(239,72,87)
}

.social-icon.wt:hover {
    background-color: rgba(255,102,18)
}

.contact-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    text-align: left;
}

.contact-form .b-form-group .form-control:focus {
    border-color:#19a5d8;
}

.send button {
    width: 50%;
    height: 60px;
    float:right;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.4px;
    background-color: #1492c0;
    border-color: #1492c0;
}

.send button:hover {
    background-color: #0f81aa;
    border-color: #0b749b;
}

@media(max-width: 930px) {
    #contact {
        flex-direction: column;
    }
    #contact .icons {
        display: flex;
        margin-bottom: 30px;
    }
    .icons p.social-description {
        display: none;
    }
    .contact-info {
        width: 80%;
        padding-right: 0;
    }
    .contact-form {
        width: 80%;
    }
}

@media(max-width: 740px) {
    .contact-info {
        width: 100%;
    }
    .contact-form {
        width: 100%;
    }
}

@media(max-width: 520px) {
    #contact {
        margin-right: 20px;
        margin-left: 20px;
    }
}

@media(max-width: 420px) {
    #contact {
        padding-right: 20px;
        padding-left: 20px;
    }
}
</style>
