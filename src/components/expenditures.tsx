import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { SkeletonBlock } from './skeleton-block';
import { Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { BaseComponentProps } from '../util/interfaces';
import { apiUrlSandbox } from '../util/global';

export const Expenditures: React.FC<BaseComponentProps> = ({link}) => {

  const [exData, setExData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(`${apiUrlSandbox}/financial-health?link=${link}`)
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

  const pieChartSizes = { width: 400, height: 200 }
  const lineChartSizes = { width: 500, height: 300 }
  const chartColors = ['red', 'green']

  return (
    <>
      {!loading ? <Box sx={{ p: 4 }}>
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
            width={pieChartSizes.width}
            height={pieChartSizes.height}
          />
          <Grid>
            <p>Ganancias: {exData.totalIncome}</p>
            <p>Gastos: {exData.totalExpenses}</p>
            <p style={{ color: exData.revenue > 0 ? chartColors[1] : chartColors[0], fontWeight: "bold" }}>
              {exData.revenue > 0 ? 'Ganancia' : 'Perdida'}: {`${exData.revenue} (%${exData.marginPercentage})`}</p>
          </Grid>
          <LineChart
          xAxis={[{ 
            label: "Dias a partir de hoy",
            data: exData.timechart.daysFromToday 
          }]}
          series={[
            {
              label: "Flujo (MXN)",
              data: exData.timechart.revenueAtDate,
            },
          ]}
          width={lineChartSizes.width}
          height={lineChartSizes.height}
        />
        </Grid>
      </Box>
        : <SkeletonBlock />
      }
    </>

  );
}