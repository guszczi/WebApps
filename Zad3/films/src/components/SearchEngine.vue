<template>
    <div class="container">
        <h1>Baza filmów</h1>
        <form>
            <div class="form-group">
                <label for=inputTitle>Tytuł</label>
                <input type="text" id=inputTitle class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu"/>
            </div>
            
            <div class="form-group row">
                <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
                <div class="col-sm-8">
                    <input type="text" id=inputProductionFrom class="form-control"  placeholder="Liczba naturalna z przedziału 1900-2019"/>
                </div>
            </div>
            
            <div class="form-group row">
                <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
                <div class="col-sm-8">
                    <input type="text" id=inputProductionTo class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019"/>
                </div>
            </div>
            
            <div class="form-group">
                <label for="inputCast">Obsada</label>
                <input type="text" id="inputCast" class="form-control" placeholder="Imię i nazwisko"/>
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
                jsonDataList: json,
                filmsToShow: [],
            }
        },
        beforeCreated() {
            emitter.on('jsonDataEvent', jsonData => {
                this.jsonDataList = jsonData;
                this.filmsToShow = jsonDataList;
            });
        },
        methods: {
            searchFilms: function() {
                _.each(this.jsonDataList, (film) => {
                    if (film.title.includes($("input:inputTitle").val())) {
                        this.filmsToShow.push(film);
                    }
                })


                if ($("input:inputCast)" !== '') {
                    _.each(this.jsonDataList, (film) => {
                        if (film.cast.includes($("input:inputCast").val())) {
                            this.filmsToShow.push(film);
                        }
                    }
                }
            },
            
            getJsonDataList: function() {
                this.searchFilms();
                if (true) {
                    emitter.emit('404', 'Brak wyników');
                }
                else emitter.emit('searchDataEvent', this.filmsToShow);
            }
        }
    };
</script>

<style scoped></style>
