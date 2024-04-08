<template>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">


    <form>
            <div class="columns">
                <div class="column">
                    <label class="label">Team Name</label>
                    <input class="input" type="text" id="name" placeholder="Eg. U20 Basketball D2" v-model="team.team_name">
                </div>
                <div class="column">
                    <label class="label">Division</label>
                    <input class="input" type="number" id="date" placeholder="D1/D2?D3" v-model="team.division">
                </div>
                <div class="column">
                    <label class="label">Team Discription</label>
                    <input class="input" type="number" id="time" placeholder="" v-model="team.description">
                </div>
            </div>
    <button class="button button-large full-width is-primary" type="button" @click="addToAPI">Submit</button>
</form>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    data() {
        return {
            team : {team_name:'', division:'', description:''}
        }
    }, methods: {
        addToAPI(){
            let newTeam = {
                team_name : this.team.team_name,
                division : this.team.division,
                description : this.team.description,
            }

            console.log(newTeam)
            axios.post('http://localhost:3000/api/addteams', {
                name : newTeam.team_name,
                division : newTeam.division,
                description : this.team.description
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })

        }
    }
    
}
</script>