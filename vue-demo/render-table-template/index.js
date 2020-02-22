var app = new Vue({
    el: '#app',
    data: {
        columns: [
            {
                title: '姓名',
                key: 'name',
                width: '50px'
            },
            {
                title: '年龄',
                key: 'age',
                sortable: true,  /* 可选 */
            },
        ],
        data: [
            {
                name: '王成阳',
                age: 19,
                birthday: '2000-06-25',
                address: '北京市朝阳区'
            },
            {
                name: '麦克风',
                age: 20,
                birthday: '2002-09-01',
                address: '北京市朝阳二区'
            }
        ]
    },
    methods: {
        handleAddData() {
            this.data.push({
                name: '小天',
                age: '25',
                birthday:'1994-08-30',
                address: '哈尔滨潍坊市'
            })
        }
    }
})