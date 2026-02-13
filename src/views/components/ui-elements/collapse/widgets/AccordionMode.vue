<script lang="ts" setup>
import CustomCollapse from '@/components/CustomCollapse.vue'
import CustomCollapseItem from '@/components/CustomCollapseItem.vue'
import { NCard, NSpace, NText } from 'naive-ui'
</script>
<template>
    <!-- Accordion Demo -->
    <NCard title="Accordion Mode Demo" :bordered="false" size="small">
        <NSpace vertical :size="12">
            <NText depth="3">
                In accordion mode, only one item can be expanded at a time. Click on any item to see it in action.
            </NText>
            <CustomCollapse accordion style="border-radius: 8px;">
                <CustomCollapseItem item-key="item1" title="First Item">
                    <NText>This is the first item. When you click on other items, this will automatically close.</NText>
                </CustomCollapseItem>
                <CustomCollapseItem item-key="item2" title="Second Item">
                    <NText>This is the second item. Only one item can be open at a time in accordion mode.</NText>
                </CustomCollapseItem>
                <CustomCollapseItem item-key="item3" title="Third Item">
                    <NText>This is the third item. Try clicking between items to see the accordion behavior!</NText>
                </CustomCollapseItem>
            </CustomCollapse>
        </NSpace>
    </NCard>
</template>