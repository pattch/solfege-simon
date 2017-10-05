var words = [
    "ta_ah_ah_ah",
    "ta_ah",
    "sa_ah_ah_ah",
    "sa_ah",
    "ta",
    "sa",
    "tim_ka",
    "ka_tim",
    "sing_co_pa",
    "teh_tea_seh",
    "teh_seh_teh_seh",
    "teh_seh_tea",
    "teh_seh_sea",
    "teh_seh_ticka",
    "teh_sea_teh",
    "teh_sea_seh",
    "tea_teh_seh",
    "tea_tea",
    "tea_seh_teh",
    "tea_sea",
    "tea_ticka",
    "seh_teh_tea",
    "seh_teh_seh_teh",
    "seh_teh_sea",
    "seh_tea_teh",
    "seh_tea_seh",
    "seh_sea_teh",
    "seh_ticka_teh",
    "seh_ticka_seh",
    "sea_teh_seh",
    "sea_tea",
    "sea_seh_teh",
    "sea_ticka",
    "ticka_teh_seh",
    "ticka_tea",
    "ticka_seh_teh",
    "ticka_sea",
    "ticka_ticka"
];
var nums = [
    [
        4
    ],
    [
        4
    ],
    [
        4
    ],
    [
        4
    ],
    [
        4
    ],
    [
        4
    ],
    [
        3,
        1
    ],
    [
        1,
        3
    ],
    [
        1,
        2,
        1
    ],
    [
        1,
        2,
        1
    ],
    [
        1,
        1,
        1,
        1
    ],
    [
        1,
        1,
        2
    ],
    [
        1,
        1,
        2
    ],
    [
        1,
        1,
        1,
        1
    ],
    [
        1,
        2,
        1
    ],
    [
        1,
        2,
        1
    ],
    [
        2,
        1,
        1
    ],
    [
        2,
        2
    ],
    [
        2,
        1,
        1
    ],
    [
        2,
        2
    ],
    [
        2,
        1,
        1
    ],
    [
        1,
        1,
        2
    ],
    [
        1,
        1,
        1,
        1
    ],
    [
        1,
        1,
        2
    ],
    [
        1,
        2,
        1
    ],
    [
        1,
        2,
        1
    ],
    [
        1,
        2,
        1
    ],
    [
        1,
        1,
        1,
        1
    ],
    [
        1,
        1,
        1,
        1
    ],
    [
        2,
        1,
        1
    ],
    [
        2,
        2
    ],
    [
        2,
        1,
        1
    ],
    [
        2,
        1,
        1
    ],
    [
        1,
        1,
        1,
        1
    ],
    [
        1,
        1,
        2
    ],
    [
        1,
        1,
        1,
        1
    ],
    [
        1,
        1,
        2
    ],
    [
        1,
        1,
        1,
        1
    ]
];
var VEXTAB_USE_SVG = true


function main() {
  populateWords();
}

function populateWords() {
  var container = $('div.vex-container');
  if(words.length != nums.length) {
    console.log("ERROR! WORD LIST IS NOT THE SAME SIZE AS NUMBERS");
    return;
  }

  for(var i = 0; i < words.length; i++) {
    // var note = generateNote(words[i],nums[i]);
    // container.append(note);
    var vex = generateVex(words[i],nums[i]);
    container.append(vex);
  }
}

// TODO: Add support for rests
function generateVex(wordname,lengths) {
  var opener = '<div class="' + wordname + ' vex-tabdiv">\noptions scale=1.5 width=100\ntabstave notation=true tablature=false clef=none\n',
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

  return notation + opener + notation + closer;
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