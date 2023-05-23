const Koa = require('koa');
const { koaBody } = require('koa-body');

const Router = require('./router');

// 实例化koa
const app = new Koa();
app.use(koaBody());

// app.use()注册中间件
app.use((ctx, next) => {
    // ctx 是http的上下文，next 放行
    // ctx.body是返回给前端的内容
    console.log(ctx);
    ctx.body = ctx;
})
app.use(Router.routes());

app.listen(3000, () => {
    console.log('3000端口启动了哈~~~');
})