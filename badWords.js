require('events').EventEmitter.prototype._maxListeners = 100;
var Firebase = require('firebase');
var ref = new Firebase('https://projectbird-robin.firebaseio.com');
var authData = ref.getAuth();
var request = require('request');
var async = require('async');
var chalk = require('chalk');
var listOfProfanityWords = ["4r5e","5h1t","5hit","a55","anal","anus","ar5e","arrse","arse","ass","ass-fucker","asses","assfucker","assfukka","asshole","assholes","asswhole","a_s_s","b!tch","b00bs","b17ch","b1tch","ballbag","balls","ballsack","bastard","beastial","beastiality","bellend","bestial","bestiality","bi+ch","biatch","bitch","bitcher","bitchers","bitches","bitchin","bitching","bloody","blow job","blowjob","blowjobs","boiolas","bollock","bollok","boner","boob","boobs","booobs","boooobs","booooobs","booooooobs","breasts","buceta","bugger","bum","bunny fucker","butt","butthole","buttmuch","buttplug","c0ck","c0cksucker","carpet muncher","cawk","chink","cipa","cl1t","clit","clitoris","clits","cnut","cock","cock-sucker","cockface","cockhead","cockmunch","cockmuncher","cocks","cocksuck ","cocksucked ","cocksucker","cocksucking","cocksucks ","cocksuka","cocksukka","cok","cokmuncher","coksucka","coon","cox","crap","cum","cummer","cumming","cums","cumshot","cunilingus","cunillingus","cunnilingus","cunt","cuntlick ","cuntlicker ","cuntlicking ","cunts","cyalis","cyberfuc","cyberfuck ","cyberfucked ","cyberfucker","cyberfuckers","cyberfucking ","d1ck","damn","dick","dickhead","dildo","dildos","dink","dinks","dirsa","dlck","dog-fucker","doggin","dogging","donkeyribber","doosh","duche","dyke","ejaculate","ejaculated","ejaculates ","ejaculating ","ejaculatings","ejaculation","ejakulate","f u c k","f u c k e r","f4nny","fag","fagging","faggitt","faggot","faggs","fagot","fagots","fags","fanny","fannyflaps","fannyfucker","fanyy","fatass","fcuk","fcuker","fcuking","feck","fecker","felching","fellate","fellatio","fingerfuck ","fingerfucked ","fingerfucker ","fingerfuckers","fingerfucking ","fingerfucks ","fistfuck","fistfucked ","fistfucker ","fistfuckers ","fistfucking ","fistfuckings ","fistfucks ","flange","fook","fooker","fuck","fucka","fucked","fucker","fuckers","fuckhead","fuckheads","fuckin","fucking","fuckings","fuckingshitmotherfucker","fuckme ","fucks","fuckwhit","fuckwit","fudge packer","fudgepacker","fuk","fuker","fukker","fukkin","fuks","fukwhit","fukwit","fux","fux0r","f_u_c_k","gangbang","gangbanged ","gangbangs ","gaylord","gaysex","goatse","God","god-dam","god-damned","goddamn","goddamned","hardcoresex ","hell","heshe","hoar","hoare","hoer","homo","hore","horniest","horny","hotsex","jack-off ","jackoff","jap","jerk-off ","jism","jiz ","jizm ","jizz","kawk","knob","knobead","knobed","knobend","knobhead","knobjocky","knobjokey","kock","kondum","kondums","kum","kummer","kumming","kums","kunilingus","l3i+ch","l3itch","labia","lmfao","lust","lusting","m0f0","m0fo","m45terbate","ma5terb8","ma5terbate","masochist","master-bate","masterb8","masterbat*","masterbat3","masterbate","masterbation","masterbations","masturbate","mo-fo","mof0","mofo","mothafuck","mothafucka","mothafuckas","mothafuckaz","mothafucked ","mothafucker","mothafuckers","mothafuckin","mothafucking ","mothafuckings","mothafucks","mother fucker","motherfuck","motherfucked","motherfucker","motherfuckers","motherfuckin","motherfucking","motherfuckings","motherfuckka","motherfucks","muff","mutha","muthafecker","muthafuckker","muther","mutherfucker","n1gga","n1gger","nazi","nigg3r","nigg4h","nigga","niggah","niggas","niggaz","nigger","niggers ","nob","nob jokey","nobhead","nobjocky","nobjokey","numbnuts","nutsack","orgasim ","orgasims ","orgasm","orgasms ","p0rn","pawn","pecker","penis","penisfucker","phonesex","phuck","phuk","phuked","phuking","phukked","phukking","phuks","phuq","pigfucker","pimpis","piss","pissed","pisser","pissers","pisses ","pissflaps","pissin ","pissing","pissoff ","poop","porn","porno","pornography","pornos","prick","pricks ","pron","pube","pusse","pussi","pussies","pussy","pussys ","rectum","retard","rimjaw","rimming","s hit","s.o.b.","sadist","schlong","screwing","scroat","scrote","scrotum","semen","sex","sh!+","sh!t","sh1t","shag","shagger","shaggin","shagging","shemale","shi+","shit","shitdick","shite","shited","shitey","shitfuck","shitfull","shithead","shiting","shitings","shits","shitted","shitter","shitters ","shitting","shittings","shitty ","skank","slut","sluts","smegma","smut","snatch","son-of-a-bitch","spac","spunk","s_h_i_t","t1tt1e5","t1tties","teets","teez","testical","testicle","tit","titfuck","tits","titt","tittie5","tittiefucker","titties","tittyfuck","tittywank","titwank","tosser","turd","tw4t","twat","twathead","twatty","twunt","twunter","v14gra","v1gra","vagina","viagra","vulva","w00se","wang","wank","wanker","wanky","whoar","whore","willies","willy","xrated","xxx"];
var listOfVerbs = ["accept","ache","acknowledge","act","add","admire","admit","admonish","adopt","advise","affirm","afford","agree","ail","alert","allege","allow","allude","amuse","analyze","announce","annoy","answer","apologize","appeal","appear","applaud","appreciate","approve","argue","arrange","arrest","arrive","articulate","ask","assert","assure","attach","attack","attempt","attend","attract","auction","avoid","avow","awake","babble","back","bake","balance","balk","ban","bandage","bang","bar","bare","bargain","bark","barrage","barter","baste","bat","bathe","battle","bawl","be","beam","bear","beat","become","befriend","beg","begin","behave","believe","bellow","belong","bend","berate","besiege","bestow","bet","bid","bite","bleach","bleed","bless","blind","blink","blot","blow","blurt","blush","boast","bob","boil","bolt","bomb","book","bore","borrow","bounce","bow","box","brag","brake","branch","brand","break","breathe","breed","bring","broadcast","broil","bruise","brush","bubble","build","bump","burn","burnish","bury","buy","buzz","cajole","calculate","call","camp","care","carry","carve","catch","cause","caution","challenge","change","chant","charge","chase","cheat","check","cheer","chew","chide","chip","choke","chomp","choose","chop","claim","clap","clean","clear","climb","clip","close","coach","coil","collect","color","comb","come","comfort","command","comment","communicate","compare","compete","complain","complete","concede","concentrate","concern","conclude","concur","confess","confide","confirm","connect","consent","consider","consist","contain","contend","continue","cook","copy","correct","cost","cough","count","counter","cover","covet","crack","crash","crave","crawl","criticize","croak","crochet","cross","cross-examine","crowd","crush","cry","cure","curl","curse","curve","cut","cycle","dam","damage","dance","dare","deal","debate","decay","deceive","decide","decipher","declare","decorate","delay","delight","deliver","demand","deny","depend","describe","desert","deserve","desire","deter","develop","dial","dictate","die","dig","digress","direct","disclose","dislike","dive","divide","divorce","divulge","do","dock","dole","dote","double","doubt","drag","drain","draw","dream","dress","drill","drink","drip","drive","drone","drop","drown","dry","dump","dupe","dust","dye","earn","eat","echo","edit","educate","elope","embarrass","emigrate","emit","emphasize","employ","empty","enchant","encode","encourage","end","enjoin","enjoy","enter","entertain","enunciate","envy","equivocate","escape","evacuate","evaporate","exaggerate","examine","excite","exclaim","excuse","exercise","exhort","exist","expand","expect","expel","explain","explode","explore","extend","extoll","face","fade","fail","fall","falter","fasten","favor","fax","fear","feed","feel","fence","fetch","fight","file","fill","film","find","fire","fish","fit","fix","flap","flash","flee","float","flood","floss","flow","flower","fly","fold","follow","fool","force","foretell","forget","forgive","form","found","frame","freeze","fret","frighten","fry","fume","garden","gasp","gather","gaze","gel","get","gild","give","glide","glue","gnaw","go","grab","grate","grease","greet","grill","grin","grip","groan","grow","growl","grumble","grunt","guarantee","guard","guess","guide","gurgle","gush","hail","hammer","hand","handle","hang","happen","harass","harm","harness","hate","haunt","have","head","heal","heap","hear","heat","help","hide","highlight","hijack","hinder","hint","hiss","hit","hold","hook","hoot","hop","hope","hover","howl","hug","hum","hunt","hurry","hurt","ice","identify","ignore","imagine","immigrate","implore","imply","impress","improve","include","increase","infect","inflate","influence","inform","infuse","inject","injure","inquire","insist","inspect","inspire","instruct","intend","interest","interfere","interject","interrupt","introduce","invent","invest","invite","iron","irritate","itch","jab","jabber","jail","jam","jeer","jest","jog","join","joke","jolt","judge","juggle","jump","keep","kick","kill","kiss","kneel","knit","knock","knot","know","label","lament","land","last","laugh","lay","lead","lean","learn","leave","lecture","lend","let","level","license","lick","lie","lift","light","lighten","like","list","listen","live","load","loan","lock","long","look","loosen","lose","love","lower","mail","maintain","make","man","manage","mar","march","mark","marry","marvel","mate","matter","mean","measure","meet","melt","memorize","mend","mention","merge","milk","mine","miss","mix","moan","molt","moor","mourn","move","mow","mug","multiply","mumble","murder","mutter","nag","nail","name","nap","need","nest","nod","note","notice","number","obey","object","observe","obtain","occur","offend","offer","ogle","oil","omit","open","operate","order","overflow","overrun","owe","own","pack","pad","paddle","paint","pant","park","part","pass","paste","pat","pause","pay","peck","pedal","peel","peep","peer","peg","pelt","perform","permit","pester","pet","phone","pick","pinch","pine","place","plan","plant","play","plead","please","pledge","plow","plug","point","poke","polish","ponder","pop","possess","post","postulate","pour","practice","pray","preach","precede","predict","prefer","prepare","present","preserve","press","pretend","prevent","prick","print","proceed","proclaim","produce","profess","program","promise","propose","protect","protest","provide","pry","pull","pump","punch","puncture","punish","push","put","question","quilt","quit","quiz","quote","race","radiate","rain","raise","rant","rate","rave","reach","read","realize","rebuff","recall","receive","recite","recognize","recommend","record","reduce","reflect","refuse","regret","reign","reiterate","reject","rejoice","relate","relax","release","rely","remain","remember","remind","remove","repair","repeat","replace","reply","report","reprimand","reproduce","request","rescue","retire","retort","return","reveal","reverse","rhyme","ride","ring","rinse","rise","risk","roar","rob","rock","roll","rot","row","rub","ruin","rule","run","rush","sack","sail","satisfy","save","savor","saw","say","scare","scatter","scoff","scold","scoot","scorch","scrape","scratch","scream","screech","screw","scribble","seal","search","see","sell","send","sense","separate","serve","set","settle","sever","sew","shade","shampoo","share","shave","shelter","shift","shiver","shock","shoot","shop","shout","show","shriek","shrug","shut","sigh","sign","signal","sin","sing","singe","sip","sit","skate","skateboard","sketch","ski","skip","slap","sleep","slice","slide","slip","slow","smash","smell","smile","smoke","snap","snarl","snatch","sneak","sneer","sneeze","snicker","sniff","snoop","snooze","snore","snort","snow","soak","sob","soothe","sound","sow","span","spare","spark","sparkle","speak","speculate","spell","spend","spill","spin","spoil","spot","spray","sprout","sputter","squash","squeeze","stab","stain","stammer","stamp","stand","star","stare","start","stash","state","stay","steer","step","stipulate","stir","stitch","stop","store","storm","stow","strap","stray","strengthen","stress","stretch","strip","stroke","strum","strut","stuff","stun","stunt","stutter","submerge","succeed","suffer","suggest","suit","supply","support","suppose","surmise","surprise","surround","suspect","suspend","sway","swear","swim","swing","switch","swoop","sympathize","take","talk","tame","tap","taste","taunt","teach","tear","tease","telephone","tell","tempt","terrify","test","testify","thank","thaw","theorize","think","threaten","throw","thunder","tick","tickle","tie","time","tip","tire","toast","toss","touch","tour","tow","trace","track","trade","train","translate","transport","trap","travel","treat","tremble","trick","trickle","trim","trip","trot","trouble","trounce","trust","try","tug","tumble","turn","twist","type","understand","undress","unfasten","unite","unlock","unpack","untie","uphold","upset","upstage","urge","use","usurp","utter","vacuum","value","vanish","vanquish","venture","visit","voice","volunteer","vote","vouch","wail","wait","wake","walk","wallow","wander","want","warm","warn","wash","waste","watch","water","wave","waver","wear","weave","wed","weigh","welcome","whimper","whine","whip","whirl","whisper","whistle","win","wink","wipe","wish","wobble","wonder","work","worry","wrap","wreck","wrestle","wriggle","write","xray","yawn","yell","yelp","yield","yodel","zip","zoom","Tempt","fervor","intimate","playful","eager","wild","enthusiastic","vertex","vulnerable","intimate","relax ","vigorous","exquisite","exotic","skill","wrought","infuse","graceful","smother","powerless","exposed  ","errant","stimulate","excess","rich","meld","fuse","willingly","possess","arouse","entice","peak","tip","areola","contours","cock","flower","erection","hard-on","manhood","member","organ","rod","root","shaft","staff","Clit","bud","bundle","nub","pleasure ","bud","pussy","globes","mounds","backside","bottom","butt","rear","rear ","end","rump","climax","erupt","explode","peak","spasm","spend","spurt","weep","flex","brace","throb","pulse","ache"];

function uploadProfanityBase(words) {
    for (var i = 0; i < words.length; i++) {
        async.waterfall([
            async.apply(saveToFirebase, words[i])
        ], function(err, words) {
            console.log("done");
        });
    }

    function saveToFirebase(words, callback) {
                var newChildRef = ref.push();
                console.log(words);
               var usersRef = ref.child("profanity");
         usersRef.push({
                      word:  words,
                      type: "bad"
                    });
    }
};






function uploadProfanityBase2(words) {
    for (var i = 0; i < words.length; i++) {
        async.waterfall([
            async.apply(saveToFirebase, words[i])
        ], function(err, words) {
            console.log("done");
        });
    }

    function saveToFirebase(words, callback) {
                var newChildRef = ref.push();
                console.log(words);
               var usersRef = ref.child("profanity");
         usersRef.push({
                      word:  words,
                      type: "good"
                    });
    }
};





uploadProfanityBase2(listOfVerbs);

uploadProfanityBase(listOfProfanityWords);