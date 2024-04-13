<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <div>
    <div class="select">
      <select v-model="selectedLeague" @change="fetchTeams">
        <option v-for="league in leagues" :key="league.id" :value="league.name">{{ league.name }}</option>
      </select>
    </div>

    <div v-if="teams.length" class="select">
      <select v-model="selectedTeam">
        <option v-for="team in teams" :key="team.id" :value="team.name">{{ team.name }}</option>
      </select>
    </div>
      
    <button class="button is-primary" @click="fetchGames">Submit</button>

    <button v-if="selectedTeam" class="button is-danger" @click="deleteTeam(selectedTeam)">Delete Team?</button>

    <button v-if="selectedLeague" class="button is-danger" @click="deleteLeague(selectedLeague)">Delete League?</button>

    <table class="table is-fullwidth is-hoverable" v-if="games.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Opposing Team</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id" @click="openDetails(game)">
          <td>{{ game.name }}</td>
          <td>{{ game.date }}</td>
          <td>{{ game.time }}</td>
          <td>{{ game.location }}</td>
          <td>{{ game.opposingTeam }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedGame">
      <div class="box">
        <p>Name: {{ selectedGame.name }}</p>
        <p>Date: {{ selectedGame.date }}</p>
        <p>Time: {{ selectedGame.time }}</p>
        <p>Location: {{ selectedGame.location }}</p>
        <p>Opposing Team: {{ selectedGame.opposingTeam }}</p>
        <button class="button button-large full-width is-primary" type="button" @click="deleteGame(selectedGame)">Delete Game?</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedLeague: '',
      selectedTeam: '',
      leagues: [],
      teams: [],
      games: [],
      selectedGame: null
    };
  },
  methods: {
    async fetchLeagues() {
      const resp = await axios.get('http://localhost:3000/api/leagues');
      this.leagues = resp.data;
    },
    async fetchTeams() {
      const resp = await axios.get(`http://localhost:3000/api/${this.selectedLeague}/teams`);
      this.teams = resp.data;
    },
    async fetchGames() {
      const resp = await axios.get(`http://localhost:3000/api/${this.selectedTeam}/games`);
      this.games = resp.data;
    },
    openDetails(game) {
      this.selectedGame = game;
    },
    async deleteGame(game) {
      try {
        const resp = await axios.delete(`http://localhost:3000/api/deletegames/${this.selectedGame.id}`);
        location.reload();
        console.log(resp)
      } catch (err) {
        console.log(err)
      }
    }, async deleteTeam(teamName) {
      try {
        await axios.delete(`http://localhost:3000/api/${teamName}/${this.selectedLeague}/deleteteams`);

        for (const game of this.games) {
          if (game.name === teamName && game.name === this.selectedLeague) {
            await this.deleteGame(game);
          }
        }

        location.reload();
      } catch (err) {
        console.log(err);
      }
    },  async deleteLeague(leagueName) {
      try {
        await axios.delete(`http://localhost:3000/api/${encodeURIComponent(leagueName)}/deleteleagues`);

        for (const team of this.teams) {
          if (team.league === leagueName) {
            await this.deleteTeam(team.name);
          }
        }

        location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.fetchLeagues();
  }
};
</script>

<style>
.table tbody tr:hover {
  background-color: #ff0000;
  color: #0b5c2480;
}
</style>
