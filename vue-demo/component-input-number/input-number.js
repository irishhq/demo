function isValueNumber (value) {
    var reg = /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/
    return reg.test(value + '')
}
Vue.component('input-number', {
    template: '\
        <div class="input-number"> \
            <input \
                :value="currentValue" \
                type="text" \
                @change="handleChange" \
                @keydown="handleKeydown" \
                > \
            <button \
                @click="handleDown" \
                @keyup.down="handleDown" \
                :disabled="currentValue <= min">-</button> \
            <button \
                @click="handleUp" \
                @keyup.up="handleUp" \
                :disabled="currentValue >= max">+</button> \
            <input \
                step="1" \
                max="10" \
                min="0" \
                type="range" \
                v-model="range" \
                > \
        </div>',
    data() {
        return {
            currentValue: this.value, /* issue1解决方式 */
            range: 8
        }
    },
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    watch: {
        range(val) {
            console.log('range = ', val)
        },
        currentValue(val) {
            this.$emit('input', val) /* 是在使用v-model时改变value的 */
        },
        value: function(val) { /* 除了初始，父组件value值改变(propvalue值)变动，子组件curretValue即变动 */
            this.updateValue(val)
        }
    },
    mounted() {
        // this.updateValue(this.values)
        console.log('value in input-number当父组件中的值变化时不是实时更新', this.value)
        /* this.value += this.value
        console.log(this.value) */ /* issue1 */
    },
    methods: {
        updateValue(val) { /* value值过滤 */
            if (val > this.max) val = this.max
            else if (val < this.min) val = this.min
            else this.currentValue = val
        },
        handleDown() {
            if (this.currentValue <= this.min) return 
            this.currentValue -= Number(this.range)
        },
        handleUp() {
            if (this.currentValue >= this.max) return 
            this.currentValue += Number(this.range)
        },
        handleChange(event) {
            var val = event.target.value.trim()
            var max = this.max
            var min = this.min

            if (isValueNumber(val)) {
                val = Number(val)
                this.currentValue = val

                if (val > max) val = this.max
                else if (val < min) val = this.min

                this.currentValue = val
            }
            else {
                event.target.value = this.currentValue
            }
        },
        handleKeydown(event) {
            if (event.keyCode == 38) {
                this.handleUp()
            } else if (event.keyCode == 40) {
                this.handleDown()
            }
        }
    }
})