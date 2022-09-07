import Mock from 'mockjs';

Mock.mock('/api/home', 'get', {
  status: 200,
  msg: '成功',
});

// const data = Mock.mock({
//   //   'string|1-4': '你好',//随机重复你好 1-4遍
//   //   string: '@cword(3,10)', //随机生成3-10个文本
//   //   title: '@ctitle(5,10)', //标题 最低是5
//   //   sentence: '@csentence(8)', //句子
//   //   content: '@cparagraph(5)', //生成段落
//   //   'number|1-80': 1, //数字
// //   id: '@increment(2)', //id自增
// });
// 名字  id  城市
// const data = Mock.mock({
//   name: '@cname',
//   id: '@id',
//   address: '@city(true)',
// });

// const data = Mock.mock({
//    img: '@image(250x250,#bfa,#fff,jpg,困困)', //生成图片
//   date: '@date(yyyy-MM-dd hh:mm:ss)', //生成时间
// });

// 生成多个数据
// const data = Mock.mock({
//   'list|1-20': [
//     { name: '@cname', id: '@increment(1)', address: '@city(true)' },
//   ],
// });
// console.log(data);
