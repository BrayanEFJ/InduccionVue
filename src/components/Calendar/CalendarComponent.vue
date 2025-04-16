<template>
    <v-container class="my-16">
        <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">

                    <v-toolbar flat color="white" class="move-toolbar ">
                        <v-btn color="primary" dark class="mr-4 w-100 d-block d-md-inline-block" @click="dialog = true"
                            md="12">
                            Agregar
                        </v-btn>
                        <v-btn outlined class="" @click="setToday">
                            Hoy
                        </v-btn>
                        <v-btn fab text small @click="prev">
                            <v-icon small>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab text small @click="next">
                            <v-icon small>mdi-chevron-right</v-icon>
                        </v-btn>
                        <v-toolbar-title class="bold-text">{{ title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-menu bottom right>
                            <template v-slot:activator="{ on }">
                                <v-btn outlined v-on="on">
                                    <span>{{ typeToLabel[type] }}</span>
                                    <v-icon right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>Día</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Semana</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Mes</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = '4day'">
                                    <v-list-item-title>4 días</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                </v-sheet>
                <v-sheet height="600">

                    <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                        :event-color="getEventColor" :event-margin-bottom="3" :now="today" :type="type"
                        @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" @change="updateRange"
                        :weekdays="[1, 2, 3, 4, 5, 6, 0]" locale="es" :short-weekdays="false"></v-calendar>

                    <v-dialog v-model="dialog" max-width="600">
                        <v-card>
                            <v-container>
                                <v-form @submit.prevent="addEvent" class="ma-5">

                                    <h2 class="my-3">Agregar Evento</h2>

                                    <v-text-field type="text" label="Nombre" hint="Nombre de la evento" v-model="name"
                                        outlined></v-text-field>
                                    <v-textarea type="text" label="Detalle" hint="Detalles de la event"
                                        v-model="details" outlined></v-textarea>
                                    <v-text-field type="date" :min="minStartDate" label="Fecha inicio"
                                        hint="Fecha de inicio de la event" v-model="start" outlined></v-text-field>
                                    <v-text-field type="date" :min="minStartDate" label="Fecha fin"
                                        hint="Fecha de fin de la event" v-model="end" outlined></v-text-field>
                                    <v-text-field type="color" label="Color" hint="Selecciona el color de la event"
                                        v-model="color" outlined></v-text-field>

                                        
                                    <v-row dense class="mt-4">
                                        <v-col cols="12" sm="6">
                                            <v-btn block color="primary" type="submit">
                                                Agregar
                                            </v-btn>
                                        </v-col>

                                        <v-col cols="12" sm="6">
                                            <v-btn block color="secondary" type="button" @click="dialog = false">
                                                Cancelar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card>
                    </v-dialog>



                    <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement"
                        content-class="custom-menu" offset-x>
                        <v-card color="grey lighten-4" max-width="350px" flat>
                            <v-toolbar :color="selectedEvent.color" dark>
                                <v-btn icon @click="deleteEvent(selectedEvent)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>


                            <v-card-text>

                                <v-form v-if="currentlyEditing !== selectedEvent.id">
                                    Detalles: {{ selectedEvent.details }}
                                </v-form>

                                <v-form v-else>
                                    <v-text-field type="text" label="Nombre" hint="Editar Nombre"
                                        v-model="selectedEvent.name" outlined></v-text-field>

                                    <v-textarea type="text" label="Detalles" hint="Editar Detalles de la event"
                                        v-model="selectedEvent.details" outlined></v-textarea>

                                    <v-text-field type="date" :min="minStartDate" label="Fecha inicio"
                                        hint="Fecha de inicio de la event" v-model="selectedEvent.start"
                                        outlined></v-text-field>
                                    <v-text-field type="date" :min="minStartDate" label="Fecha fin"
                                        hint="Fecha de fin de la event" v-model="selectedEvent.end"
                                        outlined></v-text-field>
                                    <v-text-field type="color" label="Color" hint="Selecciona el color de la event"
                                        v-model="selectedEvent.color" outlined></v-text-field>

                                </v-form>

                            </v-card-text>


                            <v-card-actions>
                                <v-btn text color="secondary" @click="cancelSendInfo">
                                    Cancelar
                                </v-btn>
                                <v-btn text v-if="currentlyEditing !== selectedEvent.id"
                                    @click.prevent="editEvent(selectedEvent)" color="primary">Editar</v-btn>

                                <v-btn text v-else @click.prevent="updateEvent(selectedEvent)" color="primary">Guardar
                                    Cambios</v-btn>
                            </v-card-actions>
                        </v-card>


                    </v-menu>
                </v-sheet>
            </v-col>
        </v-row>
        <v-alert v-model="openAlert" :type="typeError" :color="colorAlert" elevation="8" max-width="300px">
            {{ infoAlert }}
        </v-alert>
    </v-container>
</template>

<script>
import { addEvent, getEvents, deleteEvent, updateEvent } from '../../services/EventsService'

export default {
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        typeToLabel: {
            month: 'Mes',
            week: 'Semana',
            day: 'Dia',
            '4day': '4 dias',
        },
        started: null,
        ended: null,
        start: null,
        startDate: null,
        endDate: null,
        end: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        name: null,
        details: null,
        color: '#1976D2',
        dialog: false,
        currentlyEditing: null,
        openAlert: false,
        infoAlert: '',
        typeError: 'error',
        colorAlert: 'red'
    }),
    computed: {
        minStartDate() {
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        },
        title() {
            const { started, ended } = this;
            if (!started || !ended || !this.$refs.calendar) {
                return '';
            }
            const startMonth = this.monthFormatter(started);
            const startYear = started.getFullYear();

            return `${startMonth} ${startYear}`;
        },
    },
    mounted() {
        this.$refs.calendar.checkChange();
    },
    created() {
        this.getEvents();
    },
    methods: {
        monthFormatter(date) {
            if (!this.$refs.calendar) return '';
            const monthNames = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
            return monthNames[date.getMonth()];
        },
        async cancelSendInfo() {
            this.selectedOpen = false,
                this.currentlyEditing = null
        },
        async updateInfoAlerts(info, type, color) {
            this.openAlert = true;
            this.infoAlert = info
            this.typeError = type,
                this.colorAlert = color

            setTimeout(() => {
                this.openAlert = false;
            }, 5000);
        },
        async getEvents() {
            try {
                this.events = await getEvents()
            } catch (error) {
                this.updateInfoAlerts(
                    'Ha ocurrido un error al traer los datos',
                    'error',
                    'red'
                );
            }
        },
        validateDates(startDaterec, endDaterec) {
            const today = new Date()
            const todayString = today.toISOString().split('T')[0]

            const startDate = startDaterec
            const endDate = endDaterec

            if (
                startDate < todayString ||
                endDate < todayString ||
                endDate < startDate
            ) {
                this.updateInfoAlerts(
                    'Revisa que las fechas sean correctas',
                    'warning',
                    'orange'
                )

                console.log("joa", startDate + endDate + today)
                return false;
            }
            return true;
        },
        async addEvent() {
            try {
                if (this.name && this.start && this.end) {
                    var responseValidate = this.validateDates(this.start, this.end)
                    if (responseValidate) {
                        await addEvent({
                            name: this.name,
                            details: this.details,
                            start: this.start,
                            end: this.end,
                            color: this.color
                        })
                        this.getEvents()
                        this.name = null
                        this.details = null
                        this.start = null
                        this.end = null
                        this.color = '#1976D2'
                        this.updateInfoAlerts(
                            'Guardado exitosamente',
                            'success',
                            'green'
                        );
                        this.dialog = false;
                    }
                } else {
                    this.updateInfoAlerts(
                        'los campos son obligatorios',
                        'warning',
                        'orange'
                    );
                }
            } catch (error) {
                this.updateInfoAlerts(
                    'Error al guardar en firebase' + error,
                    'error',
                    'red'
                );
            }
        },
        async updateEvent(ev) {
            try {
                const responseValidate = this.validateDates(ev.start, ev.end);
                console.log("inicio", ev.start, "fin", ev.end);

                if (responseValidate) {
                    await updateEvent(ev.id, {
                        name: ev.name,
                        details: ev.details,
                        start: ev.start,
                        end: ev.end,
                        color: ev.color
                    });

                    this.selectedOpen = false;
                    this.currentlyEditing = null;

                    this.updateInfoAlerts(
                        'Actualizado exitosamente',
                        'success',
                        'green'
                    );
                } else {
                    this.selectedEvent = JSON.parse(JSON.stringify(this.originalEvent));
                    this.getEvents()
                    this.updateInfoAlerts(
                        'Fechas      inválidas. Se restauraron los valores originales.',
                        'warning',
                        'orange'
                    ); 
                }
            } catch (error) {
                this.updateInfoAlerts(
                    'Error al actualizar en firebase: ' + error,
                    'error',
                    'red'
                );
            }
        },


        editEvent(select) {
            // Clonamos el evento original para poder restaurarlo después si es necesario
            this.originalEvent = JSON.parse(JSON.stringify(select));
            this.currentlyEditing = select.id;
        },
        async deleteEvent(ev) {
            try {
                await deleteEvent(ev.id)
                this.selectedOpen = false
                this.getEvents()

                this.updateInfoAlerts(
                    'Eliminado exitosamente',
                    'success',
                    'green'
                );
            } catch (error) {


                this.updateInfoAlerts(
                    'Error al Eliminar en firebase',
                    'error',
                    'red'
                );
            }
        },
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = this.today
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                setTimeout(() => this.selectedOpen = true, 10)
            }
            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }
            nativeEvent.stopPropagation()
        },
        updateRange({ start, end }) {
            this.started = new Date(start.year, start.month - 1, start.day)
            this.ended = new Date(end.year, end.month - 1, end.day)
        },
        nth(d) {
            return d > 3 && d < 21
                ? 'th'
                : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
        },
    },
}
</script>
<style>
.custom-menu {
    min-width: 350px !important;
    max-width: 350px !important;
    width: 350px !important;
    padding: 0 !important;
}

.move-toolbar {
    overflow-x: auto;
}
</style>