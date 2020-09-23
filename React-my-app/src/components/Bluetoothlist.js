import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { blue, green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    marginTop: 15, marginLeft: 15,
    maxWidth: 300, minWidth: 200,
    color: blue[300],
    
  },
  typo: {
    height: 75, 
    width: 200,
  },
  button: {
    textAlign: 'center',
    flexGrow: 1
  },
  dark: {
    color: green[900],
  }
});


function Lista () {      

  const[bluData, setbluData] = useState([]);

  const fetchUrl = async () => {
    try {
        const response = await fetch('http://localhost:8080/person/all');
        const json = await response.json();

        setbluData(json) 

        console.log(json);

    } catch (error) {
        console.log(error);
    } 
  }

  useEffect( () => { fetchUrl() }, []);
  const classes = useStyles();
    return (
      <Grid container spacing={4}>
        <div>
          { bluData.map( r => {
                  return (
                    <Grid item key={ r.id }>
                     <Card className={ classes.card }>
                     <CardContent>
                      <Typography>ID: { r.id }, AIKA: { r.datetime }</Typography>
                      <Typography gutterBottom>BTDATA: { r.btdata }</Typography>
                    </CardContent>
                  </Card>
                 </Grid>
               );
            })
          }
        </div>
      </Grid>
      
      );
      
    }


  export default Lista;