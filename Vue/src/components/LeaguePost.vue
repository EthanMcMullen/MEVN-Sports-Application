<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">


  <form>
          <div class="columns">
              <div class="column">
                  <label class="label">Sportname</label>
                  <input class="input" type="text" id="name" placeholder="Eg. Basketball" v-model="league.name">
              </div>
              <div class="column">
                <label class="label">Gender</label>
                <div class="select is-fullwidth">
                    <select v-model="league.gender">
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="">CO-ED</option>
                    </select>
                </div>
            </div>
              <div class="column">
                  <label class="label">Age</label>
                  <input class="input" type="text" id="age" placeholder="U20, Senior ext." v-model="league.age">
              </div>
              <div class="column">
                  <label class="label">Division</label>
                  <input class="input" type="number" id="age" placeholder="Enter Division 0 = none" v-model="league.division">
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
          league : {name:'', gender:'', age:'', division:''}
      }
  }, methods: {
      async addToAPI(){
        if (!this.league.name || !this.league.age) {
            alert('Please fill in all fields before submitting.');
            return;
        }
        let newLeague = {
            name : this.league.name,
            gender : this.league.gender,
            age : this.league.age,
            division : this.league.division
        }
        let divisionString;
        let genderString;
        if (!this.league.division) {divisionString = ""} else {divisionString = (" D" + newLeague.division)}
        if(!this.league.gender) {genderString = ""} else {genderString = (" " + newLeague.gender)}
        let LeagueName = (newLeague.age + genderString + " " + newLeague.name + divisionString)
        console.log(newLeague)
        const resp = await axios.post('http://localhost:3000/api/addleagues', {name : LeagueName}, 
        {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        console.log(resp.data)
        location.reload();
    }
  } 
}
</script>