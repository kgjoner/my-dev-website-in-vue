<template>
    <div class="cds-navbar">
        <div class="runes">
            <button v-show="windowWidth >= 600" class="sword-rune rune-o active" 
                kg-ref="book" @click="e => scrollIt(e, scrollItems[0], headerHeight)">o</button>
            <button v-show="windowWidth >= 600" class="sword-rune rune-s" kg-ref="order"
            @click="e => scrollIt(e, scrollItems[1], (headerHeight+50))">s</button>
            <button v-show="windowWidth >= 600" class="sword-rune rune-p" kg-ref="signomancy"
             @click="e => scrollIt(e, scrollItems[2], headerHeight+50)">p</button>
            <!-- <button class="sword-rune rune-k" kg-ref="runes"
             @click="e => scrollIt(e, scrollItems[3], headerHeight+50)">j</button> -->
            <button v-show="windowWidth >= 600" class="sword-rune rune-m" kg-ref="about"
            @click="e => scrollIt(e, scrollItems[4], headerHeight-30)">m</button>
            <p v-show="windowWidth > 870 || windowWidth < 600" class="sword-rune">n</p>
            <p v-show="windowWidth > 1080 || windowWidth < 600" class="sword-rune rune-w">w</p>
            <p v-show="windowWidth > 1040 || windowWidth < 600" class="sword-rune rune-j">h</p>
            <p v-show="windowWidth > 910 || windowWidth < 600" class="sword-rune rune-b">B</p>
            <p v-show="windowWidth > 990" class="sword-rune rune-z">Z</p>
            <p v-show="windowWidth > 1120" class="sword-rune rune-z">q</p>
            <p v-show="windowWidth > 950 || windowWidth < 600" class="sword-rune rune-z">a</p>
            <p v-show="windowWidth > 1160" class="sword-rune rune-z">T</p>
            <!-- <div class="up-runes">
            <p class="sword-rune rune-a">A</p>
            <p class="sword-rune rune-i">i</p>
            <p class="sword-rune rune-g">g</p>
            <p class="sword-rune rune-f">F</p>
            <p class="sword-rune rune-q">q</p>
            <p class="sword-rune rune-t">T</p>
            <p class="sword-rune rune-h">h</p>
            <p class="sword-rune rune-y">y</p>
            <p class="sword-rune rune-d">d</p>
            <p class="sword-rune rune-e">E</p>
            </div> -->
        </div>
        <div v-if="windowWidth > 740" class="cds-enclosure">
            <ul class="cds-navbar-options">
                <li kg-ref="book" class="selected">O Livro</li>
                <li kg-ref="order">A Ordem</li>
                <li kg-ref="signomancy">Signomancia</li>
                <li kg-ref="runes">Runas</li>
                <li kg-ref="about">Autor</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    nome: 'CdSNavbar',
    data: function() {
        return {
            headerHeight: 90,
            activeItem: 'book',
            options: [
                'book',
                'order',
                'signomancy',
                'runes',
                'about'
            ],
            engraveOn: 'true',
        }
    },
    computed: {
        scrollItems(){
            return [ 
                document.getElementById('book'),
                document.getElementById('order'),
                document.getElementById('signomancy'),
                document.getElementById('runes'),
                document.getElementById('about')
            ]
        },
        ...mapState(['windowWidth'])
    },
    methods: {
        scrollIt(e, destination, offset = 0, duration = 900) {
            e.preventDefault()

            this.engraveOn = 'false'
            const destinationEl = document.querySelectorAll(`[kg-ref="${destination.id}"]`)[0]
            document.querySelectorAll(`[kg-ref="${this.activeItem}"]`)[0].classList.remove('active')
            document.querySelectorAll(`.orb`)[0].classList.remove('active')
            document.querySelectorAll(`.orb`)[0].classList.add('inactive')
            document.querySelectorAll(`.orb-rune`)[0].classList.remove('active')
            document.querySelectorAll(`.orb-rune`)[0].classList.add('blink')
            setTimeout(() => {
                document.getElementsByClassName('orb-rune')[0].innerHTML = destinationEl.innerHTML
                document.querySelectorAll(`.orb`)[0].classList.remove('inactive')
                document.querySelectorAll(`.orb-rune`)[0].classList.remove('blink')
                document.querySelectorAll(`.orb-rune`)[0].classList.add('active')
                document.querySelectorAll(`.orb`)[0].classList.add('active')
            }, 1000)
            destinationEl.classList.add('active')
            document.querySelectorAll(`[kg-ref="${this.activeItem}"]`)[1].classList.remove('selected')

            let start = window.pageYOffset;
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

            const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
            const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
            let destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

            const vueComp = this
            function scroll() {
                const now = 'now' in window.performance ? performance.now() : new Date().getTime();
                const time = Math.min(1, ((now - startTime) / duration));
                if(destinationOffsetToScroll > start) {
                    window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
                    if(Math.ceil(window.scrollY) < (destinationOffsetToScroll - offset)) {
                        window.requestAnimationFrame(scroll);
                    } else {
                        vueComp.engraveSelected(vueComp.activeItem, destination.id, true)
                        vueComp.activeItem = destination.id;
                        vueComp.engraveOn = 'true';
                    }
                } else {
                    window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
                    if((Math.ceil(window.scrollY) > (destinationOffsetToScroll - offset)) &&
                        window.scrollY !== 0) {
                        window.requestAnimationFrame(scroll);
                    } else {
                        vueComp.engraveSelected(vueComp.activeItem, destination.id, true)
                        vueComp.activeItem = destination.id;
                        vueComp.engraveOn = 'true';
                    }
                }
            }
            window.requestAnimationFrame(scroll)
        },
        checkActiveEl() {
            if(this.engraveOn==='true'){
                const newActiveItem = this.scrollItems.reduce((newOne, item) => {
                    if(item.offsetTop <= (window.scrollY + this.headerHeight + 60)) {
                        if(item.offsetTop > newOne.offsetTop) {
                            return item
                        }
                    }
                    return newOne
                })
                if(newActiveItem.id !== this.activeItem) {
                    this.engraveSelected(this.activeItem, newActiveItem.id)
                    document.querySelectorAll(`[kg-ref="${this.activeItem}"]`)[0].classList.remove('active')
                    document.querySelectorAll(`[kg-ref="${newActiveItem.id}"]`)[0].classList.add('active')
                    document.getElementsByClassName('orb-rune')[0].innerHTML =  document.querySelectorAll(`[kg-ref="${newActiveItem.id}"]`)[0].innerHTML
                    this.activeItem = newActiveItem.id;
                }
            }
        },
        engraveSelected(from, to) {
            document.querySelectorAll(`[kg-ref="${from}"]`)[1].classList.remove('selected')
            const iFrom = this.options.indexOf(from)
            const iTo = this.options.indexOf(to)
            const move = (iTo-iFrom)*35.8
            const optionsEl = document.getElementsByClassName('cds-navbar-options')[0]
            const currentTop = parseInt(window.getComputedStyle(optionsEl,null).getPropertyValue("top").split('px'));
            optionsEl.style.top = `${currentTop - move}px`
            document.querySelectorAll(`[kg-ref="${to}"]`)[1].classList.add('selected')
        }
    },
    mounted() {
        document.querySelectorAll('[kg-ref="book"]')[0].classList.add('active')
        window.addEventListener('scroll', this.checkActiveEl)
        const activeRune = document.querySelectorAll(`.sword-rune.active`)[0]
        activeRune.classList.remove('active')
        setTimeout(() => {
            activeRune.classList.add('active')
        }, 2500)
    }

}
</script>

