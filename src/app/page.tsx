"use client";

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Avatar, FormLabel, Grid2, TableBody, TableContainer, Table, TableHead, TableCell, TableRow, Card, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';
import './public/globals.css';
import styles from './styles.module.css';
import Sport from './models/Sport';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#01d97e',
      },
      secondary: {
        main: '#1e1a36'
      }
    },
});
  
interface Sports {
    sports: Sport[];
}

function toEvents(data: any) {
    const events: Sports = { sports: [] };
    events.sports = data.sports.map((item: Sport) => {
        return {
            event_id: item.event_id,
            name: item.name,
            events: item.events.map((event: any) => {
                return {
                    event_id: event.event_id,
                    name: event.name,
                    odds: {
                        home_win: event.odds.home_win,
                        draw: event.odds.draw,
                        away_win: event.odds.away_win,
                    },
                    start_time: event.start_time,
                    status: event.status,
                    teams: {
                        home: event.teams.home,
                        away: event.teams.away,
                    }
                };
        })};
    });
    return events;    
}

export default function Page() {

    const [data, setData] = useState([]);


    useEffect   (() => {
        async function fechtEvents() {
            const res = await fetch('http://localhost:5000/api/events');
            const data = (await res.json()).data;
            setData(data);
        }
        fechtEvents();
    }, []);
    
    
    const show = true;
    
    let lastSport:any = ""; 
    
    //@ts-ignore
    if (!data.sports) return null;
    
    const sports:Sports = toEvents(data);

    console.log(sports);

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid2 container>
                <Grid2 size={12} container bgcolor={'var(--secondary)'} margin={0}>
                    <Grid2 size={1} padding={2}>
                        <img
                            width={'70%'} 
                            src='https://cdn-icons-png.flaticon.com/512/1205/1205526.png'
                        />
                    </Grid2>
                    <Grid2 size={2}>
                    </Grid2>
                    <Grid2 size={6} className={styles.itemNavbar}>
                        
                    </Grid2>
                    <Grid2 size={1}>
                    </Grid2>
                    { 
                        (show) ?
                        <Grid2 size={2} sx={{borderLeft: '1px solid white', padding: '10px', textAlign: 'center'}}>
                            <table width={'100%'} >
                                <tbody>
                                    <tr style={{textAlign: 'center', }}>
                                        <td style={{textAlign: 'center', width: '50%'}}>
                                            <Button sx={{width: '90%', bgcolor: 'var(--primary)', color: 'white'}}>
                                                Login
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign: 'center', width: '50%'}}>
                                            <Button variant="outlined" sx={{width: '90%', color: 'var(--primary)'}}>
                                                Registre-se
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid2>
                        : null
                    }
                    {
                        (!show) ?
                        <Grid2 size={2}>
                            <table width={'100%'} style={{backgroundColor: 'var(--primary)'}}>
                                <tr>
                                    <td style={{textAlign: 'center', backgroundColor: 'var(--primary)'}}>
                                        <Button variant="contained" color="primary">
                                            Primary
                                        </Button>
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <Avatar src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'/>
                                    </td>
                                </tr>
                            </table>
                        </Grid2> : null
                    }
                </Grid2>
                <h1 style={{color:'white', textAlign: 'center', width: '100vw', fontSize: '2em', padding: 10}}>Jogos do dia</h1>
                <Grid2 size={8} container bgcolor={'black'} margin={'auto'} position={'relative'} borderRadius={10}>
                    <TableContainer component={Card}>
                        <Table key={'teste'}>
                            <TableHead>
                                <TableRow sx={{backgroundColor: 'var(--secondary)', color: 'white'}}>
                                    <TableCell style={{textAlign: 'center', color: 'white', fontSize: '1.2em'}}>
                                        <h1>
                                            <em>Data e Hora</em>
                                            <br/>
                                            Jogo
                                        </h1>
                                    </TableCell>
                                    <TableCell style={{textAlign: 'center', color: 'white', fontSize: '1.2em'}}>Casa</TableCell>
                                    <TableCell style={{textAlign: 'center', color: 'white', fontSize: '1.2em'}}>Empt</TableCell>
                                    <TableCell style={{textAlign: 'center', color: 'white', fontSize: '1.2em'}}>Fora</TableCell>
                                    <TableCell style={{textAlign: 'center', color: 'white', fontSize: '1.2em'}}>Outras bets</TableCell>
                                </TableRow>
                            </TableHead>
                                { sports.sports.map((sport:Sport, index:any) => {
                                    let exibirTitulo = false;
                                    if (sport.name !== lastSport) {
                                        lastSport = sport.name;
                                        exibirTitulo = true;
                                    }
                                    return <TableBody key={index}>
                                        {(exibirTitulo) ? <TableRow key={index + "row"}>
                                                <TableCell colSpan={5} style={{backgroundColor: 'var(--primary)', color: 'white', fontSize: '1.5em'}}>
                                                    {sport.name}
                                                </TableCell>
                                            </TableRow> : null}
                                        {sport.events.map((event: any, index2:any) => {
                                                return <TableRow key={index2 + "col"}>
                                                <TableCell>
                                                    <FormLabel sx={{fontSize: '1em'}}>15:00h - 15/09/2024</FormLabel>
                                                    <br/>
                                                    <FormLabel>{event.teams.home + " x " + event.teams.away}</FormLabel>
                                                </TableCell>
                                                <TableCell width={'15%'} sx={{textAlign: 'center'}}>
                                                    <Button variant="contained" color="primary">
                                                        {event.odds.home_win + ''}
                                                    </Button>
                                                </TableCell>
                                                {
                                                (event.odds.draw != undefined) ? <TableCell width={'15%'} sx={{textAlign: 'center'}}>
                                                    <Button variant="contained" color="primary">
                                                        {event.odds.draw + ''}
                                                    </Button>
                                                </TableCell> : null}
                                                <TableCell width={'15%'} sx={{textAlign: 'center'}}>
                                                    <Button variant="contained" color="primary">
                                                        {event.odds.away_win + ''}
                                                    </Button>
                                                </TableCell>
                                                <TableCell width={'15%'} sx={{textAlign: 'center'}}>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={0}
                                                    >
                                                        <MenuItem value={0}>Outras odds</MenuItem>
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                            }) }
                                        
                                    </TableBody>
                                })}
                        </Table>
                    </TableContainer>
                </Grid2>
            </Grid2>
        </ThemeProvider>
    );
};