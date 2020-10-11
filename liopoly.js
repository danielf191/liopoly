var d = new Date();
var playerList = [];
var map = [];
var playerColors = {
    0: "red",
    1: "blue",
    2: "green",
    3: "yellow"
};
class Monopoly {
    constructor() {
        this.diceRoll=0;
        this.playerList = playerList; 
        this.playerList[0] = new Player("a", 0, "#de281b");
        this.playerList[1] = new Player("b", 1, "#1e24d4");
        this.playerList[2] = new Player("c", 2, "#35853a");
        this.playerList[3] = new Player("d", 3, "#dbd82c");
        this.chanceDeck = [
            //finish later
        ]

        this.communityChestDeck = [
            //finish later
        ]
        this.propertyDeck = [
            new PropertyCard('brown', 'Mediterranean Avenue', [2,10,30,90,160,250], 60),
            new PropertyCard('brown', 'Baltic Avenue', [4,20,60,180,320,450], 60),
            new PropertyCard('black', 'Reading Railroad', [4,20,60,180,320,450], 60),
            new PropertyCard('light blue', 'Oriental Avenue', [6,30,90,270,400,550], 100),
            new PropertyCard('light blue', 'Vermont Avenue', [6,30,90,270,400,550], 100),
            new PropertyCard('light blue', 'Connecticut Avenue', [8,40,100,300,450,600], 120),
            new PropertyCard('pink', 'St. Charles Avenue', [10,50,150,450,625,750], 400), 
            new PropertyCard('pink', 'States Avenue', [], 400),
            new PropertyCard('pink', 'Virginia Avenue', [], 400),
            new PropertyCard('black', 'Pennsylvania Railroad', [4,20,60,180,320,450], 60),
            new PropertyCard('orange', 'St. James Place', [], 400),
            new PropertyCard('orange', 'Tennessee Avenue', [], 400),
            new PropertyCard('orange', 'New York Avenue', [], 400),
            new PropertyCard('red', 'Kentucky Avenue', [], 400),
            new PropertyCard('red', 'Indiana Avenue', [], 400),
            new PropertyCard('red', 'Illinois Avenue', [], 400),
            new PropertyCard('yellow', 'Atlantic Avenue', [], 400),
            new PropertyCard('yellow', 'B. & O. Railroad', [], 400),
            new PropertyCard('yellow', 'Ventnor Avenue', [], 400),
            new PropertyCard('yellow', 'Marvin Gardens', [], 400),
            new PropertyCard('green', 'Pacific Avenue', [], 400),
            new PropertyCard('green', 'North Carolina Avenue', [], 400),
            new PropertyCard('green', 'Pennsylvania Avenue', [], 400),
            new PropertyCard('blue', 'Park Place', [], 400),
            new PropertyCard('blue', 'Boardwalk', [], 400),
            new PropertyCard('blue', 'Electric Company', [], 400),
            new PropertyCard('blue', 'Water Works', [], 400)
        ]; 
        map = {
            1: "go",
            2: this.propertyDeck[0],
            3: "community chest",
            4: this.propertyDeck[1],
            5: "income tax",
            6: this.propertyDeck[2],
            7: this.propertyDeck[3],
            8: "chance",
            9: this.propertyDeck[4],
            10: this.propertyDeck[5],
            11: "jail",
            12: this.propertyDeck[6],
            13: this.propertyDeck[7],
            14: this.propertyDeck[7],
            15: this.propertyDeck[8],
            16: this.propertyDeck[9],
            17: this.propertyDeck[10],
            18: "community chest",
            19: this.propertyDeck[11],
            20: this.propertyDeck[12],
            21: "free parking",
            22: this.propertyDeck[13],
            23: "chance",
            24: this.propertyDeck[14],
            25: this.propertyDeck[15],
            26: this.propertyDeck[16],
            27: this.propertyDeck[17],
            28: this.propertyDeck[18],
            29: this.propertyDeck[19],
            30: this.propertyDeck[20],
            31: "go to jail",
            32: this.propertyDeck[21],
            33: this.propertyDeck[22],
            34: "community chest",
            35: this.propertyDeck[23],
            36: this.propertyDeck[24],
            37: "chance",
            38: this.propertyDeck[25],
            39: "luxury tax",
            40: this.propertyDeck[26]
        }      
    }
    
}

var i = 0;
var secs = 10;
function timer() {
    window.setInterval(myMethod, 1000);
    
}
function myMethod() {
    if(i==4)
        i=0;
    if(secs<=0) {
        var playAgain = playerList[i].play();   
        if(! playAgain)
            i++;
        secs=10;
    }
    document.getElementById('safeTimerDisplay').innerHTML="Time Remaining: " + secs;
    secs--;
    
}

