<template>
    <div>
        <div class ="error">404页面
            <div class="my-btn">
                <el-button @click="handerRef">刷新页面</el-button>
                <el-button @click="handerRef">返回首页</el-button>
            </div>           
        </div>
    </div>
</template>

<script>
export default {
    name: 'YaoyaoA404',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        handerRef(){
            // 刷新页面
            // window.location.href = "#"
            this.$router.push("/")
        }
    },
};
</script>

<style lang="less" scoped>
    .error{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: url('../../../public/img/404.jpeg') no-repeat center;
        background-size: cover;
        position:relative;
        .my-btn{
            position:absolute;
            top:65%;
            left:50%;
            transform:translate(-50%,-50%);
            width: 306px;
            background:rgb(212,249,255);
            display: flex;
            justify-content:space-between;
             .el-button{
                 background: rgba(51,125,138,0.5);
             }
        }
    }
</style>