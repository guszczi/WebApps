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

        <div class="float-right" v-if="buttonVisible"> 
            <button class="btn btn-link btn-sm" v-on:click="showMore(filmsToShow)">Pokaż więcej</button>
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
            jsonDataList: json, // loaded json file
            filmsToShow: [], // films that are being displayed in table (usually 10 at a time)
            dataSent: [], // films sent by searcher (to help showMore function get more than 10 films)
            buttonVisible: true // displaying show more button
        }
        },
        created() {
            this.filmsToShow = this.jsonDataList;
            this.dataSent = this.jsonDataList;
            emitter.on('searchDataEvent', films => {
                this.dataSent = films;
                this.filmsToShow = films;
                this.initFilms(this.filmsToShow);
                if (_.size(films) < 10) this.buttonVisible = false;
                else this.buttonVisible = true;
            });
            emitter.on('404', x => {
                alert(x);
            });
        },
        methods: {
            initFilms: function(filmsToShow) {
                this.filmsToShow = _.first(filmsToShow, 10);
            },
            showMore: function(currentlyDisplayed) {
                let currentAmount = _.size(currentlyDisplayed);
                this.filmsToShow = _.first(this.dataSent, currentAmount + 10);
            },
            getJsonDataList: function() {
                emitter.emit('jsonDataEvent', this.jsonDataList);
            }
        },
        mounted() {
            this.initFilms(this.filmsToShow);
            this.getJsonDataList();
        }
    };
</script>

<style scoped></style>
