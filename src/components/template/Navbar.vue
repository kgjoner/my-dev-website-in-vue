<template>
    <ul class="navbar">
        <li v-show="windowWidth > 740 || activeItem == 'cover'" kg-ref="cover" @click="e => scrollIt(e, scrollItems[0], headerHeight)">Início</li>
        <li v-show="windowWidth > 740 || activeItem == 'books'" kg-ref="books" @click="e => scrollIt(e, scrollItems[1], (headerHeight-50))">Livros</li>
        <li v-show="windowWidth > 740 || activeItem == 'about'" kg-ref="about" @click="e => scrollIt(e, scrollItems[2], (headerHeight-20))">Sobre</li>
        <li v-show="windowWidth > 740 || activeItem == 'contact'" kg-ref="contact" @click="e => scrollIt(e, scrollItems[3], (headerHeight+20))">Contato</li>
        <button class="dropdown-button" v-show="windowWidth <= 740" @click="toggleDropdown"><i class="fa fa-bars"></i></button>
        <div v-show="showDropdown && windowWidth <= 740" class="dropdown">
            <li @click="e => scrollIt(e, scrollItems[0], headerHeight)">Início</li>
            <li @click="e => scrollIt(e, scrollItems[1], (headerHeight-50))">Livros</li>
            <li @click="e => scrollIt(e, scrollItems[2], (headerHeight-20))">Sobre</li>
            <li @click="e => scrollIt(e, scrollItems[3], (headerHeight+20))">Contato</li>
        </div>
    </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
    nome: 'Navbar',
    data: function() {
        return {
            headerHeight: 90,
            activeItem: 'cover',
            scrollOn: true,
            topDistances: [],
            showDropdown: false,
        }
    },
    computed: {
        scrollItems(){
            return [ 
                document.getElementById('cover'),
                document.getElementById('books'),
                document.getElementById('about'),
                document.getElementById('contact')
            ]
        },
        ...mapState(['windowWidth'])
    },
    methods: {
        scrollIt(e, destination, offset = 0, duration = 900) {
            e.preventDefault()

            this.scrollOn = false
            document.querySelectorAll(`[kg-ref="${this.activeItem}"]`)[0].classList.remove('active')
            document.querySelectorAll(`[kg-ref="${destination.id}"]`)[0].classList.add('active')
            this.activeItem = destination.id;

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
                        vueComp.scrollOn = true;
                    }
                } else {
                    window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
                    if((Math.ceil(window.scrollY) > (destinationOffsetToScroll - offset)) &&
                        window.scrollY !== 0) {
                        window.requestAnimationFrame(scroll);
                    } else {
                        vueComp.scrollOn = true;
                    }
                }
            }
            window.requestAnimationFrame(scroll)
        },
        checkActiveEl() {
            if(this.scrollOn){
                const newActiveItem = this.scrollItems.reduce((newOne, item) => {
                    if(item.offsetTop <= (window.scrollY + this.headerHeight + 51)) {
                        if(item.offsetTop > newOne.offsetTop) {
                            return item
                        }
                    }
                    return newOne
                })
                if(newActiveItem.id !== this.activeItem) {
                    document.querySelectorAll(`[kg-ref="${this.activeItem}"]`)[0].classList.remove('active')
                    document.querySelectorAll(`[kg-ref="${newActiveItem.id}"]`)[0].classList.add('active')
                    this.activeItem = newActiveItem.id;
                }
            }
            document.querySelectorAll('.block-enclousure').forEach((el, index) => {
                const currentDisplay = window.getComputedStyle(el,null).getPropertyValue("display")
                if(this.topDistances[index] <= (window.scrollY + this.headerHeight + window.innerHeight*0.8) && currentDisplay == "none") {
                    el.style.display = "block";
                    document.querySelectorAll('.book-card img ')[index].style.display = "block";
                }
            })
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        }
    },
    mounted() {
        document.querySelectorAll('[kg-ref="cover"]')[0].classList.add('active')
        const headerEl = document.getElementsByClassName('header')[0]
        this.headerHeight = parseInt(window.getComputedStyle(headerEl,null).getPropertyValue("height").split('px'))
        document.querySelectorAll('.block-enclousure').forEach((el, index) => {
                el.style.opacity = "0";
                el.style.display = "block";
                let topDistance = 0;
                let element = el;
                while(element) {
                    topDistance += (element.offsetTop - element.scrollTop + element.clientTop);
                    element = element.offsetParent;
                }
                el.style.display = "none";
                el.style.opacity = "1";
                this.topDistances[index] = topDistance                
        })
        window.addEventListener('scroll', this.checkActiveEl)
    }

}
</script>

<style>

.navbar {
    display:flex;
    color: #f2f2f2;
    justify-content: space-around;
    margin: 0 20px;
}

.navbar li {
    list-style-type: none;
    padding: 0px 20px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    font-family: "Philosopher";
    letter-spacing: 1px;
    font-size: 0.9rem;
}

.navbar li:hover {
    border-bottom: 1px solid #037aa5;
}

.navbar li.active {
    border-bottom: 1px solid #037aa5;
    color: rgba(255,255,255,1);
}

.navbar a:hover {
     text-decoration: none;
}

.navbar .dropdown-button {
    background-color: rgb(41, 41, 41);
    border: none;
    border-radius: 5px;
    height: 40px;
    width: 40px;
    margin-left: 20px;
    color: #fcfcfc;
    outline: none;
    cursor: pointer;
}

.navbar .dropdown-button:hover {
    background-color: rgb(60,60,60)
}

.navbar .dropdown {
    padding: 20px 100px;
    background-color: #dad8d8;
    position: absolute;
    top: 73px;
    right: 0;
    width: 100vw;
}

.navbar .dropdown li {
    margin-bottom: 10px;
    color: #3f3f3f;
}
</style>
