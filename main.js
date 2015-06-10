//variables
function Game() { 
	this.playerlvl = 1;
	this.exp = 1;
	this.skillpts = 0;
    this.health = 100;
	this.maxhealth = 100;
    this.attack = 30;
    this.mana = 100;
	this.maxmana = 100;
	this.gold = 0;
	this.state = 0; //0 = rest, 1 = fight
	this.rubies = 10;
	this.sapphires = 0;
	this.emeralds = 0;
	this.diamonds = 0;
	this.dungeonlvl = 1;
	this.maxdungeonlvl = 1;
	
	this.tempattack = 0;
	
//weapon vars
	this.weapon_type=null;
	this.weapon_name="";
	this.weapon_stat1=null;
	this.weapon_stat1value=null;
	this.weapon_stat2=null;
	this.weapon_stat2value=null;
	this.weapon_statname="";
	
}  
var game = new Game();
var defeated = 0;

//generate enemy
var enemy = {
	type:null,
	name:"",
	scale:null,
	health:null,
	attack:null,
	defence:null,
	goldmin:1,
	goldmax:5,
	special:0
}
function generateenemy(){
	enemy.scale = game.dungeonlvl;
	enemy.health = 99;
	enemy.attack = 0;
	enemy.defence = 0;
	enemy.special = 0;
	var random = Math.floor((Math.random() * 10) + 1);
	
	enemy.type = Math.floor((Math.random() * 4) + 1);
	if(enemy.type == 1){
	enemy.name = "Human";
	enemy.attack = 1;	
	}
	if(enemy.type == 2){
	enemy.name = "Beast";
	enemy.health -= 50;	
	}
	if(enemy.type == 3){
	enemy.name = "Undead";
	enemy.special = 1;
	}
	if(enemy.type == 4){
	enemy.name = "Demon";
	enemy.defence = 1;	
	}
	enemy.attack += enemy.scale;
	enemy.health += enemy.scale *10;
	enemy.defence += enemy.defence *10;
	enemy.goldmin += enemy.scale;
	enemy.goldmax += enemy.scale;
}

//generate items

function craft(){
	rubies = document.getElementById("userubies").value;
	sapphires = document.getElementById("usesapphires").value;
	emeralds = document.getElementById("useemeralds").value;
	diamonds = document.getElementById("usediamonds").value;
	
	if(rubies>sapphires && rubies>emeralds && rubies>diamonds){
	game.weapon_stat2 = 1;
	}
	game.weapon_type = 1;
	name = "sword";
	game.weapon_stat1 = 1;
	game.weapon_stat1value = Math.floor(parseInt(rubies));
	game.weapon_stat2value = Math.floor(parseInt(rubies) / 2);
	if(game.weapon_stat2==1){
	game.weapon_statname = "gold bonus";
	}
	document.getElementById("weapon").innerHTML = "+"+ game.weapon_stat1value +"weapon of " + game.weapon_stat2value + game.weapon_statname;
}

//dungeon levels
function nextdungeon(){
	if(game.dungeonlvl<game.maxdungeonlvl){
		defeated = 0;
		game.dungeonlvl += 1;

		document.getElementById("dungeonlvl").innerHTML = game.dungeonlvl;
		if(game.dungeonlvl==game.maxdungeonlvl){
		document.getElementById("nextdungeon").disabled = true;		
		}
	}
}

function prevdungeon(){
	if(game.dungeonlvl >1){
		defeated = 0;
		game.dungeonlvl -= 1;
		document.getElementById("dungeonlvl").innerHTML = game.dungeonlvl;
		document.getElementById("nextdungeon").disabled = false;
		if(game.dungeonlvl==1){
		document.getElementById("previousdungeon").disabled = true;		
		}
	}
}

//spells
function spark(){
	if(game.mana >=10){
    enemy.health -= 10;
    game.mana -= 10;
    document.getElementById("enemyhp").innerHTML = enemy.health;
    document.getElementById("mana").innerHTML = game.mana;
	}
};

//abilities
function tempattack(){
	document.getElementById("tempattack").disabled = true;
    game.tempattack += 10;
    document.getElementById("attack").innerHTML = game.attack + game.tempattack;
	document.getElementById("attack").style.color = '#0b0';

	window.setTimeout(function(){
	document.getElementById("tempattack").disabled = false;
    game.tempattack -= 10;	
    document.getElementById("attack").innerHTML = game.attack + game.tempattack;	
	document.getElementById("attack").style.color = '#000';
	}, 3000);
	
};

//Change panel
function changestate(number){
	if (number == 0){
	game.state = 0;
	document.getElementById("enemypanel").style.display="none";
	document.getElementById("craftingpanel").style.display="none";
	document.getElementById("buypanel").style.display="none";
	
	} else if (number == 1){
	game.state = 1;
	document.getElementById("enemypanel").style.display="block";
	document.getElementById("enemy").style.display="block";
	document.getElementById("craftingpanel").style.display="none";
	document.getElementById("buypanel").style.display="none";
	} else if (number == 3){
	game.state = 3;
	document.getElementById("enemypanel").style.display="none";
	document.getElementById("craftingpanel").style.display="block";
	document.getElementById("buypanel").style.display="none";
	} else if (number == 4){
	game.state = 4;
	document.getElementById("enemypanel").style.display="none";
	document.getElementById("craftingpanel").style.display="none";
	document.getElementById("buypanel").style.display="block";
	}
	
	
	
}

