
function randNum(num){ //number from 1 to num
    let rand = Math.floor(Math.random() * num) + 1
    return rand
}

function changeBackground(typeOne, typeTwo= undefined){
    const obj = {'normal': 'url(https://pm1.narvii.com/7243/f2fb9db8191078f72c8b98fee93155c56e6e8674r1-673-421v2_hq.jpg)','fire': 'url(https://pm1.narvii.com/7243/8ee17e7a8790303410b30a2fbcb18183fc12166er1-623-499v2_hq.jpg)','water': 'url(https://pm1.narvii.com/7243/46d5cfd672a1e2fca16c78d728e2b10cb57f7ce0r1-669-521v2_hq.jpg)','electric': 'url(https://pm1.narvii.com/7243/00eaa3cfd5033ff306b23965e1c50b31577dd464r1-647-485v2_hq.jpg)','grass': 'url(https://pm1.narvii.com/7243/0b36782d158f6da0639e38ebf94af3d5c37288c2r1-668-486v2_hq.jpg)','ice': 'url(https://pm1.narvii.com/7243/fc715e840930cac4f0577c69aa6721ff0b689b11r1-677-462v2_hq.jpg)','fighting': 'url(https://pm1.narvii.com/7243/250af9c70a9f5140d4ba66922a9f227dd0bbe885r1-731-341v2_hq.jpg)','poison': 'url(https://pm1.narvii.com/7243/b0945fed2f0cc9fa340c6e7deb851c14ddf53e30r1-575-530v2_hq.jpg)','ground': 'url(https://pm1.narvii.com/7243/10ed1c931a1b46035f01315731b1f3f70ec24f5er1-656-454v2_hq.jpg)','flying': 'url(https://i.redd.it/lhahy3f1hwgz.jpg)','psychic': 'url(https://pm1.narvii.com/7243/19a53b46a48f55a346f130092cb2c8d8fcf88af0r1-642-671v2_hq.jpg)','bug': 'url(https://pm1.narvii.com/7243/0d2736d705781ea116d08621abbfefae60a971c2r1-700-542v2_hq.jpg)','rock':'url(https://pm1.narvii.com/7243/843acea2bde21f7ae7e1f17c0da831acea46a2acr1-692-503v2_hq.jpg)','ghost': 'url(https://pm1.narvii.com/7243/1932c3243860328e1f1cd07d65e02649672380ecr1-700-444v2_hq.jpg)','dragon': 'url(https://pm1.narvii.com/7243/adcbbe4c769bbaf0858abef9625077294911804br1-593-534v2_hq.jpg)','dark': 'url(https://pm1.narvii.com/7243/0ea89cf278223e13003a6897d3091b7d99271cf6r1-688-475v2_hq.jpg)','steel': 'url(https://pm1.narvii.com/7243/bc538f6da74b633d36b48108ddd07b7a2410a2afr1-650-498v2_hq.jpg)','fairy': 'url(https://pm1.narvii.com/7243/61770aa4b0259c06cd4b1fa490007c29e27d6683r1-663-565v2_hq.jpg)'}

    
    document.documentElement.style.setProperty('--my-image',`url(./img-types/${typeOne}.jpeg)`)
    if(typeTwo)
        document.documentElement.style.setProperty('--my-image-two',`url(./img-types/${typeTwo}.jpeg)`)
    else
        document.documentElement.style.setProperty('--my-image-two', 'url(./img-types/pokeball.webp)')
}
   

async function getPoke(){
    let pokeId=randNum(898) //pokemon out of the entire list
    let typesUrl = [] //array of urls for the type of our pokemon
    let pokeMatchingTypes = [] //array of all pokemon with matching types
    let team = [] //array for our team


    //Get pokemon
    let randPok = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokeId)
    
    //add poke to team
    team.push(randPok.data.name)

    //Get array of urls and change backgrounds
    if(randPok.data.types.length==2){
        typesUrl = [randPok.data.types[0].type.url,randPok.data.types[1].type.url]
        changeBackground(randPok.data.types[0].type.name,randPok.data.types[1].type.name)
    }
    else{
        typesUrl = [randPok.data.types[0].type.url]
        changeBackground(randPok.data.types[0].type.name)
    }

    //get pokemon of matching types
    for (let url of typesUrl){
        let type = await axios.get(url)
        let matchType = type.data.pokemon
        for(let pok of matchType){
            pokeMatchingTypes.push(pok.pokemon.name)
        }
    }

    //get 5 teammates
    for(let i = 0; i<5;i++){
        let randPokIn = randNum(pokeMatchingTypes.length)-1
        team.push(pokeMatchingTypes[randPokIn])
    }
    
    return team
}


async function buttonClick(){

    let team = await getPoke()

    /*let picArr = []
    let pokOne = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ team[0])
    let pokTwo = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ team[1])
    let pokThree = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ team[2])
    let pokFour = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ team[3])
    let pokFive = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ team[4])
    let pokSix = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ team[5])*/
    //picArr = [pokOne.data.sprites.front_default,pokTwo.data.sprites.front_default,pokThree.data.sprites.front_default,pokFour.data.sprites.front_default,pokFive.data.sprites.front_default,pokSix.data.sprites.front_default]
    //console.log(picArr)*/

    //add html elements
    for(let j = 0; j<6; j++){
        let teamMem = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ team[j])
        let pic = teamMem.data.sprites.front_default
        
        let f = document.getElementById('pok-name-'+(j+1))
        f.innerHTML = `<h5>${team[j]}</h5>`
        
        let e = document.getElementById('pok-img-'+(j+1))
        e.innerHTML = `<img src=${pic}>`

    }

}


axios.get('https://pokeapi.co/api/v2/item/4').then((res)=>{
    
    let ball = res.data.sprites.default
    let e = document.getElementById('pokeball')
    e.innerHTML = `<img src=${ball} class='myimg'>`

})


