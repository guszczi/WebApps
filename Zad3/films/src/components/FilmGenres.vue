<template>
    <div class="container">
        <h1>Filmy wg gatunku</h1>
        <ul class="list-group" v-for="(genre, index) in genres" :key="index">
            <li class="list-group-item" v-text="genre"></li>
            <ul v-for="(film, index) in combineGenresAndFilms(genre)" :key="index">
                <li v-text="film.title"></li>
            </ul>
        </ul>
    </div>
</template>

<script>
    import {_} from 'vue-underscore';
    import emitter from 'tiny-emitter/instance';
    
    export default {
        name: "FilmGenres",
        data() {
            return {
                jsonDataList: {},
                filmsToShow: [],
                genres: []
            }
        },
        beforeCreate() {
            emitter.on('jsonDataEvent', jsonData => {
                this.jsonDataList = jsonData;
            });
        },
        methods: {
            readGenres: function() {
                _.each(this.filmsToShow, (film) => {
                    _.each(film.genres, (genre) => {
                        if (!this.genres.includes(genre)) {
                            this.genres.push(genre);
                        }
                    })
                })
            },
            
            combineGenresAndFilms: function(genre) {
                return _.filter(this.filmsToShow, (film) => {
                    return _.contains(film.genres, genre)
                })
            }
        },
        mounted() {
            this.filmsToShow = _.first(this.jsonDataList, 100);
            this.readGenres();
        }
    };
</script>

<style scoped></style>
