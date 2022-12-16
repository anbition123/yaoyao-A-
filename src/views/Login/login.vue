<template>
    <div class="login">
        <section class="login-container">
            <h1 class="title">舞者登录</h1>
            <el-form :model="loginFrom1" :rules="loginRules" ref="loginFrom1">
                <el-form-item prop="account">
                    <el-input class="el-input_username"
                    v-model="loginFrom1.username"
                    prefix-icon="icon iconfont icon-denglu"
                    auto-complete="off"
                    ref="input_username"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="el-input_password" 
                    v-model="loginFrom1.password"
                    prefix-icon="icon iconfont icon-mima"
                    auto-complete="off"
                    ref="input_password"
                    :type="isOpen ?'text' :'password'"
                    :suffix-icon="isOpen ?'iconfont icon-changyongicon-' :'iconfont icon-biyan'"
                    @click.native="changeType($event)"                   
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button1" @click="handerSubmitFrom">登录</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
//引入接口层ajax函数
import {checkLogin} from '@/api/account';
import qs from 'qs'


export default {
    name: 'YaoyaoALogin',
    data() {
        return {
            loginFrom1:{
                username:"",
                password:"",
            },
            isOpen:false,
            // 定义规则
            loginRules:{
                // 账号
                username:[
                    {required:true,message:'请输入账号',trigger:"blur"},
                    {min:5,max:16,message:'用户账号在5-16位数字之间',trigger:"blur"}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:"blur"},
                    {min:5,max:16,message:'用户密码在6-16位数字之间',trigger:"blur"}
                ]
            }  
        };
    },

    mounted() {
        
    },
    methods: {
        changeType(e){
        if(e.target.className.includes('iconfont icon-biyan')||e.target.className.includes('icon-changyongicon-')){
            this.isOpen = !this.isOpen
            }
        },
        handerSubmitFrom(){
            //  this.$refs[loginFrom1][0]别写错
            // const form = this.$refs.loginFrom1 as ElForm
            
            const parmas = {
                username:this.loginFrom1.username || this.$refs.input_username.value,
                password:this.loginFrom1.password || this.$refs.input_password.value
            } 
            console.log(parmas,'parmas')
            this.$refs.loginFrom1.validate(async valid =>{
                if(valid){
                    // 发送登录数据
                    // console.log(checkLogin,this.loginFrom1.username,'checkLogin')
                    const  result  = await checkLogin(parmas).then(res=>{
                        console.log(res,'res333333')
                        // return res
                    });                   
                    console.log(result,'3333')
                    // if(data.status == 0){
                    //     window.localStorage.setItem("t_k",token);
                    //     // window.localStorage.setItem("role",role);
                    //     // console.log(status)
                    // }else{
                    //     return false;
                    // }
                    // console.log(3333)
                }
            })
    //         return req({
    //     url:'/api/users/login',
    //     method:'post',
    //     data:parmas
    // })
        }
    },
};
</script>

<style lang="less" scoped>
    .el-button1{
            width: 100%;
        }
    .el-input_username .el-input{
            background: chartreuse;
        }
    .el-input_password .el-input{
        background: chartreuse;
    }
.login{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../../../public/img/login.jpg') no-repeat center;
    .login-container{
        width: 340px;
        // 标题哦
        .title{
        color:#000;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
        }
        // 表单
        //  .el-form{
        //    .el-from-item{
        //       ::v-deep.el-input_inner{
        //             background: chartreuse;
        //         }
        //         .el-button{
        //         width: 100%;
        //     }
        //     }
        
        // }
        

    }
}
</style>