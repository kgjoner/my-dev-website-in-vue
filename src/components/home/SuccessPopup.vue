<template>
    <div class="success-popup-bg">
        <button class="close" @click="closePopup">Fechar</button>
        <div class="success-popup">
            <h2>Obrigado pelo contato, {{name}}!</h2>
            <p>A mensagem foi recebida e eu responderei em breve.</p>
            <h6>Abraço,</h6>
            <p>K. G. Joner</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "SuccessPopup",
    props: ['name'],
    methods: {
        closePopup() {
            document.getElementsByClassName('success-popup-bg')[0].style.display = 'none';
        }
    }
}
</script>

<style>

.success-popup-bg {
    /* display: none; */
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-top: 120px;
    background-color: rgba(0,0,0,0.8);
    z-index: 100;
}

.success-popup {
    background: #f3f3f3;
    width: 800px;
    max-width: 80vw;
    margin: 0 auto;
    border-radius: 10px;
    padding: 50px;
    text-align: left;
    color: #4c4c4c;
}

.success-popup-bg .close {
    position: relative;
    top: 10px;
    right: calc(50vw - 400px + 40px);
    outline: none;
    font-size: 1rem;
    /* text-decoration: underline; */
    text-shadow: none;
}

#contact .success-popup-bg .success-popup h2 {
    margin-bottom: 50px;
    margin-top: 50px;
}

#contact .success-popup-bg .success-popup p {
    margin-left: 20px;
    margin-bottom: 20px;
}

#contact .success-popup-bg .success-popup h6 {
    margin-left: 20px;
    margin-bottom: 5px;
}

@media(max-width: 960px) {
   .success-popup-bg .close {
        right: calc(50vw - 42% + 40px);
   } 
}

</style>
