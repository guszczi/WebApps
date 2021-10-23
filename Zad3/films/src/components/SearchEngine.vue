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
                jsonDataList: [],
                filmsToShow: [],
            }
        },
        created() {
            emitter.on('jsonDataEvent', jsonData => {
                this.jsonDataList = jsonData;
                this.filmsToShow = [...this.jsonDataList];
            });
        },
        methods: {
            searchFilms: function() {
                this.filmsToShow = [];
                _.each(this.jsonDataList, (film) => {
                    if (_.contains(film.title, this.film.title)) {
                        this.filmsToShow.push(film);
                    }
                })


                if (this.film.cast !== '') {
                    console.log("udalo sie");
                    _.each(this.jsonDataList, (film) => {
                        if (_.contains(film.cast, this.film.cast)) {
                            this.filmsToShow.push(film);
                        }
                    })
                }
                console.log(this.filmsToShow);
            },
            
            getJsonDataList: function() {
                this.searchFilms();
                if (_.size(this.filmsToShow) === 0) {
                    emitter.emit('404', 'Brak wyników');
                    this.filmsToShow = this.jsonDataList;
                }
                else emitter.emit('searchDataEvent', this.filmsToShow);
            }
        }
    };
</script>

<style scoped></style>
