<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <div>
    <div class="columns">
      <div class="column is-one-quarter" style="border-right: 1px solid #ccc; padding-right: 20px;">
        <div class="section">
          <div class="field">
            <label class="label">Select League:</label>
            <div class="control">
              <div class="select">
                <select v-model="selectedLeague" @change="fetchTeams">
                  <option v-for="league in leagues" :key="league.id" :value="league.name">{{ league.name }}</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="teams.length" class="field">
            <label class="label">Select Team:</label>
            <div class="control">
              <div class="select">
                <select v-model="selectedTeam">
                  <option v-for="team in teams" :key="team.id" :value="team.name">{{ team.name }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary" @click="toggleAdvancedFiltering">Advanced Filtering</button>
            </div>
          </div>

          <div v-if="showAdvancedFiltering" class="field">
            <label class="label">Date Range:</label>
            <div class="control">
              <input type="date" v-model="startDate" class="input">
            </div>
          </div>
          
          <div v-if="showAdvancedFiltering" class="field">
            <label class="label">End Date:</label>
            <div class="control">
              <input type="date" v-model="endDate" class="input">
            </div>
          </div>


          <div v-if="showAdvancedFiltering" class="field">
            <label class="label">Event Type:</label>
            <div class="control">
              <div class="select">
                <select v-model="eventType">
                  <option value="All">All</option>
                  <option value="Game">Game</option>
                  <option value="Practice">Practice</option>
                  <option value="Tournament">Tournament</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field" style="padding-top: 20px;">
            <div class="control">
              <button v-if="selectedTeam" class="button is-danger" style="padding: 10px 20px; margin-bottom: 10px;" @click="deleteTeam(selectedTeam)">Delete Team?</button>
              <button v-if="selectedLeague" class="button is-danger" style="padding: 10px 20px; margin-bottom: 10px;" @click="deleteLeague(selectedLeague)">Delete League?</button>
              <button class="button is-primary" style="padding: 10px 20px; margin-bottom: 10px;" @click="fetchGames">Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <table class="table is-fullwidth is-hoverable" v-if="games.length">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Event Type</th>
              <th>Opposing Team</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in games" :key="game.id" @click="openDetails(game)">
              <td>{{ game.name }}</td>
              <td>{{ game.date }}</td>
              <td>{{ game.time }}</td>
              <td>{{ game.location }}</td>
              <td>{{ game.gameType }}</td>
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
            <p>Description: {{ selectedGame.description }}</p>
            <p>Opposing Team: {{ selectedGame.opposingTeam }}</p>
            <button class="button button-large full-width is-primary" type="button" @click="deleteGame(selectedGame)">Delete Game?</button>
          </div>
        </div>
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
      selectedGame: null,
      showAdvancedFiltering: false,
      startDate: '',
      endDate: '',
      eventType: ''
    };
  },
  methods: {
    toggleAdvancedFiltering() {
      this.showAdvancedFiltering = !this.showAdvancedFiltering;
    },
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
      this.originalGames = resp.data
      this.filterGames(); // Filter games after fetching
    },
    filterGames() {
      let filteredGames = this.games.filter(game => {
        let matchDate = true;
        let matchType = true

        if (this.startDate && this.endDate) {
          matchDate = new Date(game.date) >= new Date(this.startDate) && new Date(game.date) <= new Date(this.endDate);
        }

        if (this.eventType) {
          if (this.eventType === 'All') {
            matchType = true;
          } else {
            console.log(game.gameType)
            console.log(this.eventType)
            matchType = game.gameType === this.eventType;
          }
    }
        return matchDate && matchType
      })
      this.games = filteredGames;
    },
    openDetails(game) {
      this.selectedGame = game;
    },
    async deleteGame(deletedGame) {
      try {
        const resp = await axios.delete(`http://localhost:3000/api/deletegames/${this.deletedGame.id}`);
        location.reload();
        console.log(resp);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTeam(teamName) {
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
    },
    async deleteLeague(leagueName) {
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
