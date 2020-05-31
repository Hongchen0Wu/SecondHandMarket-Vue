<template>
    <div>
        <h1>快来加入我们的大家庭吧</h1>
        <h3>让你的闲置物品流动起来</h3>
        <el-card class="login-form-layout">
            <el-form autocomplete="on" :model="registerForm" ref="registerForm" label-position="left">
                <div style="text-align: center">
                    <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
                </div>
                <h2 class="login-title color-main">注册新账号</h2>
                <el-form-item prop="telephonenum">
                    <el-input name="telephonenum" v-model="registerForm.telephonenum" autocomplete="on"
                              placeholder="请输入邮箱地址">
                        <span slot="prefix">
                            <svg-icon icon-class="text" class="color-main"></svg-icon>
                        </span>
                        <span slot="suffix">
                            <svg-icon icon-class="eye" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input name="username" type="text" v-model="registerForm.username" autocomplete="on"
                              placeholder="请输入用户名">
                        <span slot="prefix">
                            <svg-icon icon-class="user" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" v-model="registerForm.password" autocomplete="on" placeholder="请输入密码"
                              type="password">
                        <span slot="prefix">
                            <svg-icon icon-class="password" class="color-main"></svg-icon>
                        </span>
                        <span slot="suffix">
                            <svg-icon icon-class="eye" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                    <el-input name="password" v-model="registerForm.password" autocomplete="on" placeholder="确认密码"
                              type="password">
                        <span slot="prefix">
                            <svg-icon icon-class="password" class="color-main"></svg-icon>
                        </span>
                        <span slot="suffix">
                            <svg-icon icon-class="eye" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                </el-form-item>

                <el-form-item style="margin-bottom: 60px">
                    <el-button style="width: 100%" type="danger" round :loading="loading"
                               @click.native.prevent="handleLogin">注册
                    </el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                registerForm: {
                    username: "",
                    password: "",
                    telephonenum: ""
                },
                loading: false,
                pwdType: "password",
            };
        },
        methods: {

            //判断手机号是否输入正确
            isTruePhone() {

                if ((/^1[123456789]\d{9}$/.test(this.registerForm.telephonenum))) {

                    return true;
                } else {
                    return false
                }
            },

            //点击提交表单
            handleLogin() {

                //判空
                if (this.registerForm.username == "" || this.registerForm.password == "" || this.registerForm
                    .telephonenum == "") {
                    alert("输入不能为空")
                } else {

                    //发送http请求创建用户

                    //发送的json数据装配
                    var sendData = {};

                    // var Husername = this.username;
                    // //var Hpassword = this.password;
                    sendData.username = this.registerForm.username
                    sendData.password = this.registerForm.password
                    sendData.emailAddress = this.registerForm.telephonenum
                    // sendData.names=Husername

                    //序列化json
                    var sendJson = JSON.stringify(sendData);

                    axios({
                        //发送http请求
                        method: 'post',
                        url: 'http://localhost:9090/user/register',
                        crossDomain: true,
                        data: sendJson,
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(response => {
                        //对返回数据进行处理
                        console.log(response)
                        let res_data = response.data
                        console.log(res_data)
                        if (res_data.id == -1) {
                            alert("用户名已被占用")
                        } else {
                            alert("注册成功，您的用户id为："+ res_data.id + '\n' + "即将跳转回登录界面，请您重新登录！")

                            this.$router.push({
                                path: "/",
                                query: {
                                    data: res_data
                                }
                            })
                        }

                    })

                }
            },

        }
    }
</script>

<style scoped>
    .login-form-layout {
        position: absolute;
        left: 0;
        right: 0;
        width: 360px;
        margin: 140px auto;
        border-top: 10px solid #409eff;
    }

    .login-title {
        text-align: center;
    }

    .login-center-layout {
        background: #409eff;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        margin-top: 200px;
    }
</style>