<template>
    <div class="container">
        <table class="table-condensed table-hover">
        <thead>
            <tr>
                <th class="col-md-4">Title</th>
                <th class="col-md-4">Production Year</th>
                <th class="col-md-4">Cast</th>
                <th class="col-md-4">Genres</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="(data, index) in filmsToShow" :key="index">
                    <td>{{data.title}}</td>
                    <td>{{data.year}}</td>
                    <td>{{data.cast.join(', ')}}</td>
                    <td>{{data.genres.join(', ')}}</td>
                </tr>
            </tbody>
        </table>

        <div class="float-right">
            <button class="btn btn-link btn-sm" v-on:click="showMore(filmsToShow, jsonDataList)">Pokaż więcej</button>
        </div>
    </div>
</template>

<script>
    import json from '../data/movies.json';
    import {_} from 'vue-underscore';
    import emitter from 'tiny-emitter/instance';
    
    export default  {
        name: "Films",
        data() { 
            return {
            jsonDataList: json,
            filmsToShow: [],
        }
        },
        created() {
            this.filmsToShow = _.first(this.jsonDataList, 10);
        },
        methods: {
            showMore: function(currentlyDisplayed) {
                let currentAmount = _.size(currentlyDisplayed);
                this.filmsToShow = _.first(this.jsonDataList, currentAmount + 10);
            },
            getJsonDataList: function() {
                emitter.emit('jsonDataEvent', this.jsonDataList);
            }
        },
        mounted() {
            this.getJsonDataList();
        }
    };
</script>

<style scoped></style>
