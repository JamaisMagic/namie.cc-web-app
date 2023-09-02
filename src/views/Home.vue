<script setup lang="ts">
  import { ref } from 'vue';
  import GhIcon from '../components/gh-icon/GhIcon.vue';
  import { shorten } from '../utils/request.js';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message/style/css';
  import 'element-plus/es/components/message-box/style/css';
  import { CopyDocument } from '@element-plus/icons-vue';

  const exampleUrl = 'https://www.google.com';
  const inputUrl = ref('');
  const isLoading  = ref(false);
  const shortUrls = ref<Array<string>>([]);

  const onSubmit = async () => {
    if (isLoading.value) {
      return;
    }
    isLoading.value = true;
    const response = await shorten(inputUrl.value ? inputUrl.value : exampleUrl);
    isLoading.value = false;

    if (response && response.status === 200 && response.data && response.data.code === 0) {
      shortUrls.value.push(response.data.data.url);
      if (shortUrls.value.length > 10) {
        shortUrls.value.shift();
      }
      ElMessage({
        type: 'success',
        message: 'Success.',
      });
    } else {
      ElMessageBox.alert('There is something wrong, please try again later or contact the Administrator.(1350756140@qq.com)', 'Error', {
        confirmButtonText: 'OK',
      })
    }
  };

  const onCopyClick = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      ElMessage({
        type: 'success',
        message: 'Copied.',
      });
    } catch(error) {
      console.error(error);
      ElMessage({
        type: 'error',
        message: 'Copy Failed.',
      });
    }
  };
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-row justify="space-evenly">
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <div class="title-wrapper">
              <el-text type="primary" size="large">www.namie.cc</el-text>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="gh-wrapper">
              <GhIcon />
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-row justify="space-evenly">
          <el-col :span="24">
            <el-form class="" @submit="onSubmit">
              <el-form-item label="">
                <el-input v-model="inputUrl" :placeholder="`Example: ${exampleUrl}`" clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" :disabled="isLoading" @click.prevent="onSubmit">Submit</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row justify="space-evenly">
          <el-col :span="24">
            <el-space direction="vertical" fill>
              <el-row justify="space-evenly" align="middle">
                <el-col>
                  Only 10 links displayed below.
                </el-col>
              </el-row>
              <el-row v-for="item in shortUrls" justify="space-evenly" align="middle">
                <el-col :span="24">
                  <el-space wrap>
                    <el-button type="info" size="small" :icon="CopyDocument" circle @click.prevent="onCopyClick(item)" />
                    <el-link :href="item" target="_blank" rel="noopener nofollow noreferrer">{{ item }}</el-link>
                  </el-space>
                </el-col>
              </el-row>
            </el-space>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.gh-wrapper {
  display: flex;
  justify-content: end;
}
</style>
