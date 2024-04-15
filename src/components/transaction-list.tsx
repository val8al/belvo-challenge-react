import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { SkeletonBlock } from './skeleton-block';


export const TransactionList = () => {
  const [transData, setTransData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/transactions-ctrl?link=3bcd9822-8dd5-4710-a422-d3ac730df48e')
      .then(response => {
        if (!response.ok) {
          throw new Error('Bad response')
        }
        return response.json()
      }).then(data => {
        setTransData(data);
        setLoading(false)
      }).catch(error => {
        console.log("Faulty data from fetch")
      })
  }, [])

  return (
    <Box component="section" sx={{ p: 2, border: 'px grey' }}>
      <>
        { !loading ? (
          
          <TableContainer component={Paper}>
            <h3>Lista de transacciones</h3>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell align="right">Emisor</TableCell>
                  <TableCell align="right">Concepto</TableCell>
                  <TableCell align="right">Estatus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transData ? transData.map((trans, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {trans.created_at}
                    </TableCell>
                    <TableCell>{(trans.type === "OUTFLOW" ? `- $` : '$')}{trans.amount}</TableCell>
                    <TableCell align="right">{trans.merchant_name}</TableCell>
                    <TableCell align="right">{trans.description}</TableCell>
                    <TableCell align="right">{trans.status}</TableCell>
                  </TableRow>
                )) : null
                }
              </TableBody>
            </Table>
          </TableContainer>)
          : <SkeletonBlock/>
        }
      </>
    </Box>
  );
}