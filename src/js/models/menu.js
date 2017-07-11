new Vue({
    el: '.menu',
    data () {
        return {
            isScrolled: false
        }
    },
    methods: {
        onScroll () {
            this.isScrolled = window.scrollY > 100;
            console.log(this.isScrolled);
        }
    },
    created () {
        window.addEventListener('scroll', this.onScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.onScroll);
    }
});
