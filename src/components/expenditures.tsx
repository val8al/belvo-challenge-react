import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { SkeletonBlock } from './skeleton-block';
import { Grid } from '@mui/material';

export default function Expenditures() {

  const [exData, setExData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('http://localhost:3000/financial-health?link=3bcd9822-8dd5-4710-a422-d3ac730df48e')
      .then(response => {
        if (!response.ok) {
          throw new Error('Bad response')
        }
        return response.json()
      }).then(data => {
        setExData(data);
        setLoading(false)
      }).catch(error => {
        console.log("Faulty data from fetch")
      })
  }, [])

  const chartSizes = { width: 400, height: 200 }
  const chartColors = ['red', 'green']

  return (
    <>
      {!loading ? <Box component="section" sx={{ p: 4, border: '1px dashed grey' }}>
        <h3>Analisis de Gastos</h3>
        <Grid container>
          <PieChart
            colors={chartColors}
            series={[
              {
                data: [
                  { id: 0, value: exData.totalIncome, label: 'Ganancias', color: 'green' },
                  { id: 1, value: -1 * exData.totalExpenses, label: 'Gastos', color: 'red' }
                ]
              },
            ]}
            width={chartSizes.width}
            height={chartSizes.height}
          />
          <Grid>
            <p>Ganancias: {exData.totalIncome}</p>
            <p>Gastos: {exData.totalExpenses}</p>
            <p style={{color: exData.revenue > 0 ? chartColors[1] : chartColors[0],fontWeight:"bold"}}>
              {exData.revenue > 0 ? 'Ganancia':'Perdida'}: {exData.revenue}</p>
          </Grid>
        </Grid>
      </Box>
        : <SkeletonBlock />
      }
    </>

  );
}