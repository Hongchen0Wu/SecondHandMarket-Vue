<!--  -->
<template>
    <div class="book">
        哈哈哈哈
        <el-button type="primary">主要按钮</el-button>
        <table>
            <tr>
                <td>编号</td>
                <td>书名</td>
                <td>价钱</td>
            </tr>
            <tr v-for="(item, index) in books" :key="index">
                <td> {{item.id}}</td>
                <td> {{item.name}}</td>
                <td> {{item.price}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                books: [
                    {
                        id:12,
                        name : "fadfa",
                        price:12.32
                    },
                ]
            };
        },

        components: {},

        computed: {},

        created(){
          var _this = this
          axios.get('http://localhost:9090/book/findallbook').then(function (response) {
            console.log(response)
            _this.books=response.data
            // console.log(response)
          })
        },

        mounted: {
        },

        methods: {}
    }
</script>
<style lang='scss' scoped>
</style>