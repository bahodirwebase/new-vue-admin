<script setup lang="ts">
import ChatSidebar from "./widgets/ChatSidebar.vue";
import ChatMain from "./widgets/ChatMain.vue";
import ChatInfoSidebar from "./widgets/ChatInfoSidebar.vue";
import EditProfilModal from "./widgets/EditProfilModal.vue";
import SettingsModal from "./widgets/SettingsModal.vue";
</script>
<template>
  <div class="chat-app">
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
  </div>
</template>

<style lang="scss">
@use "./styles/chat.scss";
</style>
