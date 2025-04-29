import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';

export default function Chart({ data, total }) {

    data = data.map(d => ({ ...d, label: d.label.concat(` (${d.value})`) }));
    const valueFormatter = (item) => `${item.value}%`;

    return (
        <Box sx={{ width: '100%' }}>

            {
                data && data.length > 0 ?

                    <PieChart
                        height={150}
                        width={250}
                        sx={{ position: 'relative', marginTop: '30px' }}
                        series={[
                            {
                                data: data,
                                innerRadius: 40,
                                arcLabelMinAngle: 20,
                                valueFormatter,
                            },
                        ]}
                        skipAnimation={false}
                    />


                    :
                    <div className='flex flex-col items-center justify-center'>
                        <AutoGraphOutlinedIcon />
                        <span>No Graph data available</span>
                    </div>
            }
        </Box>
    );
}
