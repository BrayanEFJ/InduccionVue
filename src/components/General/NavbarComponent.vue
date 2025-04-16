<template>
    <v-app>
        <v-app-bar color="white elevation-0" app>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title class="bold-text">To do list</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <router-link to="/" style="text-decoration: none; color: inherit;">
                        <v-list-item class="mt-6" link>
                            <v-list-item-icon>
                                <v-icon>mdi-view-dashboard-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>To do</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/calendar" style="text-decoration: none; color: inherit;">
                        <v-list-item class="mt-3">
                            <v-list-item-icon>
                                <v-icon>mdi-calendar-badge-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Calendar</v-list-item-title>
                        </v-list-item>
                    </router-link>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <router-view />
    </v-app>
</template>

<script>
export default {
    name: 'Navbar',
    data: () => ({
        drawer: false,
        group: 0,
    }),
};
</script>