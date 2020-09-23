## Käynnistä palvelin komennolla npm run dev (tämä on parempi) tai node btdataServer

http://localhost:8080 - message	"Ei pyydettyä palvelua"
http://localhost:8080/person/all - GET, Antaa JSONina SQL tietokannan sisällön
http://localhost:8080/person/add - POST, Voit antaa tietokantaan tietoa 'btdata' 'datetime' 

## Asennetut paketit:
NodeJs
https://nodejs.org/en/

SQLite relaatiotietokanta järjestelmä :
npm install sqlite3 --save

Framework palvelinpuolen web-sovellusten tekoon :
npm install express --save 

Mahdollistaa toiselta palvelimelta ladatun skriptin pääsyn tämän palvelimen koodiin :
npm install cors --save

Tietoturvakirjasto :
npm install helmet --save 

Nodea varten automaatio, käynnistää servun uusiksi tietojen muuttuessa :
npm install -g nodemon
