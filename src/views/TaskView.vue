<script>
import GreetingComponent from '@/components/Tasks/GretingComponent.vue';
import ListComponent from '@/components/Tasks/ListComponent.vue';
import DragAndDropComponent from '@/components/Tasks/DragAndDropComponent.vue'; // Asegúrate del nombre y ruta
export default {
    components: {
        GreetingComponent,
        ListComponent,
        DragAndDropComponent
    },
};
</script>

<template>
    <v-container>
        <v-main>
            <GreetingComponent />
            <v-card flat class="my-2">
                <v-tabs color="teal " left>
                    <v-tab>Tabla</v-tab>
                    <v-tab>News 👀</v-tab>
                    <v-tab-item>
                        <ListComponent />
                    </v-tab-item>
                    <v-tab-item>
                        <DragAndDropComponent />
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-main>
    </v-container>
</template>
