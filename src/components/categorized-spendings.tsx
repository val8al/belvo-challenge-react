import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { SkeletonBlock } from './skeleton-block';
import { PieChart } from '@mui/x-charts';
import { BaseComponentProps } from '../util/interfaces';
import { apiUrlSandbox } from '../util/global';


export const CategorizedSpendings: React.FC<BaseComponentProps> = ({ link }) => {
  const [catData, setCatData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${apiUrlSandbox}/spending-categories?link=${link}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Bad response')
        }
        return response.json()
      }).then(data => {
        setCatData(data);
        setLoading(false)
      }).catch(error => {
        console.log("Faulty data from fetch")
      })
  }, [])

  const pieChartSizes = { width: 600, height: 200 }
  return (
    <>
      {!loading ?
        <Box component="section" sx={{ p: 4, border: 'px grey' }}>
          <Grid container spacing={{md: 2}}>
          <h3>Transacciones por Categoria</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Categoria</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="right">No. de Transacciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catData.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.category}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="right">{row.transactions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <>
            <PieChart
              series={[
                {
                  data: [
                    ...catData.map((transaction, idx) => { return { id: idx, value: transaction.amount, label: transaction.category } })
                  ]
                },
              ]}
              width={pieChartSizes.width}
              height={pieChartSizes.height}
            />
          </>
        </Grid>
        </Box>
        : <SkeletonBlock />}
    </>
  );
}