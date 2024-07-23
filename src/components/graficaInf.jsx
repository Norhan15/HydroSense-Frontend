import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

// Función para obtener datos del endpoint
async function fetchTemperatureData() {
  const response = await fetch('https://hydrosense-peticions.integrador.xyz:3000/datas/?page=1&limit=10');
  const jsonData = await response.json();
  return jsonData.data.map(item => item.data.temperature);
}

// Función para obtener datos del endpoint de gráfico de dispersión
async function fetchScatterChartData() {
  const response = await fetch('https://hydrosense-peticions.integrador.xyz:3000/datas/?page=2&limit=500');
  const result = await response.json();
  return result.data.map(item => ({
    id: item.id_data,
    flowRate: item.data.flow_rate
  }));
}

// Función para calcular la media móvil
const calculateMovingAverage = (data, windowSize) => {
  let movingAverages = [];
  for (let i = 0; i <= data.length - windowSize; i++) {
    const window = data.slice(i, i + windowSize);
    const average = window.reduce((acc, val) => acc + val, 0) / windowSize;
    movingAverages.push(average);
  }
  return movingAverages;
};

// Componente de gráficos en tiempo real
const RealTimeCharts = () => (
  <div>
    <ScatterChart /> {/* Reemplaza la gráfica de líneas por la gráfica de puntos */}
  </div>
);

const EnhancedCard = () => {
  const [selectedChart, setSelectedChart] = useState('chart1');
  const [intervals, setIntervals] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [cumulativeFrequencies, setCumulativeFrequencies] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [movingAverages, setMovingAverages] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [scatterChartData, setScatterChartData] = useState([]);

  useEffect(() => {
    const generateHistogram = async () => {
      // Aquí se debe definir fetchTemperatureData
      const temperatures = await fetchTemperatureData();

      // Crear intervalos (bins)
      const bins = [32.25, 32.40, 32.55, 32.70, 32.85, 33.00];

      // Contar frecuencia en cada intervalo
      const frequency = bins.map((_, i, arr) => {
        const lower = arr[i];
        const upper = arr[i + 1];
        return temperatures.filter(t => t >= lower && t < upper).length;
      }).slice(0, -1); // El último bin no tiene un upper bound, lo excluimos

      // Configurar intervalos y frecuencias
      setIntervals(bins.slice(0, -1).map((bin, i) => `${bin} - ${bins[i + 1]}`));
      setFrequencies(frequency);

      // Calcular frecuencias acumuladas y porcentajes
      let cumulativeFrequency = 0;
      const cumulativeFreq = frequency.map(f => cumulativeFrequency += f);
      const percent = frequency.map(f => ((f / temperatures.length) * 100).toFixed(2));
      
      setCumulativeFrequencies(cumulativeFreq);
      setPercentages(percent);
    };

    generateHistogram();

    // Datos de ejemplo para la gráfica de líneas
    const exampleLineData = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    const exampleWindowSize = 3; // Tamaño de la ventana para la media móvil
    const exampleMovingAverages = calculateMovingAverage(exampleLineData, exampleWindowSize);
    
    setLineChartData(exampleLineData);
    setMovingAverages(exampleMovingAverages);

    // Datos de ejemplo para la gráfica de pastel
    const pieData = [
      { label: 'Tipo A', value: 10 },
      { label: 'Tipo B', value: 15 },
      { label: 'Tipo C', value: 20 },
    ];
    const totalFailures = pieData.reduce((acc, item) => acc + item.value, 0);
    const formattedPieData = pieData.map(item => ({
      id: item.label,
      value: item.value,
      label: `${item.label} (${((item.value / totalFailures) * 100).toFixed(2)}%)`,
    }));

    setPieChartData(formattedPieData);

    // Obtener datos para la gráfica de dispersión
    const fetchAndSetScatterData = async () => {
      const scatterData = await fetchScatterChartData();
      const filteredScatterData = [];
      let lastFlowRate = null;

      scatterData.forEach(item => {
        if (item.flowRate !== lastFlowRate) {
          filteredScatterData.push({
            x: item.id,  // Usar id_data como el índice en el eje X
            y: item.flowRate
          });
          lastFlowRate = item.flowRate;
        }
      });

      setScatterChartData(filteredScatterData);
    };

    fetchAndSetScatterData();

  }, []);

  const handleChange = (event) => {
    setSelectedChart(event.target.value);
  };

  const chartData = {
    chart1: {
      component: BarChart,
      props: {
        xAxis: [{ scaleType: 'band', data: intervals }],
        series: [{ data: frequencies }],
        width: 600,
        height: 400,
      },
      title: 'Gráfica de Barras con Intervalos de Clase',
      description: 'Una gráfica de barras que muestra la frecuencia de los datos en intervalos de clase.',
    },
    chart2: {
      component: ScatterChart, // Reemplaza el LineChart con ScatterChart
      props: {
        series: [
          {
            data: scatterChartData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ],
        height: 400,
        sx: { marginBottom: 4 },
      },
      title: 'Gráfica de Puntos',
      description: 'Una gráfica de puntos que muestra la distribución del flujo de agua.',
    },
    chart3: {
      component: PieChart,
      props: {
        series: [
          {
            data: pieChartData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ],
        height: 400,
        sx: { marginBottom: 4 },
      },
      title: 'Gráfica de Pastel',
      description: 'Una gráfica de pastel que muestra la proporción de cada tipo de fallos en relación al total de fallos.',
    },
    chart4: {
      component: RealTimeCharts,
      props: {},
      title: 'Gráficas en Tiempo Real',
      description: 'Gráficas de líneas que muestran datos en tiempo real.',
    },
    table: {
      title: 'Tabla de Frecuencia',
      description: 'Una tabla que muestra la frecuencia, frecuencia acumulada y porcentaje de los datos en intervalos de clase.',
      table: (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Intervalo</TableCell>
              <TableCell>Frecuencia</TableCell>
              <TableCell>Frecuencia Acumulada</TableCell>
              <TableCell>Porcentaje (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {intervals.map((interval, index) => (
              <TableRow key={interval}>
                <TableCell>{interval}</TableCell>
                <TableCell>{frequencies[index]}</TableCell>
                <TableCell>{cumulativeFrequencies[index]}</TableCell>
                <TableCell>{percentages[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ),
    },
  };

  const ChartComponent = chartData[selectedChart]?.component;
  const chartProps = chartData[selectedChart]?.props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {chartData[selectedChart]?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {chartData[selectedChart]?.description}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="chart-select-label">Selecciona una gráfica</InputLabel>
          <Select
            labelId="chart-select-label"
            value={selectedChart}
            onChange={handleChange}
          >
            <MenuItem value="chart1">Gráfica de Barras</MenuItem>
            <MenuItem value="chart2">Gráfica de Puntos</MenuItem>
            <MenuItem value="chart3">Gráfica de Pastel</MenuItem>
            <MenuItem value="chart4">Gráficas en Tiempo Real</MenuItem>
            <MenuItem value="table">Tabla de Frecuencia</MenuItem>
          </Select>
        </FormControl>
        {ChartComponent && <ChartComponent {...chartProps} />}
        {selectedChart === 'table' && chartData.table.table}
      </CardContent>
    </Card>
  );
};

export default EnhancedCard;
