# To run the program : node Webscrapping_espn_IPL 2020.js

You are given link of IPL 2020-2021 home page link. https://www.espncricinfo.com/series/ipl-2020-21-1210595. You need to scrap data using this link in the format displayed below.

Create a folder of ipl 2020.
Inside that folder create folders for each team playing in that ipl.
Create Json file of each batsman in that team folder in which we will store details of the player in the form of array of object where each object should describe a particular match played by a player. Details of an object includes 

a. Runs, balls, sixes , fours, sr for that match

b. date ,venue ,result and opponent name for that match

Example Array Object of player:
<code><pre>
[
    {
        "runs": "39",
        "balls": "27",
        "fours": "3",
        "sixes": "2",
        "StrikeRate": "144.44",
        "date": "Oct 25 2020",
        "venue": "Dubai",
        "result": "Super Kings won by 8 wickets (with 8 balls remaining)",
        "OpponentName": "Royal Challengers Bangalore"
    },
    {
        "runs": "30",
        "balls": "30",
        "fours": "2",
        "sixes": "0",
        "StrikeRate": "100.00",
        "date": "Nov 1 2020",
        "venue": "Abu Dhabi",
        "result": "Super Kings won by 9 wickets (with 7 balls remaining)",
        "OpponentName": "Punjab Kings"
    },
    {
        "runs": "2",
        "balls": "3",
        "fours": "0",
        "sixes": "0",
        "StrikeRate": "66.67",
        "date": "Oct 23 2020",
        "venue": "Sharjah",
        "result": "Mum Indians won by 10 wickets (with 46 balls remaining)",
        "OpponentName": "Mumbai Indians"
    },
    {
        "runs": "8",
        "balls": "9",
        "fours": "1",
        "sixes": "0",
        "StrikeRate": "88.89",
        "date": "Oct 2 2020",
        "venue": "Dubai",
        "result": "Sunrisers won by 7 runs",
        "OpponentName": "Sunrisers Hyderabad"
    },
    {
        "runs": "13",
        "balls": "19",
        "fours": "2",
        "sixes": "0",
        "StrikeRate": "68.42",
        "date": "Oct 19 2020",
        "venue": "Abu Dhabi",
        "result": "Royals won by 7 wickets (with 15 balls remaining)",
        "OpponentName": "Rajasthan Royals"
    },
    {
        "runs": "30",
        "balls": "27",
        "fours": "3",
        "sixes": "0",
        "StrikeRate": "111.11",
        "date": "Oct 7 2020",
        "venue": "Abu Dhabi",
        "result": "KKR won by 10 runs",
        "OpponentName": "Kolkata Knight Riders"
    },
    {
        "runs": "42",
        "balls": "40",
        "fours": "4",
        "sixes": "0",
        "StrikeRate": "105.00",
        "date": "Oct 10 2020",
        "venue": "Dubai",
        "result": "RCB won by 37 runs",
        "OpponentName": "Royal Challengers Bangalore"
    },
    {
        "runs": "71",
        "balls": "48",
        "fours": "6",
        "sixes": "3",
        "StrikeRate": "147.92",
        "date": "Sep 19 2020",
        "venue": "Abu Dhabi",
        "result": "Super Kings won by 5 wickets (with 4 balls remaining)",
        "OpponentName": "Mumbai Indians"
    },
    {
        "runs": "45",
        "balls": "25",
        "fours": "1",
        "sixes": "4",
        "StrikeRate": "180.00",
        "date": "Oct 17 2020",
        "venue": "Sharjah",
        "result": "Capitals won by 5 wickets (with 1 ball remaining)",
        "OpponentName": "Delhi Capitals"
    },
    {
        "runs": "38",
        "balls": "20",
        "fours": "5",
        "sixes": "1",
        "StrikeRate": "190.00",
        "date": "Oct 29 2020",
        "venue": "Dubai",
        "result": "Super Kings won by 6 wickets",
        "OpponentName": "Kolkata Knight Riders"
    },
    {
        "runs": "41",
        "balls": "34",
        "fours": "3",
        "sixes": "2",
        "StrikeRate": "120.59",
        "date": "Oct 13 2020",
        "venue": "Dubai",
        "result": "Super Kings won by 20 runs",
        "OpponentName": "Sunrisers Hyderabad"
    }
]
</code></pre>
