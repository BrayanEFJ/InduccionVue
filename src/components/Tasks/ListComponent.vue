<template>

    <div>
        <v-col class="my-2">
            <v-row align="center">
                <h1 class="bold-text">Lista de tareas</h1>
                <v-spacer></v-spacer>

                <v-btn tile outlined color="teal" @click="openModal(false)" class="rounded-lg pa-5 my-3">
                    <v-icon left>
                        mdi-plus
                    </v-icon>
                    Agregar
                </v-btn>
            </v-row>
        </v-col>


        <v-dialog v-model="modalState" max-width="600">
            <v-card>
                <v-container>
                    <v-form @submit.prevent="handleFormSubmit" class="ma-5">
                        <h2 class="my-3">{{ isEditMode ? 'Editar tarea' : 'Agregar tarea' }}</h2>
                        <v-text-field type="text" label="Nombre" hint="Nombre de la tarea" v-model="task.name"
                            outlined></v-text-field>
                        <v-textarea type="text" label="Descripcion" hint="Descripcion de la tarea"
                            v-model="task.description" outlined></v-textarea>
                        <v-text-field type="date" :min="minStartDate" label="Fecha inicio"
                            hint="Fecha de inicio de la tarea" v-model="task.init_date" outlined></v-text-field>
                        <v-text-field type="date" :min="minStartDate" label="Fecha fin" hint="Fecha de fin de la tarea"
                            v-model="task.fin_date" outlined></v-text-field>
                        <v-combobox outlined label="Prioridad" :items="items" v-model="task.priority"> </v-combobox>
                        <v-combobox v-if="isEditMode" outlined label="Estado" :items="states" v-model="task.status">
                        </v-combobox>
                        <v-row dense class="mt-4">
                            <v-col cols="12" sm="6">
                                <v-btn block outlined type="button" @click="modalState = false" class="rounded-lg">
                                    Cancelar
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-btn block color="teal" type="submit" dark class="rounded-lg">
                                    {{ isEditMode ? 'Actualizar' : 'Agregar' }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>


        <v-row>
            <v-col cols="10" md="4">
                <v-text-field outlined v-model="search" append-icon="mdi-magnify" label="Buscar" hide-details />
            </v-col>
        </v-row>
        <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-0 mt-3">
            <template v-slot:item.status="{ item }">
                <v-chip class="equal-chip" :color="getColor(item.status)" dark>
                    {{ item.status }}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="mr-2" color="blue" @click="openModal(true, item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="red" @click="deleteUniqueTask(item.id)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </div>

</template>

<script>
import { getTasks, addTask, updateTask, deleteTask } from '@/services/TasksServices'


export default {
    name: 'ListTaskComponent',
    data() {
        return {
            search: '',
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
                { text: 'Acciones', value: 'actions', sortable: false }

            ],
            desserts: [],
            modalState: false,
            items: ['Baja', 'Media', 'Alta'],
            states: ['To do', 'Doing', 'Do'],

            task: {
                id: null,
                name: '',
                description: '',
                init_date: '',
                fin_date: '',
                priority: '',
                status: 'To do',
            },
        }
    },
    computed: {
        minStartDate() {
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        },
    },
    methods: {
        handleFormSubmit() {
            if (this.isEditMode) {
                this.putUpdateTask();
            } else {
                this.postAddTask();
            }
        },

        openModal(isedit, infoedit) {
            this.modalState = !this.modalState
            if (isedit) {
                this.isEditMode = true
                this.task = {
                    ...infoedit,
                    init_date: infoedit.initial_date,
                    fin_date: infoedit.finish_date,
                }

            }
            else {
                this.isEditMode = false;
                this.task = {
                    id: null,
                    name: '',
                    description: '',
                    init_date: '',
                    fin_date: '',
                    priority: '',
                    status: 'To do',
                };
            }
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
        async deleteUniqueTask(taskId) {
            try {
                await deleteTask(taskId);
                this.getInfoTasks();
                this.$toasted.success("Eliminado exitosamente", {
                    icon: 'check',
                });
            } catch (error) {
                this.$toasted.error("Error al intentar eliminar la tarea" + error, {
                    icon: 'error',
                });
            }
        },

        async getInfoTasks() {
            try {
                const response = await getTasks();
                this.desserts = response;
            } catch (error) {
                this.$toasted.error("error al cargar los datos de firebas" + error, {
                    icon: 'error',
                });
            }
        },

        validateinfo(startDaterec, endDaterec) {
            if (this.task.name && this.task.init_date && this.task.fin_date && this.task.priority) {

                const today = new Date()
                const todayString = today.toISOString().split('T')[0]
                const startDate = startDaterec
                const endDate = endDaterec
                if (
                    startDate < todayString ||
                    endDate < todayString ||
                    endDate < startDate
                ) {
                    this.$toasted.error("Revisa que las fechas sean correctas", {
                        icon: 'error',
                    });
                    return false;

                }
                return true;
            }
            else {
                this.$toasted.error("Los campos de nombre,fechas y prioridad son obligatorios", {
                    icon: 'error',
                });
                return false;
            }
        },

        limpiarCampos() {
            this.task.name = null
            this.task.description = null,
                this.task.init_date = null,
                this.task.fin_date = null,
                this.task.priority = null,
                this.task.status = null
        },
        async putUpdateTask() {
            var result = this.validateinfo(this.task.init_date, this.task.fin_date)

            if (result) {
                await updateTask(this.task.id, {
                    name: this.task.name,
                    description: this.task.description,
                    initial_date: this.task.init_date,
                    finish_date: this.task.fin_date,
                    priority: this.task.priority,
                    status: this.task.status,
                });

                await this.getInfoTasks();
                this.modalState = false;
                this.limpiarCampos();

                this.$toasted.success("Actualizado exitosamente", {
                    icon: 'check',
                });
            }


        },
        async postAddTask() {
            try {
                var result = this.validateinfo(this.task.init_date, this.task.fin_date)
                console.log("r", result);

                if (result) {
                    await addTask({
                        name: this.task.name,
                        description: this.task.description,
                        initial_date: this.task.init_date,
                        finish_date: this.task.fin_date,
                        priority: this.task.priority,
                        status: this.task.status,
                    });

                    this.$toasted.success("Creado exitosamente", {
                        icon: 'check',
                    });

                    await this.getInfoTasks();
                    this.modalState = false;
                    this.limpiarCampos();

                }

            } catch (error) {
                this.$toasted.error("error al cargar los datos en firebas" + error, {
                    icon: 'error',
                });
            }
        },

    },
    created() {
        this.isEditMode = false;
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