<template>
    <div>
        <h1>请认真审核每件商品！</h1>


    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>待审核商品</template>

                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px;background-color: orange">
                <el-dropdown>
                    <i style="margin-right: 15px"></i>
                    <el-button @click="exit()">登出
                    </el-button>
                </el-dropdown>
                <el-button @click="showusername()">{{msg.username}}</el-button>
            </el-header>

            <!-- <el-main>
                <el-table :data="commodities">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column prop="option" label="操作">
                        <el-button type="info" >点击通过</el-button>
                    </el-table-column>
                </el-table>
            </el-main> -->
            <!-- 商品浏览主页 -->
            <el-main>
                <el-table :data="commodities">
                    <!-- <el-table-column prop="id" label="日期" width="140">
                    </el-table-column> -->
                    <el-table-column prop="comName" label="商品名称" width="120">
                    </el-table-column>
                    <el-table-column prop="comDescribe" label="交易方式" width="120">
                    </el-table-column>
                    <el-table-column prop="comPrice" label="商品价格">
                    </el-table-column>
                    <el-table-column prop="comReleaseTime" label="发布时间">
                    </el-table-column>
                    <el-table-column prop="comStatus" label="商品状态">
                    </el-table-column>
                    <el-table-column label="审核状态" :prop="comID">
                        <template slot-scope="scope">
                            <el-button type="success" @click="changestatus(scope.row)">通过</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
    </div>
</template>
<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {

        //保存用户信息
        state: {
            user: {},
            token: false
        },

        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };

            return {

                tableData: Array(20).fill(item),
                msg: this.$route.query.data,

                //用户渲染商品列表的数据
                commodities: [{
                    id: "",
                    name: "",
                    describe: "",
                    price: "",
                    releasetime: "",
                    status: ""

                }],


            }
        },
        created() {
            //alert(this.msg)
            alert("欢迎您:" + this.msg.username)
            console.log(this.msg)
            var _this = this
            axios.get('http://localhost:9090/unhandled/findall').then(function (response) {
                console.log(response)
                _this.commodities = response.data
                // console.log(response)
            })
        },
        methods: {
            exit() {
                this.$router.push({
                    path: "/"
                })
            },

            showusername(){
                alert("欢迎您:" + this.msg.username)

            },
            changestatus(commodity) {
                console.log(commodity)
                var _data = {};
                // var Husername = this.username;
                // //var Hpassword = this.password;
                _data.comID = commodity.comID

                //sendData.password = this.loginForm.password
                var sendjson = JSON.stringify(_data)
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/unhandled/changestatus',
                    crossDomain: true,
                    //以map形式发送
                    data: sendjson,

                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {


                })
                alert("修改成功，即将返回登录页面1")
                this.$router.push({
                    path: "/"
                })            }
        }
    };
</script>