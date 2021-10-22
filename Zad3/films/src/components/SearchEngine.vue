<template>
  <div class="container">
    <h2>Baza filmów</h2>
    <form>
      <div class="form-group">
        <label>Tytuł</label>
        <input type="text" class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu"/>
      </div>

      <div class="form-group" row>
        <label>Rok produkcji od:</label>
        <input type="text" class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019" />
      </div>

      <div class="form-group" row>
        <label>Rok produkcji do:</label>
        <input type="text" class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019" />
      </div>

      <div class="form-group">
        <label>Obsada</label>
        <input type="text" class="form-control" placeholder="Imię i nazwisko" />
      </div>

      <div class="form-group">
        <input type="button" class="btn btn-info" style="margin-top: 20px; width: 100%; color: white;" value="Szukaj" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchEngine",
};
</script>

<style scoped></style>
