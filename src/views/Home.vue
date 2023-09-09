<script setup lang="ts">
import { ref } from 'vue';
import GhIcon from '../components/gh-icon/GhIcon.vue';
import { shorten } from '../utils/request.ts';
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import { CopyDocument } from '@element-plus/icons-vue';

const exampleUrl = 'https://www.google.com';
const inputUrl = ref('');
const isLoading = ref(false);
const shortUrls = ref<Array<any>>([]);
const linkListLength = 10;

const onSubmit = async () => {
  if (isLoading.value) {
    return;
  }

  let response: any = null;
  isLoading.value = true;

  try {
    response = await shorten(inputUrl.value || exampleUrl);
  } catch (error: any) {
    console.error(error);
  }
  isLoading.value = false;

  if (response && response.status === 200 && response.data) {
    if (response.data.code === 0) {
      shortUrls.value.push(response.data.data);
      if (shortUrls.value.length > linkListLength) {
        shortUrls.value.shift();
      }
      ElMessage({
        type: 'success',
        message: 'Success.',
      });
    } else {
      ElMessageBox.alert(response.data.msg, 'Error', {
        confirmButtonText: 'OK',
      });
    }
  } else if (response && response.response) {
    ElMessageBox.alert(
      `Response error, please try again later or contact the administrator.(1350756140@qq.com).
  status: ${response.response.status}, data: ${response.response.data}`,
      'Error',
      {
        confirmButtonText: 'OK',
      }
    );
  } else if (response && response.request) {
    ElMessageBox.alert('Request error, please check your network.', 'Error', {
      confirmButtonText: 'OK',
    });
  } else {
    ElMessageBox.alert(
      'Unknown error, please try again later or contact the administrator.(1350756140@qq.com)',
      'Error',
      {
        confirmButtonText: 'OK',
      }
    );
  }
};

const onCopyClick = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    ElMessage({
      type: 'success',
      message: 'Copied.',
    });
  } catch (error) {
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
        <el-row justify="space-evenly" class="header-row">
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <div class="title-wrapper">
              <el-link
                class="font-18"
                href="/"
                title="www.namie.cc"
                type="primary"
                size="large"
                :underline="false"
                >www.namie.cc</el-link
              >
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
        <div class="main-wrapper">
          <el-row justify="space-evenly">
            <el-col :span="24">
              <el-form label-position="top" @submit.prevent="onSubmit">
                <el-form-item
                  class="font-16"
                  :label="`Paste an url to the input, for example: ${exampleUrl}`"
                >
                  <el-input
                    class="font-16"
                    v-model="inputUrl"
                    :placeholder="exampleUrl"
                    clearable
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="font-16"
                    type="primary"
                    size="large"
                    :disabled="isLoading"
                    @click.prevent="onSubmit"
                    >Submit</el-button
                  >
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-row class="font-16" justify="space-evenly" align="middle">
            <el-col :span="24">
              Notice: It's not in production env, all the data will be deleted
              every day.
            </el-col>
          </el-row>

          <el-divider />

          <el-row justify="space-evenly">
            <el-col :span="24">
              <el-space direction="vertical" fill>
                <el-row
                  v-if="shortUrls.length > 0"
                  class="font-16"
                  justify="space-evenly"
                  align="middle"
                >
                  <el-col :span="24">
                    Only {{ linkListLength }} links displayed below.
                  </el-col>
                </el-row>
              </el-space>

              <el-row justify="space-evenly">
                <el-table
                  :data="shortUrls"
                  table-layout="fixed"
                  size="large"
                  style="width: 100%"
                >
                  <el-table-column label="Short url">
                    <template #default="scope">
                      <div style="display: flex; align-items: center">
                        <el-space wrap>
                          <el-button
                            type="info"
                            size="small"
                            :icon="CopyDocument"
                            circle
                            @click.prevent="onCopyClick(scope.row.url)"
                          />
                          <el-link
                            :href="scope.row.url"
                            target="_blank"
                            rel="noopener nofollow noreferrer"
                            :title="scope.row.url"
                            >{{ scope.row.url }}</el-link
                          >
                        </el-space>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Original url">
                    <template #default="scope">
                      <div style="display: flex; align-items: center">
                        <el-text size="large" :truncated="true">{{
                          scope.row.original
                        }}</el-text>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.font-18 {
  font-size: 18px;
}
.font-16 {
  font-size: 16px;
}
.header-row {
  height: 100%;
}
.title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.gh-wrapper {
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
}
.main-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
