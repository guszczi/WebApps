<template>
    <div class="container">
        <h1>Baza filmów</h1>
        <form>
            <div class="form-group">
                <label for=inputTitle>Tytuł</label>
                <input type="text" v-model="film.title" id=inputTitle class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu"/>
            </div>
            
            <div class="form-group row">
                <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
                <div class="col-sm-8">
                    <input type="text" v-model="film.yearFrom" id=inputProductionFrom class="form-control"  placeholder="Liczba naturalna z przedziału 1900-2019"/>
                </div>
            </div>
            
            <div class="form-group row">
                <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
                <div class="col-sm-8">
                    <input type="text" v-model="film.yearTo" id=inputProductionTo class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019"/>
                </div>
            </div>
            
            <div class="form-group">
                <label for="inputCast">Obsada</label>
                <input type="text" v-model="film.cast" id="inputCast" class="form-control" placeholder="Imię i nazwisko"/>
            </div>
                <div class="form-group row">
                    <input type="button" @click="getJsonDataList" class="btn btn-info col-sm-12" value="Szukaj"/>
                </div>
        </form>
    </div>
</template>

<script>
    import {_} from 'vue-underscore';
    import emitter from 'tiny-emitter/instance';
    
    export default {
        name: "SearchEngine",
        data() {
            return {
                film: {
                    title: '',
                    yearFrom: '',
                    yearTo: '',
                    cast: ''
                },
                jsonDataList: {},
                filmsToShow: [],
            }
        },
        created() {
            emitter.on('jsonDataEvent', jsonData => {
                this.jsonDataList = jsonData;
            });
        },
        methods: {
            searchFilms: function() {         
                this.filmsToShow = [...this.jsonDataList];
                let tmp = [];
                
                if (this.film.title !== "") {
                    this.filmsToShow = [];
                    _.each(this.jsonDataList, (film) => {
                        if (film.title.includes(this.film.title)) {
                            this.filmsToShow.push(film);
                        }
                    })
                }
                

                if (this.film.yearFrom !== undefined || this.film.yearTo !== undefined) {
                    tmp = [...this.filmsToShow];
                    this.filmsToShow = [];

                    if (_.isEqual(this.film.yearFrom, '')) this.film.yearFrom = 1900;
                    if (_.isEqual(this.film.yearTo, '')) this.film.yearTo = 2019;

                    _.each(tmp, (film) => {
                        if ((film.year >= this.film.yearFrom) && (film.year <= this.film.yearTo)) {
                            this.filmsToShow.push(film);
                        }
                    });
                }

                if (this.film.cast !== "") {
                    tmp = [...this.filmsToShow];
                    this.filmsToShow = [];
                    _.each(tmp, (film) => {
                        _.each(film.cast, (cast) => {
                            if (cast.includes(this.film.cast)) {
                                this.filmsToShow.push(film);
                            }
                        })
                    })
                }
            },
            
            getJsonDataList: function() {
                this.searchFilms();
                if (!_.size(this.filmsToShow)) {
                    emitter.emit('404', 'Brak wyników');
                }
                else emitter.emit('searchDataEvent', this.filmsToShow);
            }
        }
    };
</script>

<style scoped></style>
