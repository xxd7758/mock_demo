import Mock from 'mockjs';
const { newsList } = Mock.mock({
  'newsList|45': [
    {
      id: '@increment()',
      title: '@ctitle()',
      content: '@cparagraph()',
      img_url: '@image(200x200,#bfa,#aaa,jpg,困困)',
      add_time: '@date(yyyy-MM-dd hh-mm-ss)',
    },
  ],
});
// 根据url获取query参数
const getQuery = (url, name) => {
  // console.log(url, name);
  const index = url.indexOf('?');
  const str = url.slice(index + 1, url.length);
  const index_str = url.slice(index + 1, url.indexOf('&'));

  const pageindex = index_str.slice(
    index_str.indexOf('=') + 1,
    index_str.length,
  );
  const size_str = url.slice(url.indexOf('&') + 1, url.length);

  const pagesize = size_str.slice(size_str.indexOf('=') + 1, size_str.length);
  // console.log(pageindex, '---------', pagesize);
  if (name == 'pageindex') return pageindex;
  if (name == 'pagesize') return pagesize;
  return null;
};

Mock.mock(/\/api\/getnews/, 'get', (options) => {
  // url地址
  // console.log(options);
  const pageindex = getQuery(options.url, 'pageindex');
  const pagesize = getQuery(options.url, 'pagesize');
  const start = (pageindex - 1) * pagesize;
  const end = pageindex * pagesize;
  // console.log(pageindex, pagesize);
  const list = newsList.slice(start, end);
  const total = Math.ceil(newsList.length / pagesize);
  // console.log(newsList);
  return {
    status: 200,
    message: '获取新闻列表成功',
    list,
    total,
  };
});

// 添加
Mock.mock('/api/addNews', 'post', (options) => {
  const body = JSON.parse(options.body);
  // console.log(params.title, params.content);
  const list = newsList.push(
    Mock.mock({
      id: '@increment',
      title: body.title,
      content: body.content,
      img_url: '@image(200x200,#bfa,#aaa,jpg,困困)',
      add_time: '@date(yyyy-MM-dd hh-mm-ss)',
    }),
  );
  return {
    status: 200,
    message: '添加成功',
    list,
    total: newsList.length,
  };
});

// 删除
Mock.mock('/api/deleteNews', 'post', (options) => {
  // console.log(options);
  const id = JSON.parse(options.body).id;
  // console.log(id);
  const index = newsList.findIndex((item) => {
    return item.id == id;
  });
  // console.log(index);
  newsList.splice(index, 1);
  return {
    status: 200,
    message: '删除成功',
    list: newsList,
    total: newsList.length,
  };
});