function endTurn() {
    secs = -1;
}


var info = [-1, -1];



function buyProperty() {

    //you need the player's position, id

    if(map[info[0]] instanceof PropertyCard && map[info[0]].ownerID == -1) {
        map[info[0]].ownerID=info[1];
        playerList[info[1]].balance -= map[info[0]].price;
        var pbox = document.getElementById("p" + (info[1] + 1).toString());
        var text = document.createTextNode(map[info[0]].name + "\n");
        pbox.appendChild(text);
        var strang = document.getElementById("p" + (info[1] + 1).toString()).innerText;
        var newString = strang.replace(strang.substring(4,strang.indexOf(")")), (playerList[info[1]].balance).toString());
        document.getElementById("p" + (info[1] + 1)).innerText=newString;
    }
}



class Player {
    constructor(playerName, playNumber, playerColor) {
        this.name = playerName;
        this.position = 1;
        this.properties = [];
        this.balance = 1500;
        this.playerID = playNumber;
        this.inJail = false;
        this.isTurnOver = false;
        this.originalTime = 0;
        this.color = playerColor;
    }

    

    isGameOver() {
        var count = 0;
        for(var i = 0; i < this.playerList.size; i++)
        {
            if(playerList[i].balance <= 0)
                count++;
        }
        if(count == playerList.size - 1)
            this.isGameOver = true;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    roll() {
        var die1 = this.getRandomInt(1,6);
        var die2 = this.getRandomInt(1,6); 
        console.log("die1 is " + die1);
        console.log("die2 is " + die2);
        var diceRoll = die1 + die2;
        if(!this.inJail) 
            this.position += diceRoll;
        else if(die1 == die2) {
            this.inJail = false;
            return false;
        }
        if(this.position > 40) 
        {            
            this.balance += 200;
            this.position %= 40;
        }
        return die1 == die2;      
    }

    play() {

        document.getElementById("turn").innerText = "It's Player " + (this.playerID+1) + "'s turn!";
        var prevGameTile = document.getElementsByClassName("_" + (this.position).toString() )[0];
        var list = prevGameTile.getElementsByClassName("gameSpaceDiv");
        if(list.length != 0)
          var list2 = list.getElementsByClassName("g")
        var isDouble = this.roll();
        info[0]=this.position;
        info[1]=this.playerID;
        var gameTile = document.getElementsByClassName("_" + (this.position).toString() )[0];
        var tileDiv = document.createElement("div");
        tileDiv.classList.add("gameSpaceDiv");
        var squareDiv = document.createElement("div");
        squareDiv.classList.add(playerColors[this.playerID].toString() + "Square");
        tileDiv.appendChild(squareDiv);
        gameTile.append(tileDiv);
        
        console.log("Player " + (this.playerID+1) + " started at position " + this.position);
        console.log("Player " + (this.playerID+1) + " just moved!");
        console.log("Player " + (this.playerID+1) + " is now at position " + this.position);

        return isDouble;

    }
}

class PropertyCard {
    constructor(cardColor, cardName, rentList, cardPrice, cardPosition) {
        this.color = cardColor;
        this.name = cardName;
        this.rents = rentList;
        this.price = cardPrice;
        this.position = cardPosition;
        this.ownerID = -1;
    }    
}



$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._2').hover(function(e) {
      $('div#pop-up').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#pop-up').hide();
    });
 
    $('td._2').mousemove(function(e) {
      $("div#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._4').hover(function(e) {
      $('div#baltic').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#baltic').hide();
    });
 
    $('td._4').mousemove(function(e) {
      $("div#baltic").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._6').hover(function(e) {
      $('div#reading').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#reading').hide();
    });
 
    $('td._6').mousemove(function(e) {
      $("div#reading").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._7').hover(function(e) {
      $('div#oriental').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#oriental').hide();
    });
 
    $('td._7').mousemove(function(e) {
      $("div#oriental").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._9').hover(function(e) {
      $('div#vermont').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#vermont').hide();
    });
 
    $('td._9').mousemove(function(e) {
      $("div#vermont").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._10').hover(function(e) {
      $('div#con').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#con').hide();
    });
 
    $('td._10').mousemove(function(e) {
      $("div#con").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._12').hover(function(e) {
      $('div#charles').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#charles').hide();
    });
 
    $('td._12').mousemove(function(e) {
      $("div#charles").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._14').hover(function(e) {
      $('div#states').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#states').hide();
    });
 
    $('td._14').mousemove(function(e) {
      $("div#states").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._15').hover(function(e) {
      $('div#virginia').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#virginia').hide();
    });
 
    $('td._15').mousemove(function(e) {
      $("div#virginia").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._16').hover(function(e) {
      $('div#pennroad').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#pennroad').hide();
    });
 
    $('td._16').mousemove(function(e) {
      $("div#pennroad").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
 
});
$(function() {
    var moveLeft = 20;
    var moveDown = 10;
 
    $('td._17').hover(function(e) {
      $('div#james').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
    }, function() {
      $('div#james').hide();
    });
 
    $('td._17').mousemove(function(e) {
      $("div#james").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});


$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._19').hover(function(e) {
    $('div#tennis').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#tennis').hide();
  });

  $('td._19').mousemove(function(e) {
    $("div#tennis").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._20').hover(function(e) {
    $('div#york').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#york').hide();
  });

  $('td._20').mousemove(function(e) {
    $("div#york").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._22').hover(function(e) {
    $('div#kfc').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#kfc').hide();
  });

  $('td._22').mousemove(function(e) {
    $("div#kfc").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._24').hover(function(e) {
    $('div#indiana').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#indiana').hide();
  });

  $('td._24').mousemove(function(e) {
    $("div#indiana").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._25').hover(function(e) {
    $('div#ill').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#ill').hide();
  });

  $('td._25').mousemove(function(e) {
    $("div#ill").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._26').hover(function(e) {
    $('div#bo').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#bo').hide();
  });

  $('td._26').mousemove(function(e) {
    $("div#bo").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});


$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._27').hover(function(e) {
    $('div#atl').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#atl').hide();
  });

  $('td._27').mousemove(function(e) {
    $("div#atl").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});


