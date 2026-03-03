<script setup lang="ts">
import ChatSidebar from "./widgets/ChatSidebar.vue";
import ChatMain from "./widgets/ChatMain.vue";
import ChatInfoSidebar from "./widgets/ChatInfoSidebar.vue";
import EditProfilModal from "./widgets/EditProfilModal.vue";
import SettingsModal from "./widgets/SettingsModal.vue";
import PageHeader from "@/components/custom/PageHeader.vue";
</script>
<template>
  <div class="chat-app">
    <n-space vertical :size="18">
      <PageHeader title="Chat" subtitle="Real-time messaging application with chat rooms, file sharing, and user management" />
      
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
