<template>
    <div id="contact">
        <div class="contact-info">
            <h2>Email and Social Media</h2>
            <hr>
            <div class="contact-media">
                <a class="social-icon" href="mailto:contact@kgjoner.com" title="Email">
                    <i class="fa fa-envelope"></i></a>
                <p>contact@kgjoner.com</p>
            </div>
            <div class="icons">
                <div class="contact-media">
                    <a class="social-icon git" href="https://github.com/kgjoner" 
                        target="_blank"  title="Github">
                        <i class="fa-github"></i></a>
                    <p class="social-description">/kgjoner</p>
                </div>
                <div class="contact-media">
                    <a class="social-icon in" href="https://www.linkedin.com/in/kaio-gabriel-da-silveira-rosa-63938011a/" 
                        target="_blank"  title="Linkedin">
                        <i class="fa-linkedin"></i></a>
                    <p class="social-description">kaio gabriel</p>
                </div>
            </div>
        </div>
        <b-form name="Contact" @submit.prevent="handleSubmit" method="post" class="contact-form" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="Contact" />
            <h2>Let a message!</h2>
            <hr>
            <b-col md="12" sm="12">
                <b-form-group label-for="contact-name">
                    <b-form-input id="contact-name" name="name" type="text" v-model="form.name" required placeholder="Name"/>
                </b-form-group>
                <b-form-group label-for="contact-email">
                    <b-form-input id="contact-email" name="email" type="text" v-model="form.email" required placeholder="Email"/>
                </b-form-group>
            </b-col>
            <b-col md="12" sm="12">
                <b-form-group label-for="contact-content">
                    <b-form-textarea id="contact-content" name="text" rows="4" max-rows="4" v-model="form.text" placeholder="Message"/>
                </b-form-group>
            </b-col>
            <b-col class="send">
                <b-button type="submit" variant="primary">Send</b-button>
            </b-col>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Contact",
    data: function() {
        return {
            form: {
                name: '',
                email: '',
                text: ''
            }
        }
    },
    methods: {
        encode (data) {
            return Object.keys(data)
                .map(
                    key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
                )
                .join("&");
        },

        handleSubmit () {
            this.text = this.text + ' // from .dev subdomain.'
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            };
            axios.post("/", this.encode({
                "form-name": "Contact",
                ...this.form
                }),
                axiosConfig
            )
            .then(() => this.$toasted.global.msgSent())
            .then(() => this.form = {name: '', email: '', text: ''})
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
    content: 'Contact';
    position: absolute;
    top: 20px;
    left: 50px;
    text-align: left;
    font-family: 'Baloo 2';
    text-transform: uppercase;
    line-height: 175%;
    font-size: 3rem;
    letter-spacing: 0.6px;
}

#contact h2 {
    margin-bottom: 0px;
    padding-left: 10px;
    font-family: "Baloo 2";
    font-size: 1.8rem;
    text-align: left;
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

    color: var(--dark-color);
    text-decoration: none;
    font-size: 1.3rem;

    display: flex;
    align-items: center;
    justify-content: center;
}

.social-icon:hover {
    background-color: var(--main-color);
    text-decoration: none;
    color: #fafafa;
}

.social-icon.git:hover {
    background-color: #24292E
}

.social-icon.in:hover {
    background-color: #0077B5;
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
        padding: 130px 60px 40px 40px;
    }
    #contact .icons {
        display: flex;
        margin-bottom: 30px;
    }
    .icons p.social-description {
        display: none;
    }
    .contact-info {
        width: 100%;
        padding-right: 0;
    }
    .contact-form {
        width: 100%;
    }
}

@media(max-width: 740px) {
    #contact {
        padding: 130px 20px 40px 20px;
    }
    #contact:before {
        left: 30px;
    }
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
