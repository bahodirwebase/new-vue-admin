<script setup lang="ts">
import ChatSidebar from "./widgets/ChatSidebar.vue";
import ChatMain from "./widgets/ChatMain.vue";
import ChatInfoSidebar from "./widgets/ChatInfoSidebar.vue";
import EditProfilModal from "./widgets/EditProfilModal.vue";
import SettingsModal from "./widgets/SettingsModal.vue";
</script>
<template>
  <div class="chat-app">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Chat</h1>
        <p class="page-subtitle">Real-time messaging application with chat rooms, file sharing, and user management</p>
      </div>
      
      <div class="chat-layout">
        <!-- Sidebar -->
        <ChatSidebar />

        <!-- Main Chat Area -->
        <ChatMain />

        <!-- Chat Info Sidebar -->
        <ChatInfoSidebar />
      </div>

      <!-- Modals -->
      <EditProfilModal />
      <SettingsModal />
    </n-space>
  </div>
</template>

<style lang="scss">
@use "./styles/chat.scss";

</style>
