<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">


<form>
                <label class="label">Team Name</label>
                <input class="input" type="text" id="name" placeholder="Eg. Bayviewglen" v-model="team.team_name">
                <br><br><br>
                <label class="label">League</label>
                <div class="select is-fullwidth">
                <select v-model="team.league">
                    <option v-for="league in leagues" :key="league.id" :value="league.name">{{ league.name }}</option>
                </select>
                </div>
                <br><br><br>
2.
</form>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
data() {
    return {
        team : {team_name:'', division:'', description:'',league:''},
        leagues: [],
        teams: []
    }
}, methods: {
    async addToAPI(){
        let newTeam = {
            team_name : this.team.team_name,
            description : this.team.description,
            league : this.team.league
        }

            let teamExists = false;

            this.teams.forEach(team => {
                if (team.name === newTeam.team_name && team.league === newTeam.league) {
                    teamExists = true;
                    return;
                }
            });

            if (teamExists) {
                //alert(`${newTeam.team_name} in ${newTeam.league} has already been created`);
                return;
            }

          
        console.log(newTeam)
        const resp = await axios.post('https://mevn-sports-application2.onrender.com/api/addteams', {
            name : newTeam.team_name,
            division : newTeam.division,
            description : this.team.description,
            league : newTeam.league
        }, 
        {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        console.log(resp.data)
        location.reload();
    }
},
async mounted() {
    try {
        const resp = await axios.get('https://mevn-sports-application2.onrender.com/api/leagues');
        this.leagues = resp.data;
    } catch (error) {
        console.error(error);
    }

    try {
        const response = await axios.get('https://mevn-sports-application2.onrender.com/api/teams');
        this.teams = response.data;
    } catch (error) {
        console.error(error);
    }
    } 
}
</script>