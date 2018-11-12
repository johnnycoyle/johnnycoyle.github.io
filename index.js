// let firstNameSchema =
// `
// title 1,
// mouthSounds .5,
// funnyWords 1
// *
// mouthSounds .09
// funnyFirstNames 1
// *
// mouthSounds .05,
// funnyFirstNames 1
// *
// funnyFirstNames 1
// *
// mouthSounds .09
// funnyFirstNames 1
// *
// funnyFirstNames 1
// innerPreposition .2,
// `

let firstNameSchema =
`
title .5,
mouthSounds .5,
funnyWords .5
*
funnyWords 1,
mouthSounds .09
*
mouthSounds .05,
funnyFirstNames 1
*
funnyFirstNames 1
*
mouthSounds .09
funnyFirstNames 1
*
mouthSounds .01,
mouthSounds .05,
funnyWords 1,
innerPreposition .2,
mouthSounds .05,
mouthSounds .05
`

// const lastNameSchema =
// `
// lastNameLeads .1,
// funnyWords 1,
// lastNameStems .7,
// *
// lastNameLeads .1,
// funnyWords 1,
// lastNameStems .5
// *
// lastNameLeads .2,
// funnyWords .9,
// lastNameStems .7
// *
// lastNameLeads .2,
// funnyWords 1
// *
// funnyWords 1,
// lastNameStems .7
// `
const lastNameSchema =
`
lastNameLeads .1,
mouthSounds .2,
funnyWords 1,
lastNameStems .7,
*
lastNameLeads .1,
funnyWords 1,
mouthSounds .5,
lastNameStems .5
*
lastNameLeads .2,
funnyWords .9,
lastNameStems .7
*
lastNameLeads .2,
funnyWords 1
*
funnyWords 1,
lastNameStems .7
`

