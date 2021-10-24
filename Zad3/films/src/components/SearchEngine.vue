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
                if (this.film.yearFrom !== undefined || this.film.yearTo !== undefined) {
                    if (_.isEqual(this.film.yearFrom, '')) this.film.yearFrom = 1900;
                    if (_.isEqual(this.film.yearTo, '')) this.film.yearTo = 2019;
                }

                this.filmsToShow = _.filter(this.jsonDataList, (film) => {
                    if (_.isEmpty(this.film.title) && _.isEmpty(this.film.cast)) {
                        return true;
                    }
                    else {
                        let shouldReturn = (film.year >= this.film.yearFrom) && (film.year <= this.film.yearTo);

                        if (this.film.title !== "") {
                            shouldReturn &= film.title.includes(this.film.title);
                        }

                        if (this.film.cast !== "") {
                            shouldReturn &= film.cast.join(' ').includes(this.film.cast);
                        }

                        return shouldReturn;
                    }
                })
                console.log 
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
