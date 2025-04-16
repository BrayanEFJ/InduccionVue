<template>

    <div>
        <v-col class="my-2">
            <v-row>
                <h1 class="bold-text">Lista de tareas</h1>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" outlined fab color="teal" @click="openModal">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-row>

        </v-col>

        <v-dialog v-model="modalState" max-width="600">
            <v-card>
                <v-container>
                    <v-form @submit.prevent="addEvent" class="ma-5">

                        <h2 class="my-3">Agregar tarea</h2>

                        <v-text-field type="text" label="Nombre" hint="Nombre de la tarea" v-model="name"
                            outlined></v-text-field>
                        <v-textarea type="text" label="Detalle" hint="Detalles de la tarea" v-model="details"
                            outlined></v-textarea>
                        <v-text-field type="date" :min="minStartDate" label="Fecha inicio"
                            hint="Fecha de inicio de la tarea" v-model="start" outlined></v-text-field>
                        <v-text-field type="date" :min="minStartDate" label="Fecha fin" hint="Fecha de fin de la tarea"
                            v-model="end" outlined></v-text-field>
                        <v-text-field type="color" label="Color" hint="Selecciona el color de la tarea" v-model="color"
                            outlined></v-text-field>
                        <v-row dense class="mt-4">
                            <v-col cols="12" sm="6">
                                <v-btn block color="primary" type="submit">
                                    Agregar
                                </v-btn>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-btn block color="secondary" type="button" @click="modalState = false">
                                    Cancelar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>



        <v-data-table :headers="headers" :items="desserts[0]" class="elevation-0">
            <template v-slot:item.status="{ item }">
                <v-chip class="equal-chip" :color="getColor(item.status)" dark>
                    {{ item.status }}
                </v-chip>
            </template>
        </v-data-table>
    </div>

</template>

<script>
import { getTasks } from '@/services/TasksServices'


export default {
    name: 'ListTaskComponent',
    data() {
        return {
            headers: [
                {
                    text: 'Tarea',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Descripcion', value: 'description' },
                { text: 'Fecha inicio', value: 'initial_date' },
                { text: 'Fecha fin', value: 'finish_date' },
                { text: 'Prioridad', value: 'priority' },
                { text: 'Estado', value: 'status' },

            ],
            desserts: [],
            modalState: false,
        }
    },
    methods: {
        openModal() {
            this.modalState = !this.modalState
        },

        getColor(estado) {
            if (estado == 'To do') {
                return 'red'
            }
            else if (estado == 'Doing') {
                return 'orange'
            }
            else {
                return 'green'
            }
        },
        async getInfoTasks() {
            try {
                const response = await getTasks();
                this.desserts.push(response);
            } catch (error) {
                console.log("error al cargar los daos de firebase", error);
            }
        },
    },
    created() {
        this.getInfoTasks();
    },
}

</script>

<style>
.equal-chip {
    width: 70px;
    justify-content: center;
}
</style>