import React from 'react';

const ProgressBar = ({ data }) => {
    const totalVulnerabilities = data?.data.reduce((sum, curObj) => sum + curObj.value, 0);
    const newData = data?.data.map((object) => ({ ...object, label: object.label.concat(` (${object.value})`) }));
    const percentages = data.data.map((object) => (object.value / totalVulnerabilities) * 100);

    return (
        newData && newData?.length > 0 ?
            <>
                <div className='p-2 flex gap-4 items-center'>
                    <span className='text-lg font-bold'>{totalVulnerabilities}</span>
                    <span className='text-sm'>{data.subTitle}</span>
                </div>
                <div className='w-full h-6 rounded-full overflow-clip bg-white flex'>
                    <div title={percentages[ 0 ] + " %"} className={`bg-red-900 h-full `} style={{ width: `${percentages[ 0 ]}%` }}></div>
                    <div title={percentages[ 1 ] + " %"} className={`bg-red-500 h-full `} style={{ width: `${percentages[ 1 ]}%` }}></div>
                    <div title={percentages[ 2 ] + " %"} className={`bg-orange-400 h-full `} style={{ width: `${percentages[ 2 ]}%` }}></div>
                    <div title={percentages[ 3 ] + " %"} className={`bg-yellow-400 h-full `} style={{ width: `${percentages[ 3 ]}%` }}></div>
                    <div title={percentages[ 4 ] + " %"} className={`bg-gray-300 h-full `} style={{ width: `${percentages[ 4 ]}%` }}></div>
                </div>
                <div className='grid grid-cols-2 m-2 my-4 gap-4'>
                    <div className=" flex items-center gap-2">
                        <span className='bg-red-900 p-2 inline-block w-1 h-1 rounded'></span>
                        <span>{newData[ 0 ].label}</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <span className='bg-red-500 p-2 inline-block w-1 h-1 rounded'></span>
                        <span>{newData[ 1 ].label}</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <span className='bg-orange-400 p-2 inline-block w-1 h-1 rounded'></span>
                        <span>{newData[ 2 ].label}</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <span className='bg-yellow-400 p-2 inline-block w-1 h-1 rounded'></span>
                        <span>{newData[ 3 ].label}</span>
                    </div>

                </div>
            </> : ""

    );
};

export default ProgressBar;