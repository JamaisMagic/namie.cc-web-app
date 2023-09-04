<script setup lang="ts">
import { ref } from 'vue';

const inputUrl = ref('');

const onSubmit = () => {

};
</script>

<template>
  <el-row justify="space-evenly">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-form class="">
        <el-form-item label="">
          <el-input v-model="inputUrl" placeholder="Please enter an url." clearable />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

  <el-row justify="space-evenly">
    <el-col :span="2"></el-col>
    <el-col :span="20">

    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
