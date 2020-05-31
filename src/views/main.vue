<template>
    <div>
        <h1>一切就在校园二手交易平台！</h1>
        <h1>发布你的闲置物品，或者购买你需要的物品</h1>

    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>商品一览</template>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>功能选择</template>
                    <el-menu-item-group>

                        <el-menu-item index="2-1" @click="release_com">发布商品</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>

                        <el-menu-item index="2-2" @click="view_my_commodity">发布历史</el-menu-item>

                        <el-menu-item index="2-2" @click="view_my_bought">历史订单</el-menu-item>

                    </el-menu-item-group>

                </el-submenu>
            </el-menu>
        </el-aside>

        <!-- 查看我的购买对话框 -->
        <el-dialog title="历史订单" :visible.sync="dialogMyBoughtVisible">
            <el-table :data="user_deal_list">
                <el-table-column property="c_name" label="商品名称"></el-table-column>
                <el-table-column property="c_prive" label="商品价格"></el-table-column>

                <el-table-column property="d_location" label="收货地址"></el-table-column>
                <el-table-column property="d_time" label="购买时间"></el-table-column>
                <el-table-column property="d_tele" label="买家电话"></el-table-column>
                <!-- <el-table-column property="c_prive" label="商品价格"></el-table-column> -->
                <!-- <el-table-column property="c_name" label="商品名称"></el-table-column> -->
                <el-table-column property="c_describe" label="交易方式"></el-table-column>
                <el-table-column property="u_name" label="卖家名称"></el-table-column>
            </el-table>
        </el-dialog>


        <!-- 查看我的发布商品对话框 -->
        <el-dialog title="发布历史" :visible.sync="dialogMyCommodityVisible">
            <el-table :data="user_commodities_list">
                <el-table-column property="comName" label="商品名称" width="120"></el-table-column>
                <el-table-column property="comPrice" label="商品价格" width="120"></el-table-column>
                <el-table-column property="comReleaseTime" label="发布时间"></el-table-column>
                <el-table-column label="订单状态">
                    <template slot-scope="scope">
                        <!-- 传入商品id -->
                        <el-button type="success" @click="check_users_com_status(scope.row.comID)">
                            {{scope.row.comStatus | jugementStatus}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 相关订单信息对话框 -->
        <el-dialog title="订单详情" :visible.sync="dialogDealInfoVisible">
            <el-table :data="dealinfo">
                <el-table-column property="dealLocation" label="收货地址" width="220"></el-table-column>
                <el-table-column property="username" label="买家姓名" width="220"></el-table-column>
                <el-table-column property="dealBuyerTelephone" label="买家电话" width="220"></el-table-column>
                <el-table-column property="dealChangeTime" label="购买时间" width="220"></el-table-column>
            </el-table>
        </el-dialog>

        <!-- 添加商品对话框 -->
        <el-dialog title="发布商品" :visible.sync="dialogFormVisible">
            <el-form :model="commodityForm" label-width="100px" class="demo-ruleForm" :rules="rules"
                     ref="commodityForm">
                <el-form-item label="商品名称" prop="comName">
                    <el-input v-model="commodityForm.comName"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="comPrice" type="number">
                    <el-input v-model.number="commodityForm.comPrice"></el-input>
                </el-form-item>
                <el-form-item label="交易方式" prop="comDescribe">
                    <el-input v-model="commodityForm.comDescribe"></el-input>
                </el-form-item>

                <el-form-item label="发布时间" prop="comReleaseTime">
                    <div class="block">
                        <el-date-picker v-model="commodityForm.comReleaseTime" type="datetime" placeholder="选择日期时间"
                                        align="right" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="submitForm('commodityForm')">确认发布</el-button>
                    <!-- <el-button @click="resetForm('commodityForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 下订单对话框 -->
        <!-- 需要输入正确交易时间和地点 -->
        <el-dialog title="填写订单信息" :visible.sync="changeFromVisible">
            <el-form :model="dealForm" label-width="100px" class="demo-ruleForm" :rules="dealRules" ref="dealForm">
                <el-form-item label="买家电话">
                    <el-input v-model.number="dealForm.dealBuyerTelephone" prop="dealBuyerTelephone" type="number">
                    </el-input>
                </el-form-item>
                <el-form-item label="收货地址" prop="dealLocation">
                    <el-input v-model="dealForm.dealLocation"></el-input>
                </el-form-item>
                <el-form-item label="购买时间" prop="dealChangeTime">
                    <div class="block">
                        <el-date-picker v-model="dealForm.dealChangeTime" type="datetime" placeholder="选择日期时间"
                                        align="right" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="buyCommodity('dealForm')">创建订单</el-button>
                    <!-- <el-button @click="resetForm('dealForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-container>
            <el-header style="text-align: right; font-size: 12px; background-color: orange">

                <el-dropdown>
                    <i style="margin-right: 15px"></i>
                    <el-button @click="exit()">登出
                    </el-button>
                </el-dropdown>
                <el-button @click="showusername()">{{msg.username}}</el-button>
            </el-header>

            <!-- 商品浏览主页 -->
            <el-main>
                <el-table :data="commodities">
                    <el-table-column prop="comName" label="商品名称" width="240">
                    </el-table-column>
                    <el-table-column prop="comDescribe" label="商品描述" width="240">
                    </el-table-column>
                    <el-table-column prop="comPrice" label="商品价格">
                    </el-table-column>
                    <el-table-column prop="comReleaseTime" label="发布时间">
                    </el-table-column>
                    <el-table-column prop="comStatus" label="商品状态">
                    </el-table-column>
                    <el-table-column label="购买操作">
                        <template slot-scope="scope">
                            <el-button type="success" @click="buyCommodityDiaOpen(scope.row.comID)">购买</el-button>
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
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {

                //对话框可视数据
                //添加商品对话框是否可见
                dialogFormVisible: false,
                //下订单对话框是否可见
                changeFromVisible: false,

                //用户发布商品对话框是否可见
                dialogMyCommodityVisible: false,

                //评价对话框是否可见
                dialogEvalFormVisible: false,

                //用户已经购买商品对话框是哦夫可见
                dialogMyBoughtVisible: false,

                //用户购买历史对话框
                dialogHistoryBoughtTableVisible: false,

                //订单相关信息对话框是否可见
                dialogDealInfoVisible: false,

                tableData: Array(20).fill(item),

                //路由传递数据
                msg: this.$route.query.data,

                //购买订单时选中商品id
                onClickCommodity: '',

                //做出评价的时候选中的商品id
                onClickEvaluationComID: '',

                //做出评价的时候选中商品对应订单id
                onClickDealID: '',

                item: {
                    date: '2016-05-02',
                    name: '王虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                // books: [{
                //     id: 12,
                //     name: "fadfa",
                //     price: 12.32
                // }, ],

                //商品列表
                //渲染table用
                //所有状态为released的商品
                commodities: [{
                    id: "",
                    name: "",
                    describe: "",
                    price: "",
                    releasetime: "",
                    status: ""

                }],

                //订单详细信息
                dealinfo: [{}],

                //用户查询的商品列表，跟用户相关
                user_commodities_list: [{
                    comID: "",
                    comPrice: "",
                    comName: "",
                    comDescribe: "",
                    comReleaseTime: "",
                    comStatus: "",
                    user: ""

                }],

                //用户订单查看列表
                user_deal_list: [{
                    d_location: "",
                    d_time: "",
                    d_tele: "",
                    c_prive: "",
                    c_name: "",
                    c_describe: "",
                    u_name: "",
                    c_status: "",
                    c_id: "",
                    d_id: "",
                    // e_id
                }],

                //用户评价查看表
                user_eval_list: [{
                    e_comment: "",
                    e_starts: null,
                    c_name: "",
                    c_price: "",
                    d_location: "",
                    d_time: "",
                    u_name: "",
                }],


                user_trade_com_info: {

                    username: "",
                    dealLocation: "",
                    dealChangeTime: "",
                    dealBuyerTelephone: ""

                },


                //创建商品对话框的检验规则
                rules: {
                    comName: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    comDescribe: [{
                        required: true,
                        message: '请输入商品描述信息，以便交易更快成功',
                        trigger: 'blur'
                    },
                        {
                            min: 1,
                            max: 20,
                            message: '长度在 1 到 20 个字符',
                            trigger: 'blur'
                        }
                    ],
                    comPrice: [{
                        required: true,
                        message: '价格不能为空'
                    },
                        {
                            type: 'number',
                            message: '价格必须为数字值'
                        }
                    ],
                    comReleaseTime: [{
                        // type: 'date',
                        required: true,
                        message: '请选择发布时间',
                        trigger: 'change'
                    }],
                },

                //交易对话框规则
                dealRules: {
                    dealBuyerTelephone: [{
                        required: true,
                        message: '手机号码不能为空'
                    },
                        {
                            type: 'number',
                            message: '手机号码必须为数字值'
                        },


                    ],
                    dealChangeTime: [{
                        // type: 'date',
                        required: true,
                        message: '请选择交易时间',
                        trigger: 'change'
                    }],
                    dealLocation: [{
                        required: true,
                        message: '请约定交易地点',
                        trigger: 'blur'
                    },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],

                },

                //评论订单审核规则
                evalRule: {
                    evalComment: [{
                        required: true,
                        message: "请输入正确的评价",
                        trigger: 'blur'
                    },
                        {
                            min: 1,
                            max: 30,
                            message: '长度在 1 到 30 个字符',
                            trigger: 'blur'
                        }
                    ],
                    evalStars: [{
                        required: true,
                        message: "请打分",
                        trigger: 'blur'
                    }]
                },

                //添加商品表单
                commodityForm: {
                    comName: "",
                    comDescribe: '',
                    comPrice: "",
                    comReleaseTime: '',

                },

                evalForm: {
                    evalComment: "",
                    evalStars: "",
                },

                //订单元素表单
                dealForm: {
                    //地点
                    dealLocation: "",
                    //交易时间
                    dealChangeTime: "",
                    //联系人电话
                    dealBuyerTelephone: ""

                },

                //时间选择器
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                value3: ''
                //
            }
        },
        created() {
            alert("欢迎您:" + this.msg.username)
            console.log(this.msg)
            var _this = this
            axios.get('http://localhost:9090/commodity/findallcommodity').then(function (response) {
                console.log(response)
                _this.commodities = response.data
                // console.log(response)
            })
        },
        methods: {
            changeAnthor() {
                alert("hello")
                this.tableData = null
            },
            release_com() {
                // alert("ok")
                this.dialogFormVisible = true
            },

            exit() {
                this.$router.push({
                    path: "/"
                })
            },

            showusername(){
                alert("欢迎您:" + this.msg.username)

            },



            //打开交易商品对话框
            buyCommodityDiaOpen(id) {


                this.onClickCommodity = id;
                console.log("选中id信息")
                console.log(this.onClickCommodity)

                this.changeFromVisible = true
            },

            //判断提交表单是否为空,vaildate不会用
            isFormNull() {
                if (this.commodityForm.price == null || this.commodityForm.name == null || this.commodityForm
                    .describe == null || this.commodityForm.comReleaseTime == null) {
                    return true
                } else {
                    return false
                }
            },

            // //用户查看自己买了什么功能
            view_my_bought() {
                //跨域请求
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/user/getdealbyuser',
                    crossDomain: true,
                    data: JSON.stringify(this.msg),


                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    //数据放入列表
                    this.user_deal_list = response.data
                })
                this.dialogMyBoughtVisible = true
            },

            //用户查看自己已发布商品的功能，打开嵌套表格的对话框
            view_my_commodity() {
                //跨域请求
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/user/getcombyuser',
                    crossDomain: true,
                    data: JSON.stringify(this.msg),

                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    //数据放入列表
                    this.user_commodities_list = response.data
                })
                this.dialogMyCommodityVisible = true;
            },

            //根据商品id返回订单信息
            check_users_com_status(id) {
                var sendData = {}
                sendData.comID = id
                var self = this
                //跨域请求
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/commodity/finddeal',
                    crossDomain: true,
                    data: JSON.stringify(sendData)

                    ,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    self.user_trade_com_info.dealLocation = response.data.dealLocation
                    self.user_trade_com_info.dealBuyerTelephone = response.data.dealBuyerTelephone
                    self.user_trade_com_info.dealChangeTime = response.data.dealChangeTime
                    self.user_trade_com_info.username = response.data.userEntity.username

                    console.log(this.objToArr(this.user_trade_com_info))
                    //this.dealinfo = this.objToArr(this.user_trade_com_info)
                    this.dealinfo.push(this.user_trade_com_info)
                    self.dialogDealInfoVisible = true

                })
            },

            //购买商品方法
            //传参失效待解决，换了中方法
            buyCommodity(form) {
                //console.log(this.dealForm)
                //console.log(dealform)
                this.$refs[form].validate((valid) => {
                    if (valid) { //验证通过

                        let com = {}
                        com.comID = this.onClickCommodity


                        //此处以后会更改，发送多个json浪费资源，用requestparam代替
                        var sendDeal = JSON.stringify(this.dealForm)
                        var sendUser = JSON.stringify(this.msg)
                        var sendCom = JSON.stringify(com)

                        //跨域请求
                        axios({
                            //发送http请求
                            method: 'post',
                            url: 'http://localhost:9090/deal/makedeal',
                            crossDomain: true,
                            //以map形式发送
                            //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
                            data: {
                                "com": sendCom,
                                "user": sendUser,
                                "deal": sendDeal
                            }

                            ,
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(response => {

                            var length = Object.keys(response.data)
                            if (length == 0) {
                                alert("订单失效")
                            } else {
                                alert("订单创建成功，请在我的订单中查看订单状态！")
                                this.$router.push({
                                    path: "/",
                                })
                            }
                        })

                    } else("请注意对话提示框")
                })
            },

            //提交创建

            submitForm(formName) {
                console.log(this.commodityForm)

                //验证通过后发送http请求
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //验证通过
                        alert("您的商品已经发送至管理员，请您耐心等待审核通过！");
                        //序列化json
                        var sendJson = JSON.stringify(this.commodityForm);
                        var senduser = JSON.stringify(this.msg)
                        this.$router.push({
                            path: "/"
                        })

                        axios({
                            //发送http请求
                            method: 'post',
                            url: 'http://localhost:9090/commodity/addcommodity',
                            crossDomain: true,
                            //以map形式发送
                            //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
                            data: {
                                "com": sendJson,
                                "user": senduser
                            }
                            ,
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }

                        }).then(response => {
                        })
                    } else {
                        alert("请输入正确的信息！")
                    }

                });

            },

            //打开评价对话框
            openEvalDialog(c_id, d_id) {
                alert(d_id)
                this.dialogEvalFormVisible = true
                this.onClickEvaluationComID = c_id
                this.onClickDealID = d_id

            },

            //提交评价
            evaling() {
                var comobj = {}
                comobj.comID = this.onClickEvaluationComID

                var dealobj = {}
                dealobj.dealID = this.onClickDealID
                //alert(this.evalForm.evalStars)
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/eval/makeeval',
                    crossDomain: true,
                    //以map形式发送
                    //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
                    data: {
                        "eval": JSON.stringify(this.evalForm),
                        "com": JSON.stringify(comobj),
                        "user": JSON.stringify(this.msg),
                        "deal": JSON.stringify(dealobj)
                    },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {

                })
            },

            objToArr(obj) {
                var arr = []
                for (let i in obj) {
                    let o = {};
                    o[i] = obj[i];
                    arr.push(o)

                }
                return arr;
            },

            //查看购买记录
            view_my_history_bought() {
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/user/getevalbyuser',
                    crossDomain: true,
                    //以map形式发送
                    //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
                    data: JSON.stringify(this.msg),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    this.user_eval_list = response.data
                })
                this.dialogHistoryBoughtTableVisible = true
            },

            //重置表格
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        filters: {
            //根据商品状态返回信息
            jugementStatus: function (status) {
                if (status == 'released') {
                    return '尚未被购买'
                }
                if (status == 'traded') {
                    return '订单交易中，查看详情'
                }
            }
        }


    };
</script>