const dictionary = {
  lastNameStems: `able,ade,ance,anga,ango,ant,ard,ary,bell,berg,berger,bin,doom,ell,esque,ette,gerius,gin,gon,good,hands,ingle,ingo,ins,inson,ius,kins,lee,man,more,oni,s,sen,son,stein,tits,ton,ton,well,zan,zap,bone,worth,ster,alita,lita,-Esquire`.split(','),
  lastNameLeads:  `Mac,Mc,Van,Von,Fitz`.split(','), //NOTE: last name leads need to start with uppercase letter!
  innerPreposition: '-of-house-,-Savior-of-,-but-my-friends-call-me-,-destroyer-of-,-the-,pride-of-,-"The-#"-'.split(','),
  mouthSounds: `bing,bla,bla,blo,clu,ding,dong,doo,du,fla,flan,flo,flu,ga,gla,glo,glu,go,gua,ja,koon,pa,pla,plu,poo,pu,sing,spa,tan,vip,wan,win,wo,wu,ya,yo,za,zing,zip,zoo,bo`.split(','),
  funnyWords: `babbly,badmash,basket,baskets,bawbee,beffudle,benthos,bergle,berry,bibble,blabber,blanky,blemer,blender,blorp,blubber,bob,bobsy,bobul,boobly,boot,borb,brawl,brouha,bud,bum,bumber,bupp,butter,chud,claggy,clapper,clog,cog,colly,cookie,cool,cork,cringle,crum,dang,diddly,dingle,dollop,dongle,doo,doodle,doodle,doot,doozy,duck,dum,dunka,fang,faucet,finagle,fire,flake,flibber,flummox,flutter,fool,fork,gargoyle,gibbet,giggle,goat,gobbly,goggle,googly,grit,gubbels,gubbin,hebede,hingle,hodge,hullaballoo,koo,lamp,lolly,malarkey,mob,mortgage,mud,mum,pants,peel,peepaw,penis,piddly,pimp,pinto,podge,pood,poodle,poot,pork,pringle,pud,pudge,pum,puzzle,quack,quip,quirk,rough,salami,satchel,screw,shackle,shoe,shrubbery,smog,snap,snicker,snolly,snoot,snuggle,sponge,spoon,spranx,spunk,squee,squeegee,squelch,stool,stud,squash,tang,thud,thwack,tingle,tinkle,twirly,wabbit,warp,winkle,wobbles,xertz,yahoo,couch,diaper,quibble,dibble,snivle,snart,sack,boyo,sniffle,nipple,old,beard,skeleton`.split(','),
  funnyFirstNames:'abby,abernathy,abigail,andreas,banks,bear,bella,benedict,betty,bill,billy,blitz,bobbie,bong,briar,brick,brock,butch,buzz,carol,cinnamon,cleatus,constance,creamy,cricket,dean,diane,dick,dimitri,donald,dougal,draco,dudley,elmer,emerald,frank,fritz,gail,gerald,gertie,gilly,granger,guy,hank,harry,helen,hester,icarus,isabel,javier,jaworski,jeeves,jesus,johnny,katie,kendo,kim,kips,kitty,love,mary,maximilian,maxwell,melvin,mila,miracle,norman,opal,orpheus,pendragon,phoebe,pierre,quentin,quest,ramsey,richard,roberta,rock,romy,ronald,sal,sally,saul,shakespeare,smooth,spicy,steve,tank,theodore,tiffany,tim,timmy,tina,triss,trixie,turner,velvet,wally,windy,wonka,wyatt,tuna,panda,delicious,hallelujah,shaka,tuesday,croissant,tchaikovsky,furious,puddy,smut,moist,flesh,buffy'.split(','),
  title: 'Dr.,Mr.,Ms.,Count,Sir,Madam,Lady,Mrs.,Your-Majesty,The-Royal-#,The-Fabulous,Pope,Lord,Duke,Duchess,Viscount,His-Holiness,Admiral,General,The-Great-,Fuckin\',Senor,Senorita,Senora,Chancellor,Vice-Chancellor,Elder,His-Grace,His-Most-Eminent-Highness,Serenity,Khaleesi,Professor,Proffesora,Chairman'.split(','),
  fonts: 'Hi Melody,Indie Flower,Shadows Into Light,Gaegu,Neucha,Nanum Brush Script,Caveat,Amatic SC,East Sea Dokdo'.split(',')
}

const shuffleSort = arr => {
  let placeholder, randomIndex
  arr.forEach((e, i) => {
    randomIndex = Math.floor(Math.random() * arr.length);
    placeholder = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = placeholder;
  });
  return arr;
};

const dictionaryBase = JSON.parse(JSON.stringify(dictionary));

Object.keys(dictionary).forEach(key => dictionary[key] = shuffleSort(dictionary[key]));

const getEl = (key) => 
  key === 'title'
  ? dictionary[key].length ? dictionary[key].pop() + ' ' : refill(key)
  : dictionary[key].length ? dictionary[key].pop() : refill(key);

const refill = key => shuffleSort((dictionary[key] = dictionaryBase[key].slice()) && dictionary[key]).pop();

const formatText = word => word[0] === undefined ? '' : word[0].toUpperCase() + word.substring(1);

const buildName = () => {
  let name = '' + getFirstName() + ' ' + getLastName();
  dictionaryBase.lastNameLeads.forEach(lead => {
    if (name.includes(lead)) {
      let index = name.indexOf(lead);
      let wordIndex = index + lead.length;
      name = name.substring(0, wordIndex) + name[wordIndex].toUpperCase() + name.substring(wordIndex + 1);
    }
  })
  return name;
}

const buildWord = (...args) => {
  let str = '';
  args.forEach(e => str += Math.random() < e[1] ? getEl(e[0]) : '' );
  if (str.includes(' ')) {
    let strArr = str.split(' ');
    strArr[0] = formatText(sanitizeRunOnVowels(strArr[0]));
    strArr[1] = formatText(sanitizeRunOnVowels(strArr[1]));
    str = strArr.join(' ');
  } else {
    str = formatText(sanitizeRunOnVowels(str));
  }
  return checkForNickname(str);
}

