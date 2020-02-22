/* 根实例,根作用域 */
var app = new Vue({
    el: '#app',
    data: {
        value: 5
    },
    methods: {
        handleClick() {
            console.log('now value in app', this.value++)
        }
    }
})