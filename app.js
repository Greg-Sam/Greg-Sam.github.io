

let ranks = []

async function getRankings() {

  await axios.get(`https://us-west-2.aws.data.mongodb-api.com/app/bisergs20222-xclsi/endpoint/scores`)
    .then(async (res) => {

      ranks = res.data

      let rank = 0
      let score = 0
      let numTied = 0
      let currentScore = 0

      ranks.map(player => {
        console.log(player)
        let name = player.firstName
        let remaining = player.remaining
        let played = player.played

        score = player.points

        if (score === currentScore) {


          numTied++
        } else {
          rank = rank + numTied
          rank++
          numTied = 0
          currentScore = score
        }


        let row = document.createElement('tr')
        //change row color here
        row.className = 'table-primary'
        row.id = player.draftPlace

        row.innerHTML = `<tr class="table-dark"> 
         <td>${rank}</td>  
         <td>${name}</td>
         <td>${score}</td> 
         <td>${played}</td>
          </tr> 
          </tr>
          `

        document.getElementById('playerRow').append(row)
      })
    }
    )
    .catch(err => console.error(err))
}

getRankings()

async function populateModal(playerTeams) {
  console.log(playerTeams)
  for (let i = 0; i < playerTeams.length; i++) {
    const team = playerTeams[i];
    console.log(team)
    let teamDisplay = document.createElement('li')
    teamDisplay.innerHTML = `
  <div class == "container">
  <div class="row">
  <div class="row">
  <div class="col-1">
   ${i + 1} 
    </div>
    <div class="col-7">
     <strong>${team.team}</strong>
    </div>
    <div class="col-2">
      ${team.points}
    </div>`
    document.getElementById('teamList').append(teamDisplay)
  }
}


function openModal(playerTeams, firstName, totalPoints) {



  document.getElementById("backdrop").style.display = "block"
  document.getElementById("teamsModal").style.display = "block"
  document.getElementById("teamsModal").className += "show"
  modal.innerHTML = `
<div class="modal-dialog" role="document">
  <div class="modal-content modal-lg">
   <div class="modal-header">
            <h5 class="modal-title" id="tournamentsModalLabel" style="margin-left:auto; margin-right:auto">${firstName} - ${totalPoints} points</h5>
                
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
 
          </div>
          <div class="modal-body">
          <ul id="teamList" style="list-style-type:none;" >
          <li>
          <div class="container">
          <div class="row">
          <div class="col-2">
          <h6 style="margin-left:-1rem">Pick</h6>
          </div>
          <div class="col-7">
          <h6 style="margin-left:-2rem">Team</h6>
          </div>
          <div class="col-2">
          <h6 style="margin-left:-1rem">Points</h6>
          </div>
          
          </div>
  </div></li>
          </ul>
          </div>
   
          
      </div>
</div>
   `
  
  // document.getElementById('playerModal').append(modal)
  populateModal(playerTeams)
}

function closeModal() {
  document.getElementById("backdrop").style.display = "none"
  document.getElementById("teamsModal").style.display = "none"
  document.getElementById("teamsModal").className += document.getElementById("teamsModal").className.replace("show", "")
}
// Get the modal
var modal = document.getElementById('teamsModal');

// // When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target.class == "close") {
    closeModal()
  }
}



async function displayResults(id) {
 
  let playerId = parseInt(id)
  let player = ranks.filter(participant => participant.draftPlace === playerId)
console.log(id)

  let playerTeams = player[0].teamScores

  openModal(playerTeams, player[0].firstName, player[0].points)
}



document.addEventListener('click', event => {
  var target = event.target
  parent = target.parentElement
  if (parent.id > 0) {
  
    displayResults(parent.id)
  }

})



// async function getCountries() {
//   const selectDrop = document.getElementById('countries')
//   await axios.get('https://us-west-2.aws.data.mongodb-api.com/app/entryranks-gejyz/endpoint/menCountries')
//     .then(async (res) => {
//       let countryList = '<option>Select Country</option>'
//       let countries = res.data
//       for (let i = 0; i < countries.length; i++) {
//         const country = countries[i];
//         countryList += `<option>${country.country}</option>`
//       }
//       selectDrop.innerHTML = countryList
//     })
// }
// getCountries()

// document.getElementById("countries").onchange = changeListener;

// function changeListener() {
//   var value = this.value

//   country = value
//   if (country === 'Select Country') { country = '' }
//   path = `https://us-west-2.aws.data.mongodb-api.com/app/entryranks-gejyz/endpoint/menEntryRanking?country=${country}&page=1`
//   document.getElementById('date').innerHTML = ''
//   document.getElementById('teamRow').innerHTML = ''
//   getMenRankings(path)


// }

// function next() {
//   page = page + 1
//   path = `https://us-west-2.aws.data.mongodb-api.com/app/entryranks-gejyz/endpoint/menEntryRanking?country=${country}&page=${page}`
//   document.getElementById('date').innerHTML = ''
//   document.getElementById('teamRow').innerHTML = ''
//   getMenRankings(path)
// }

// function prev() {
//   if (page !== 1) { page = page - 1 }
//   path = `https://us-west-2.aws.data.mongodb-api.com/app/entryranks-gejyz/endpoint/menEntryRanking?country=${country}&page=${page}`
//   document.getElementById('date').innerHTML = ''
//   document.getElementById('teamRow').innerHTML = ''
//   getMenRankings(path)
// }


