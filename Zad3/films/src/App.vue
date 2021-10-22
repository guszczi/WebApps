<template>
    <SearchEngine />
    <Films />
    <FilmGenres />
    <FilmCasts />
</template>

<script>
import FilmCasts from "./components/FilmCasts";
import FilmGenres from "./components/FilmGenres";
import Films from "./components/Films";
import SearchEngine from "./components/SearchEngine";

export default {
    name: "App",
    components: {
        FilmCasts,
        FilmGenres,
        Films,
        SearchEngine,
        },
    };
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
}
</style>