$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._28').hover(function(e) {
    $('div#vent').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#vent').hide();
  });

  $('td._28').mousemove(function(e) {
    $("div#vent").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._29').hover(function(e) {
    $('div#ww').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#ww').hide();
  });

  $('td._29').mousemove(function(e) {
    $("div#ww").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._13').hover(function(e) {
    $('div#eComp').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#eComp').hide();
  });

  $('td._13').mousemove(function(e) {
    $("div#eComp").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._30').hover(function(e) {
    $('div#mg').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#mg').hide();
  });

  $('td._30').mousemove(function(e) {
    $("div#mg").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._32').hover(function(e) {
    $('div#pa').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#pa').hide();
  });

  $('td._32').mousemove(function(e) {
    $("div#pa").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});





let game = new Monopoly();
timer();


  });

  $('td._28').mousemove(function(e) {
    $("div#vent").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._29').hover(function(e) {
    $('div#ww').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#ww').hide();
  });

  $('td._29').mousemove(function(e) {
    $("div#ww").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._13').hover(function(e) {
    $('div#eComp').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#eComp').hide();
  });

  $('td._13').mousemove(function(e) {
    $("div#eComp").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._30').hover(function(e) {
    $('div#mg').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#mg').hide();
  });

  $('td._30').mousemove(function(e) {
    $("div#mg").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._32').hover(function(e) {
    $('div#pa').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#pa').hide();
  });

  $('td._32').mousemove(function(e) {
    $("div#pa").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});





let game = new Monopoly();
timer();



})})})})})})})})})})})})})})})})


$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._29').hover(function(e) {
    $('div#ww').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#ww').hide();
  });

  $('td._29').mousemove(function(e) {
    $("div#ww").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._13').hover(function(e) {
    $('div#eComp').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#eComp').hide();
  });

  $('td._13').mousemove(function(e) {
    $("div#eComp").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._30').hover(function(e) {
    $('div#mg').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#mg').hide();
  });

  $('td._30').mousemove(function(e) {
    $("div#mg").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._32').hover(function(e) {
    $('div#pa').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#pa').hide();
  });

  $('td._32').mousemove(function(e) {
    $("div#pa").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._33').hover(function(e) {
    $('div#nc').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#nc').hide();
  });

  $('td._33').mousemove(function(e) {
    $("div#nc").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._35').hover(function(e) {
    $('div#penna').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#penna').hide();
  });

  $('td._35').mousemove(function(e) {
    $("div#penna").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._36').hover(function(e) {
    $('div#short').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#short').hide();
  });

  $('td._36').mousemove(function(e) {
    $("div#short").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._38').hover(function(e) {
    $('div#parkp').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#parkp').hide();
  });

  $('td._38').mousemove(function(e) {
    $("div#parkp").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});
$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('td._40').hover(function(e) {
    $('div#bw').show();
    //.css('top', e.pageY + moveDown)
    //.css('left', e.pageX + moveLeft)
    //.appendTo('body');
  }, function() {
    $('div#bw').hide();
  });

  $('td._40').mousemove(function(e) {
    $("div#bw").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});





let game = new Monopoly();
timer();



})})})})})})})})})
