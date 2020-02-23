<template>
    <div>
        <v-title title="Vue组件化-webpack"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <p>
            <img src="./images/img.jpg" alt="动漫人物">
        </p>
    </div>
</template>
<script>
import vTitle from './src/title.vue'
import vButton from './src/button.vue'

export default {
    components: {
        vTitle,
        vButton
    },
    data() {
        return {
            name: 'huangqian'
        }
    },
    methods: {
        handleClick(e) {
            alert(e)
        }
    }
}
</script>
<style scoped>
    div {
        color: #6f0;
        font-size: 30px;
    }
    image {
        width: 200px;
    }
</style>