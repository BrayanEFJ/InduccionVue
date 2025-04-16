<template>
    <div class="pa-4">
        <h3 class="mb-4">📰 Noticias Random sobre tecnologia (tiene limite de peticiones cada 15min)</h3>
        <v-row dense>
            <v-col v-for="(noticia, index) in noticias" :key="index" cols="12" sm="6" md="4" lg="3">
                <v-card class="mx-auto" max-width="100%" outlined>
                    <v-img :src="noticia.image_url" height="200px" class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.6)">
                        <v-card-title>{{ noticia.source_name }}</v-card-title>
                    </v-img>

                    <v-card-text>
                        <div class="font-weight-bold mb-2">{{ noticia.title }}</div>
                        <div class="text--secondary text-caption">
                            {{ formatDate(noticia.pubDate) }}
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="teal" title outlined :href="noticia.link" target="_blank">
                            Leer más
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { getNoticias } from '../../services/NewsService';

export default {
    name: 'NoticiasComponent',
    data() {
        return {
            noticias: [],
        };
    },
    async mounted() {
        this.noticias = await getNoticias();
    },
    methods: {
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        },
    },
};
</script>

<style scoped>
.v-card-title {
    font-size: 16px;
    font-weight: 600;
}
</style>