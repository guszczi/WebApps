<template>
    <div class="container">
        <h1>Filmy wg obsady</h1>
        <ul class="list-group" v-for="(cast, index) in casts" :key="index">
            <li class="list-group-item" v-text="cast"></li>
            <ul v-for="(film, index) in combineCastsAndFilms(cast)" :key="index">
                <li v-text="film.title"></li>
            </ul>
        </ul>
    </div>
</template>

<script>
    import {_} from 'vue-underscore';
    import emitter from 'tiny-emitter/instance';
    
    export default {
        name: "FilmCasts",
        data() {
            return {
                jsonDataList: {},
                filmsToShow: [],
                casts: []
            }
        },
        beforeCreate() {
            emitter.on('jsonDataEvent', jsonData => {
                this.jsonDataList = jsonData;
            });
        },
        methods: {
            readCasts: function() {
                _.each(this.filmsToShow, (film) => {
                    _.each(film.cast, (cast) => {
                        if (!_.contains(this.casts, cast)) {
                            this.casts.push(cast);
                        }
                    }
                    )
                })
            },
            
            combineCastsAndFilms: function(cast) {
                var result = []
                _.each(this.filmsToShow, (film) => {
                    if (_.contains(film.cast, cast) === true) {
                        result.push(film);
                    }
                })
                return result;
            }
        },
        mounted() {
            this.filmsToShow = _.first(this.jsonDataList, 100);
            this.readCasts();
        }
    };
</script>

<style scoped></style>
