Vue.component('vTable', {
    template: '\
        <table> \
            <colgroup v-for="(col, index) in currentColumns">\
                <col :width="col.width">\
            </colgroup>\
            <thead>\
                <tr>\
                    <th v-for="(col, index) in currentColumns">\
                        <span>{{col.title}}</span>\
                        <a v-if="col._sortType" :class="{active: col._sortType === `asc`}" @click="handleSortBySortType(index, `asc`)">↑</a>\
                        <a v-if="col._sortType" :class="{active: col._sortType === `desc`}" @click="handleSortBySortType(index, `desc`)">↓</a>\
                    </th>\
                </tr>\
            </thead>\
            <tbody>\
                <tr v-for="row in currentData"> \
                    <td v-for="cell in currentColumns"> \
                        {{row[cell.key]}} \
                    </td> \
                </tr>\
            </tbody>\
        </table>',
    render(h) {
        /* h <==> createElement */
        var ths = []
        var trs = []
        var cols = []

        var _this = this

        this.currentColumns.forEach((col, index) => {
            console.log('col...', col.width)
            cols.push(h('col', {
                attrs: {
                    width: col.width
                }
            }))
            if (col._sortType) {
                /* ths => th的集合 */
                ths.push(h('th', [
                    h('span', col.title + 'hello'),
                    // 升序
                    h('a', {
                        class: {
                            active: col._sortType === 'asc' /* 高亮css类 */
                        },
                        on: {
                            click() {
                                _this.handleSortBySortType(index, 'asc')
                            }
                        }
                    }, '↑'),
                    h('a', {
                        class: {
                            active: col._sortType === 'desc'
                        },
                        on: {
                            click() {
                                _this.handleSortBySortType(index, 'desc')
                            }
                        }
                    }, '↓')
                ]))
            } else {
                ths.push('th', col.title)
            }
        })

        this.currentData.forEach(row => {
            var tds = [] /* tbody下单元格集合 */
            _this.currentColumns.forEach((cell) => {
                tds.push(h('td', row[cell.key]))
            })
            trs.push(h('tr', tds))
        })

        return h('table', [
            h('colgroup', cols),
            h('thead', [    
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    },
    props: {
        columns: {
            type: Array,
            default() {
                return []
            }
        },
        data: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            /* 排序后的columns和data不影响原始数据，增加对应的数据 */
            currentColumns: [],
            currentData: []
        }
    },
    watch: {
        data() {
            this.makeData()
            var sortedColumn = this.currentColumns.filter(col => {
                return col._sortType !== 'normal'
            })

            if (sortedColumn.length > 0) {
                this.handleSortBySortType(sortedColumn[0]._index, sortedColumn[0]._sortType)
            }
        }
    },
    methods: {
        makeColumns() {
            this.currentColumns = this.columns.map((col, index) => {
                // 添加一个字段标识当前列排序的状态，后续使用
                col._sortType = 'normal'
                // 添加一个字段标识当前列在数组中的索引，后续使用
                col._index = index
                return col
            })
        },
        makeData() {
            this.currentData = this.data.map((row, index) => {
                // table每一行的数据
                // 添加一个字段标识当前列在数组中的索引，后续使用
                row._index = index
                return row
            })
        },
        handleSortBySortType(index, sortType = 'asc') {
            console.log('handleSortBySortType')
            var key = this.currentColumns[index].key
            this.currentColumns.forEach(col => {
                col._sortType = 'normal'
            })
            this.currentColumns[index]._sortType = sortType

            this.currentData.sort((a, b) => {
                if (sortType === 'asc') {
                    return a[key] > b[key] ? 1 : -1 /* 升序排序 */
                } else if (sortType === 'desc') {
                    return a[key] < b[key] ? 1 : -1 /* 降序排序 */
                }
            })
        },
    },
    mounted() {
        // v-table初始化时调用
        this.makeColumns()
        this.makeData()
    }
})