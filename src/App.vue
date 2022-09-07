<template>
  <div>
    <!-- 头部 搜索区 -->
    <div class="header">
      <el-input
        v-model="title"
        placeholder="请输入标题"
        style="width: 200px"
      ></el-input>
      <el-input
        v-model="content"
        placeholder="请输入内容"
        style="width: 200px"
      ></el-input>
      <el-button type="primary" size="default" @click="add">添加</el-button>
    </div>
    <!-- 主体 -->
    <div class="main">
      <el-table :data="list" border stripe>
        <el-table-column prop="id"> </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{ row, $index }">
            <img :src="row.img_url" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="content" label="内容"> </el-table-column>
        <el-table-column prop="add_time" label="时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="primary" size="default" @click="remove(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 底部换页 -->
    <div class="footer">
      <el-button type="primary" size="default" @click="pre">上一页</el-button>
      <el-button type="primary" size="default" @click="next">下一页</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      content: "",
      list: [],
      pageindex: 1,
      pagesize: 10,
      totalPage: 0,
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      axios
        .get("/api/getnews", {
          params: { pageindex: this.pageindex, pagesize: this.pagesize },
        })
        .then((res) => {
          this.list = res.data.list;
          this.total = res.data.total;
          // console.log(res);
        });
    },
    pre() {
      this.pageindex = this.pageindex == 1 ? 1 : this.pageindex - 1;
      this.getNewsList();
    },
    next() {
      this.pageindex =
        this.pageindex == this.total ? this.total : this.pageindex + 1;
      this.getNewsList();
    },
    add() {
      axios
        .post("/api/addNews", {
          title: this.title,
          content: this.content,
        })
        .then((res) => {
          console.log(res);
          this.getNewsList();
        });
    },
    remove(id) {
      axios.post("/api/deleteNews", { id }).then((res) => {
        console.log(res);
        this.getNewsList();
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
}
.main {
  width: 100%;
  height: 500px;
  overflow: auto;
}
</style>