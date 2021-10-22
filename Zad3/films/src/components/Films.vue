<template>
    <div class="container">
        <table class="table-condensed table-hover">
        <thead>
            <tr>
                <th>Title</th>
                <th>Production Year</th>
                <th>Cast</th>
                <th>Genres</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="(data, index) in jsonData" v-bind:key="index">
                    <td>{{data.title}}</td>
                    <td>{{data.year}}</td>
                    <td>{{data.cast.join(', ')}}</td>
                    <td>{{data.genres.join(', ')}}</td>
                </tr>
            </tbody>
        </table>

        <div>
            <button class="btn" v-on:click="showMore()">Pokaż więcej</button>
        </div>
    </div>
</template>

<script>
import json from '../data/movies.json'
export default {
    name: "Films",
    data() {
        return {
        jsonData: json,
    }
    },
    methods: {

    }
};
</script>

<style scoped></style>