const importSchema = schema => schema.replace(/\n/g, '').split('*').map(e => e.split(',').map(el => el.split(' ')));

const firstNameBuilds = importSchema(firstNameSchema);

const lastNameBuilds = importSchema(lastNameSchema);

const getFirstName = () => buildWord(...firstNameBuilds[Math.floor(Math.random()*firstNameBuilds.length)]);

const getLastName = () => buildWord(...lastNameBuilds[Math.floor(Math.random()*lastNameBuilds.length)]);

const getRandomRotationValue = () => Math.floor(Math.random() * 4) * (Math.random() < .5 ? 1 : -1);

const checkForNickname= word => {
  if (word.includes('#')) {
    let index = word.indexOf('#');
    let arr = word.split('#');
    let nickname = dictionary.funnyWords[Math.floor(Math.random() * dictionary.funnyWords.length)];
    let newArr = [ arr[0], formatText(nickname), arr[1]];
    return newArr.join(' ');
  }
  return word;
}

const sanitizeRunOnVowels = inputWord => {
  let word = inputWord;
  if (word.includes(' ')) {
    word = word.split(' ')[1];
    if (word[0] === ' ') {
      word = word.substring(1);
    }
  }
  if (dictionary.funnyWords.includes(word)) return word
  if (dictionary.funnyFirstNames.includes(word)) return word;
  if (inputWord.includes(' ')) {
    newWord = inputWord.split(' ');
    newWord[1] = word;
    word = newWord.join(' ');
  }
  const vowels = ['a','e','i','o','u'];
	let returnWord = '',
	    startIndex = 0,
	    vowelsBackToBack = 0;
	word.split('').map((letter, i) => {
		if (vowels.includes(letter)) {
			vowelsBackToBack++;
			if (vowelsBackToBack === 1) {
			  startIndex = i;
      }
		} else vowelsBackToBack = 0;

		if (vowelsBackToBack > 2) {
      let sub = word.substring(startIndex, startIndex  + 3);
      if (sub == 'iou' || sub == 'uee') {

      } else {
        console.log('found a shitty word:', word);
        returnWord = word.substring(0, startIndex + 1) + word.substring(i + 1);
        if (returnWord.includes(' ')) 
          returnWord = formatText(returnWord.replace(' ', '').toLowerCase());
        console.log('new word:', returnWord);
      }
    }
	});
	if (returnWord === '') return formatText(word);
	return formatText(returnWord);
};


  let currName;

$(document).ready(() => {
  const nameContainer = $('#text');
  const headerTitle = $('.header-title');
  const nameTag = $('#name-tag');


  let randomRotationValue, rotationIsNegative, font, name, fontSize;
  handleAction = () => {

    nameTag.addClass('animate');

    nameContainer.fadeOut(150, () => {
      name = buildName();
      currName = name;
      if (name.length < 3) {
        handleAction();
        return;
      }
      font = getEl('fonts');

      name.length > 15 
        ? fontSize = '4.5vw'
        : fontSize = '6vw'
      
      randomRotationValue = getRandomRotationValue();

      name = name.includes('-')
        ? name.replace(/-/gi, ' ')
        : name

      nameContainer
        .text(name)
        .css({
          'font-family': font,
          'font-size': fontSize,
          'transform': `rotate(${randomRotationValue}deg)`
        })
        .fadeIn()
        responsiveVoice.speak(currName, "UK English Male", {rate: .75});
    });
    setTimeout(() => nameTag.removeClass('animate'), 150);
  }

  $('#name-tag').on('click', () => { 
    handleAction();
  });
  $(document).keypress(function(e) {
    if(e.which == 13) {
        handleAction();
    }
  });
  $('#button').on('click', () => {
    responsiveVoice.speak(currName, "UK English Male", {rate: .45});
  })

  $(document)
});