<style>

.cds-enclosure {
    position: absolute;
    top: 43px;
    right: -150px;
    margin: 0 20px;
    height: 35px;
    overflow: hidden;
}

.cds-navbar-options {
    position: relative;
    top: 0;
    display:flex;
    flex-direction:column;
    color: #f2f2f2;
    justify-content: space-around;

    animation-name: navbarOptions;
    animation-duration: 3.5s;
}

.cds-navbar li {
    list-style-type: none;
    padding: 0px 20px;
    text-transform: uppercase;
    color: rgba(77, 77, 77, 0.5);
    font-family: "Acadian Runes";
    letter-spacing: 1.4px;
    font-size: 1.5rem;
    cursor: default;
}

.cds-navbar li.selected {
    color: rgb(82, 162, 253);
    text-shadow: 0.6px 0 6px rgba(31, 129, 241, 0.99),
    0.6px 0 12px rgba(40, 131, 236, 0.99),
    0.6px 0 18px rgba(23, 115, 219, 0.99),
    0.6px 0 24px rgba(30, 116, 214, 0.99);
}

.cds-navbar a:hover {
     text-decoration: none;
}

.cds-navbar .runes button {
    background-color: transparent;
    border: none;
    outline: none;
    top: 13.2px;
    cursor: pointer;
}

.sword-rune.active, button.sword-rune:hover {
  color: rgb(82, 162, 253);
  text-shadow: 0.6px 0 6px rgba(31, 129, 241, 0.99),
  0.6px 0 12px rgba(40, 131, 236, 0.99),
  0.6px 0 18px rgba(23, 115, 219, 0.99),
  0.6px 0 24px rgba(30, 116, 214, 0.99);
}

.runes .sword-rune.active {
  animation-name: activeRune;
  animation-duration: 0.5s;
}

p.sword-rune {
    opacity: 0.6;
}

@keyframes navbarOptions {
    0%{opacity: 0}
    70%{opacity: 0}
    100% {opacity: 1}
}

@keyframes activeRune {
    0%{
        color: rgba(25, 82, 148, 0.3);
        text-shadow: 0.6px 0 0 rgba(25, 82, 148, 0.4),
        -0.6px 0 0 rgba(45, 126, 219, 0.3),
        0 0.6px 0 rgba(17, 57, 102, 0.4),
        0 -0.6px 0 rgba(45, 131, 230, 0.3);
    }
    100%{
        color: rgb(82, 162, 253);
        text-shadow: 0.6px 0 6px rgba(31, 129, 241, 0.99),
        0.6px 0 12px rgba(40, 131, 236, 0.99),
        0.6px 0 18px rgba(23, 115, 219, 0.99),
        0.6px 0 24px rgba(30, 116, 214, 0.99);
    }
}

@media(max-width: 800px) {
    .cds-enclosure {
        right: -120px;
    }
}
</style>
