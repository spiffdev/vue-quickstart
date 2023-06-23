<script setup lang="ts">
import { SpiffCommerceClient } from '@spiffcommerce/core';
import { SpiffCommerce3DPreviewService } from '@spiffcommerce/preview';
import { ref, onMounted } from 'vue'

const integrationProductId = '5141150b-8419-4e24-ae3f-9cab47a7920f'; // Sample Serving Board
const workflowId = '3b09df2b-8808-4b1c-955a-d4172e706d11'; // Sample Serving Board Workflow

const canvasRef = ref<HTMLCanvasElement | null>(null);
const client = new SpiffCommerceClient({});
const initialize = async () => {
    return await client.getWorkflowExperience(
        undefined,
        undefined,
        (workflow) => {
            return new SpiffCommerce3DPreviewService(workflow.globalPreviewConfig);
        },
        {
            type: 'integration',
            integrationProductId: integrationProductId,
            workflowId: workflowId,
        },
    );
};

onMounted(() => {
    initialize().then((experience) => {
        if(!canvasRef.value) return;
        experience.getWorkflowManager().getPreviewService().registerView(canvasRef.value);
    });
});
</script>

<template>
    <canvas id="preview" ref="canvasRef"></canvas>
</template>

<style scoped>
#preview {
    width: 100%;
    height: 100%;
    outline: none;
}
</style>
