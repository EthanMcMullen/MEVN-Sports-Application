    <template>
    <form>
        <div class="columns">
        <div class="column">
        <label class="label">League</label>
        <div class="select">
            <select v-model="game.league" @change="filterTeams">
            <option v-for="league in leagues" :key="league._id" :value="league.name">{{ league.name }}</option>
            </select>
        </div>
        </div>

        <div class="column">
        <label class="label">Team Name</label>
        <select class="select is-fullwidth" v-model="game.team_name">
            <option v-for="team in filteredTeams" :key="team._id" :value="team.name">{{ team.name }}</option>
        </select>
        </div>
        <div class="column">
            <label class="label">Date</label>
            <input class="input" type="date" id="date" v-model="game.date">
        </div>
        <div class="column">
            <label class="label">Time</label>
            <input class="input" type="time" id="time" v-model="game.time">
        </div>
        </div>
        <div class="columns">
        <div class="column">
            <label class="label">Description</label>
            <input class="input" type="text" id="description" v-model="game.description">
        </div>
        <div class="column">
            <label class="label">Location</label>
            <input class="input" type="text" id="location" v-model="game.location">
        </div>
        </div>
        <div class="columns">
        <div class="column">
            <label class="label">Type</label>
            <div class="select">
            <select v-model="game.type">
                <option value="Practice">Practice</option>
                <option value="Game">Game</option>
                <option value="Tournament">Tournament</option>
            </select>
            </div>
        </div>
        <div v-if="game.type === 'Game'" class="column">
            <label class="label">Opposing Team</label>
            <input class="input" type="text" id="opposingTeam" v-model="game.opposing_team">
        </div>
        </div>
        <button class="button button-large full-width is-primary" type="button" @click="addToAPI">Submit</button>
    </form>
    </template>

    <script>
    import axios from 'axios';

    export default {
    data() {
        return {
        game: { team_name: '', date: '', time: '', description: '', location: '', type: 'Practice', opposing_team: '', league: '' },
        teams: [],
        leagues: [],
        filteredTeams: []
        };
    },
        methods: {
            async addToAPI() {

                const gamesResponse = await axios.get('http://localhost:3000/api/games');
                let currHighestId = 0

                gamesResponse.data.forEach(game => {
                    if (game.id > currHighestId) {
                        currHighestId = game.id ;
                    }
                });

            let newGame = {
                id: currHighestId + 1,
                name: this.game.team_name,
                description: this.game.description,
                date: this.game.date,
                time: this.game.time,
                location: this.game.location,
                type: this.game.type,
                opposingTeam: this.game.opposing_team,
                league: this.game.league
            };

        console.log(newGame);

        const resp = await axios.post('http://localhost:3000/api/addgames', newGame, {
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        console.log(resp.data);
        location.reload();
        }, filterTeams() {
            this.filteredTeams = this.teams.filter(team => team.league === this.game.league);
        }
    },
    async mounted() {
        try {
        const response = await axios.get('http://localhost:3000/api/teams');
        this.teams = response.data;
        } catch (error) {
        console.error(error);
        }

        try {
        const resp = await axios.get('http://localhost:3000/api/leagues');
        this.leagues = resp.data;
        } catch (error) {
        console.error(error);
        }
    }
    };
    </script>

