var beats = [
    {
        "lengths": [
            1,
            2,
            1
        ],
        "rests": [
            false,
            false,
            true
        ],
        "name": "teh_tea_seh"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            false,
            true,
            false,
            true
        ],
        "name": "teh_seh_teh_seh"
    },
    {
        "lengths": [
            1,
            1,
            2
        ],
        "rests": [
            false,
            true,
            false
        ],
        "name": "teh_seh_tea"
    },
    {
        "lengths": [
            1,
            1,
            2
        ],
        "rests": [
            false,
            true,
            true
        ],
        "name": "teh_seh_sea"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            false,
            true,
            false,
            false
        ],
        "name": "teh_seh_ticka"
    },
    {
        "lengths": [
            1,
            2,
            1
        ],
        "rests": [
            false,
            true,
            false
        ],
        "name": "teh_sea_teh"
    },
    {
        "lengths": [
            1,
            2,
            1
        ],
        "rests": [
            false,
            true,
            true
        ],
        "name": "teh_sea_seh"
    },
    {
        "lengths": [
            2,
            1,
            1
        ],
        "rests": [
            false,
            false,
            true
        ],
        "name": "tea_teh_seh"
    },
    {
        "lengths": [
            2,
            2
        ],
        "rests": [
            false,
            false
        ],
        "name": "tea_tea"
    },
    {
        "lengths": [
            2,
            1,
            1
        ],
        "rests": [
            false,
            true,
            false
        ],
        "name": "tea_seh_teh"
    },
    {
        "lengths": [
            2,
            2
        ],
        "rests": [
            false,
            true
        ],
        "name": "tea_sea"
    },
    {
        "lengths": [
            2,
            1,
            1
        ],
        "rests": [
            false,
            false,
            false
        ],
        "name": "tea_ticka"
    },
    {
        "lengths": [
            1,
            1,
            2
        ],
        "rests": [
            true,
            false,
            false
        ],
        "name": "seh_teh_tea"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            true,
            false,
            true,
            false
        ],
        "name": "seh_teh_seh_teh"
    },
    {
        "lengths": [
            1,
            1,
            2
        ],
        "rests": [
            true,
            false,
            true
        ],
        "name": "seh_teh_sea"
    },
    {
        "lengths": [
            1,
            2,
            1
        ],
        "rests": [
            true,
            false,
            false
        ],
        "name": "seh_tea_teh"
    },
    {
        "lengths": [
            1,
            2,
            1
        ],
        "rests": [
            true,
            false,
            true
        ],
        "name": "seh_tea_seh"
    },
    {
        "lengths": [
            1,
            2,
            1
        ],
        "rests": [
            true,
            true,
            false
        ],
        "name": "seh_sea_teh"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            true,
            false,
            false,
            false
        ],
        "name": "seh_ticka_teh"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            true,
            false,
            false,
            true
        ],
        "name": "seh_ticka_seh"
    },
    {
        "lengths": [
            2,
            1,
            1
        ],
        "rests": [
            true,
            false,
            true
        ],
        "name": "sea_teh_seh"
    },
    {
        "lengths": [
            2,
            2
        ],
        "rests": [
            true,
            false
        ],
        "name": "sea_tea"
    },
    {
        "lengths": [
            2,
            1,
            1
        ],
        "rests": [
            true,
            true,
            false
        ],
        "name": "sea_seh_teh"
    },
    {
        "lengths": [
            2,
            1,
            1
        ],
        "rests": [
            true,
            false,
            false
        ],
        "name": "sea_ticka"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            false,
            false,
            false,
            true
        ],
        "name": "ticka_teh_seh"
    },
    {
        "lengths": [
            1,
            1,
            2
        ],
        "rests": [
            false,
            false,
            false
        ],
        "name": "ticka_tea"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            false,
            false,
            true,
            false
        ],
        "name": "ticka_seh_teh"
    },
    {
        "lengths": [
            1,
            1,
            2
        ],
        "rests": [
            false,
            false,
            true
        ],
        "name": "ticka_sea"
    },
    {
        "lengths": [
            1,
            1,
            1,
            1
        ],
        "rests": [
            false,
            false,
            false,
            false
        ],
        "name": "ticka_ticka"
    }
]

var VEXTAB_USE_SVG = true


function main() {
  populateWords();
}

function populateWords() {
  var container = $('div.vex-container');

  for(var i = 0; i < beats.length; i++) {
    // var note = generateNote(words[i],nums[i]);
    // container.append(note);
    var beat = beats[i],
        name = beat["name"],
        lengths = beat["lengths"],
        rests = beat["rests"];

    var vex = generateVex(name,lengths,rests);
    container.append(vex);
  }
}

// TODO: Add support for rests
function generateVex(name,lengths,rests) {
  var opener = '<div class="' + name + ' vex-tabdiv">\noptions scale=1.5 width=100\ntabstave notation=true tablature=false clef=none\n',
      closer = '\n</div>';
  var notation = 'notes ';
  for(var i = 0; i < lengths.length; i++) {
    switch(lengths[i]) {
      case 1:
        notation += ':16';
        break;
      case 2:
        notation += ':8';
        break;
      case 3:
        notation += ':8d';
        break;
      default:
        notation += ':q'
    }

    if(i != 0)
      notation += ':'
    if(i != lengths.length - 1)
      notation += ' C- ';
    else
      notation += ' C ';
  }

  notation += ' / 4'

  return opener + notation + closer + '<br />' + name + '<br />' + notation;
}

function generateNote(word_name,lengths) {
  // var word_name = words[index];
  // var lengths = nums[index];
  console.log(word_name);
  console.log(lengths);

  // First make the container
  var opener = '<span class="barred note" word="' + word_name + '">',
      closer = '</span>',
      bar_classes = ["one","two","three"];

  if(lengths.length == 1 && lengths[0] == 4) {
    return '<span class="note" word="' + word_name + '"></span>';
  }

  subnotes = ''
  for(var i = 0; i < lengths.length; i++) {
    var note_length = lengths[i],
      note_class = bar_classes[note_length - 1];
    subnotes += '<span class="' + note_class;
    if(i == 0)
      subnotes += ' left';
    else if(note_length == 1 && i == lengths.length - 1)
      subnotes += ' right';
    else if(note_length == 1)
      subnotes += ' mid';
    else
      subnotes += ' right';
    subnotes += '"></span>'
  }

  return opener + subnotes + closer
}

$(document).ready(main);