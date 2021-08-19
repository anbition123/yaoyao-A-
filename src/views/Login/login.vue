<template>
    <div class="login">
        <section class="login-container">
            <h1 class="title">舞者登录</h1>
            <el-form :model="loginFrom" :rules="loginRules">
                <el-form-item prop="account">
                    <el-input class=".el-input_inner1"
                    v-model="loginFrom.account"
                    prefix-icon="icon iconfont icon-denglu"
                    auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class=".el-input_inner1" 
                    v-model="loginFrom.password"
                    prefix-icon="icon iconfont icon-mima"
                    auto-complete="off"
                    :type="isOpen ?'text' :'password'"
                    :suffix-icon="isOpen ?'iconfont icon-changyongicon-' :'iconfont icon-biyan'"
                    @click.native="changeType($event)"                   
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-button1">登录</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
    name: 'YaoyaoALogin',
    data() {
        return {
            loginFrom:{
                account:"",
                password:"",
            },
            isOpen:false,
            // 定义规则
            loginRules:{
                // 账号
                account:[
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
        }
    },
};
</script>

<style lang="less" scoped>
    .el-button1{
            width: 100%;
        }
    .el-input_inner1 .el-input{
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