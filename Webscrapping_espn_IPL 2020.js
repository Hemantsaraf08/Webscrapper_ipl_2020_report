let cheerio = require("cheerio");
let request = require("request");
let fs = require("fs")
let path = require("path");
// const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/points-table-standings";
let url2 = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url, cb);
function cb(err, resp, html) {
    if (err) console.log(err);
    else {
        extractteamnames(html);
    }
}
function extractteamnames(html) {
    let selectortool = cheerio.load(html);
    let arr = selectortool(".header-title.label");
    let teamnames = [];
    for (let i = 0; i < arr.length; i++) {
        let element = selectortool(arr[i]).text();
        element = element.trim();
        teamnames.push(element);
    }
    // console.log(teamnames);
    //create main folder i.e. "IPL 2020"
    let temp = teamnames[0].split("/")
    let mainfoldername = temp[0];
    let folderpath = path.join(__dirname, mainfoldername);
    fs.mkdirSync(folderpath);
    teamnames = teamnames.slice(1);
    // let teamnamesarr=teamnames.map(name=>name.toUpperCase());
    createdirteam(teamnames, folderpath);
    //get matches scorecard links
    request(url2, cb);
    function cb(err, resp, html) {
        if (err) console.log(err);
        else {
            extractallmatchscorecard(html);
        }
    }

}
function createdirteam(teamnames, folderpath) {
    for (let i = 0; i < teamnames.length; i++) {
        let fpath = path.join(folderpath, teamnames[i]);
        fs.mkdirSync(fpath);
    }
}
function extractallmatchscorecard(html) {
    let selectortool = cheerio.load(html);
    let a = selectortool("a[data-hover=Scorecard]");
    let linksarr = [];
    for (let i = 0; i < a.length; i++) {
        let link = selectortool(a[i]).attr("href");
        link = "https://www.espncricinfo.com" + link;
        linksarr.push(link);
    }
    // console.log(linksarr.length);
    for (let i = 0; i < linksarr.length; i++) {
        eachmatchdata(linksarr[i]); //sending url
    }
}
function eachmatchdata(link) {
    request(link, cb);
    function cb(err, resp, html) {
        if (err) console.log(err);
        else {
            extracteachmatchdata(html);
        }
    }
}
function extracteachmatchdata(html) {
    let selectortool = cheerio.load(html);

    //gettings batsman table
    let btable = selectortool(".table.batsman tbody")
    for (let i = 0; i < btable.length; i++) {
        extracteachtable(selectortool, btable[i], i)
    }
}
function getopponents(selectortool) {
    let tname = selectortool(".section-header.border-bottom.text-danger.cursor-pointer .header-title.label");
    let tarr = [];
    for (let i = 0; i < tname.length; i++) {
        let temp = selectortool(tname[i]).text();
        let temparr = temp.split(" INNINGS ");
        tarr.push(temparr[0])
    }
    return tarr;
}
function extracteachtable(selectortool, table, idx) {

    //get miscellaneous data; like opponents, venue, date,result
    let opparr = getopponents(selectortool);
    let opponent;
    if (idx == 0) opponent = opparr[1];
    else opponent = opparr[0];
    let mis = selectortool(".match-info.match-info-MATCH .description").text();
    let misarr = mis.split(", ")
    let venue = misarr[1].trim();
    let date = misarr[2].trim();
    let matchresult = selectortool(".match-info.match-info-MATCH .status-text").text();
    //*******************miscellaneous data extraction completed******************************** */
    let jsonpath = path.join(__dirname, "Indian Premier League 2020", opparr[idx]);
    let rows = selectortool(table).find("tr");
    let mrows = rows.filter(ele => ele % 2 == 0)
    mrows.splice(-1);
    for (let i = 0; i < mrows.length; i++) {
        extracteachrow(selectortool, mrows[i], jsonpath, date, venue, matchresult, opponent);
    }
}
function extracteachrow(selectortool, row, jsonpath, date, venue, result, opponent) {
    let prop = ["ignore","runs", "balls", "fours", "sixes", "StrikeRate", "date", "venue", "result", "OpponentName"];
    //extract col.of each row
    let cols = selectortool(row).find("td");
    // cols one and four not needed;
    cols.splice(1, 1);
    //because object length has decreased by one
    cols.splice(3, 1);

    //CREATE OBJ WITH STATS TO BE PUSHED
    let obj = {};
    for (let i = 1; i < cols.length; i++) {
        let a=selectortool(cols[i]).text();
        obj[prop[i]]=a;
    }
    obj[prop[6]] = date;
    obj[prop[7]] = venue;
    obj[prop[8]] = result;
    obj[prop[9]] = opponent;
    //player json file creation
    let nameplayer = selectortool(cols[0]).text();
    nameplayer = nameplayer.trim();
    nameplayer = nameplayer + ".json";
    let fullpath = path.join(jsonpath, nameplayer);
    if (fs.existsSync(fullpath)) {
        //just push obj
        let content = fs.readFileSync(fullpath);
        content = JSON.parse(content);
        content.push(obj);
        fs.writeFileSync(fullpath, JSON.stringify(content));
    } else {
        //create json file, push obj
        fs.appendFileSync(fullpath, "[]");
        let content = fs.readFileSync(fullpath);
        content = JSON.parse(content);
        content.push(obj);
        fs.writeFileSync(fullpath, JSON.stringify(content));
    }
}