//each second
window.setInterval(function(){
	//if fighting
	if(game.state == 1){
		document.getElementById("health").innerHTML = game.health;
		document.getElementById("mana").innerHTML = game.mana;
		document.getElementById("enemyname").innerHTML = enemy.name;		
		document.getElementById("enemyhp").innerHTML = enemy.health;
		document.getElementById("enemyatk").innerHTML = enemy.attack;	
		//regen mana
		if(game.mana < game.maxmana){
			game.mana += 1;
			document.getElementById("mana").innerHTML = game.mana;
		}
		if(enemy.health == null){
		generateenemy();
		}
		//if enemy debuffs you
		if(enemy.special == 1){
		playerdamage = game.attack + game.tempattack - 1;		
		document.getElementById("attack").style.color = '#f00';
		document.getElementById("attack").innerHTML = playerdamage;
		} else{
		playerdamage = game.attack + game.tempattack;
		document.getElementById("attack").innerHTML = playerdamage;
			if(document.getElementById("attack").style.color == '#0b0'){
			document.getElementById("attack").style.color = '#000';
			}
		}
		
		//attacking, checking buttons etc
		enemy.health -= playerdamage;
		game.health -= enemy.attack;
		if(game.dungeonlvl > 1){
		document.getElementById("previousdungeon").disabled = false;		
		}else{
		document.getElementById("previousdungeon").disabled = true;
		}
		if(game.dungeonlvl<game.maxdungeonlvl){
		document.getElementById("nextdungeon").disabled = false;	
		}else{
		document.getElementById("nextdungeon").disabled = true;
		}

		
		//if enemy is dead - rewards
		if(enemy.health <= 0){
			game.gold += Math.floor(Math.random() * (enemy.goldmax - enemy.goldmin + 1)) + enemy.goldmin;
			if(game.weapon_stat2 == 1){
			game.gold += game.weapon_stat2value;
			}
			game.rubies = game.rubies + 1;
			document.getElementById("gold").innerHTML = game.gold; 
			document.getElementById("rubies").innerHTML = game.rubies;
			game.state = 2;
			i = 3;
			
			//can you go to next dungeon level?
			defeated += 1;
			if(game.dungeonlvl==game.maxdungeonlvl && defeated==2){
			game.maxdungeonlvl += 1;
			document.getElementById("maxdungeonlvl").innerHTML = game.maxdungeonlvl;
			document.getElementById("nextdungeon").disabled = false;
			}
		}

	
	//if battle finished
	} else if(game.state == 2){
		if(game.mana < game.maxmana){
		game.mana += 1;
		document.getElementById("mana").innerHTML = game.mana;
		}
		document.getElementById("enemy").style.display="none";
		if(i>0){
			i -= 1;
			document.getElementById("defeated").innerHTML = defeated + " enemies defeated! New enemy in " + i;
		}
		if(i == 0){
		document.getElementById("defeated").innerHTML = "";		
		generateenemy();
		document.getElementById("enemy").style.display="block";
		game.state = 1;
		document.getElementById("health").innerHTML = game.health;
		document.getElementById("mana").innerHTML = game.mana;
		document.getElementById("enemyname").innerHTML = enemy.name;		
		document.getElementById("enemyhp").innerHTML = enemy.health;
		document.getElementById("enemyatk").innerHTML = enemy.attack;	
		}
	
	//if resting
	} else if(game.state == 0){
		if(game.health < game.maxhealth){
		game.health = game.health + 1;
		document.getElementById("health").innerHTML = game.health;
		}
		if(game.mana < game.maxmana){
		game.mana += 2;
		document.getElementById("mana").innerHTML = game.mana;
		}
		
	}
	
	//if crafting
	else if(game.state == 3){
	document.getElementById("userubies").setAttribute("max", game.rubies);
	
	}
	
}, 1000);

//each minute
/*
window.setInterval(function(){
manualsave();
}, 60000); 
*/

//manual save

function manualsave(){
	var mysave = JSON.stringify(game); 
	window.localStorage['game'] = mysave; 
}

//load
function loadGame(){
	var mysave = window.localStorage['game'];  
	var game = JSON.parse(mysave);
	document.getElementById("playerlvl").innerHTML = game.playerlvl;
	document.getElementById("exp").innerHTML = game.exp;
	document.getElementById("skillpts").innerHTML = game.skillpts;
	document.getElementById("health").innerHTML = game.health;
	document.getElementById("health").innerHTML = game.maxhealth;
	document.getElementById("attack").innerHTML = game.attack;	
	document.getElementById("mana").innerHTML = game.mana;	
	document.getElementById("maxmana").innerHTML = game.maxmana;	
	document.getElementById("gold").innerHTML = game.gold;
	document.getElementById("rubies").innerHTML = game.rubies;
	document.getElementById("sapphires").innerHTML = game.sapphires;
	document.getElementById("emeralds").innerHTML = game.emeralds;	
	document.getElementById("diamonds").innerHTML = game.diamonds;	
	document.getElementById("dungeonlvl").innerHTML = game.dungeonlvl;
	document.getElementById("maxdungeonlvl").innerHTML = game.maxdungeonlvl;
	document.getElementById("weapon").innerHTML = "+"+ game.weapon_stat1value +"weapon of " + game.weapon_stat2value + game.weapon_statname;
}

//delete save
function deletesave(){
localStorage.removeItem("save");
};

//startup
	document.getElementById("dungeonlvl").innerHTML = game.dungeonlvl;
	document.getElementById("maxdungeonlvl").innerHTML = game.maxdungeonlvl;

