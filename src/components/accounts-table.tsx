import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiUrlSandbox } from '../util/global';
import { SkeletonBlock } from './skeleton-block';
import { BaseComponentProps } from '../util/interfaces';
import { Box } from '@mui/material';
import { fetchAccountData } from '../util/helper';


export const AccountsTable: React.FC<BaseComponentProps> = ({link}) => {

  const [accountData, setAccountData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetchAccountData(link,'accounts-overview',setAccountData, setLoading);
  }
  ,[])

  return (
    <>
      {!loading ?
      <Box component="section" sx={{ p: 2}}>
        <TableContainer component={Paper}>
          <h3>Tus cuentas</h3>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:'bold'}}>Cuenta</TableCell>
                <TableCell style={{fontWeight:'bold'}}>Balance</TableCell>
                <TableCell align="right" style={{fontWeight:'bold'}}>id. del Banco</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountData.map((account,idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {account.account_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {account.balance}
                  </TableCell>
                  <TableCell align="right">{account.bank_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
        :
        <SkeletonBlock />
      }</>
  );
}