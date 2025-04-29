import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addNewWidget } from '../store/categorySlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const MUIModal = ({ open, setOpen, catId }) => {
    const handleClose = () => setOpen(false);
    const [ formData, setformData ] = useState({});

    const dispatch = useDispatch();

    const categories = useSelector(state => state.category);

    const handleChange = (event) => {
        setformData(prev => ({ ...prev, [ event.target.name ]: event.target.value }));
    };

    const handleSubmit = () => {

        if (catId == 1) {
            const itemInx = categories.find(item => item.id == catId).chartData.length + 1;

            const newId = itemInx + 10;
            const labelList = formData.labels.split(",").filter(item => item);
            const valueList = formData.values.split(",").filter(item => item);
            let newDataList = [];
            if (labelList.length == valueList.length) {
                for (let i = 0; i < labelList.length; i++) {
                    newDataList.push({
                        label: labelList[ i ],
                        value: parseInt(valueList[ i ])
                    });
                }
            } else {
                alert("No. of labels and values should be equal.");
            }
            const newData = {
                id: newId,
                title: formData.title,
                show: true,
                data: newDataList

            };

            dispatch(addNewWidget({ id: catId, newData }));
        }

        if (catId == 2) {
            const itemInx = categories.find(item => item.id == catId).chartData.length + 1;
            const newId = itemInx + 20;
            const newData = {
                id: newId,
                title: formData.title,
                show: true,
                data: formData.data
            };

            dispatch(addNewWidget({ id: catId, newData }));

        }

        if (catId == 3) {
            const itemInx = categories.find(item => item.id == catId).chartData.length + 1;
            console.log(itemInx);
            const newId = itemInx + 30;

            const labelList = formData.labels.split(",").filter(item => item);
            const valueList = formData.values.split(",").filter(item => item);
            let newDataList = [];

            if (labelList.length == valueList.length && valueList.length == 5) {
                for (let i = 0; i < labelList.length; i++) {
                    newDataList.push({
                        label: labelList[ i ],
                        value: parseInt(valueList[ i ])
                    });
                }
            } else {
                alert("No. of labels and values should be equal to 5.");
            }



            const newData = {
                id: newId,
                title: formData.title,
                subTitle: formData.subTitle,
                show: true,
                data: newDataList
            };

            dispatch(addNewWidget({ id: catId, newData }));

        }
        setformData({});
        setOpen(false);
    };


    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {
                    catId == 1 && <span> Add CSPM Widget</span>
                }
                {
                    catId == 2 && <span> Add CWPP Widget</span>
                }
                {
                    catId == 3 && <span> Add Registry Widget</span>
                }

            </Typography>
            <div className='grid grid-cols-2 gap-2 mt-2 mb-2 '>
                {
                    (catId == 1 || catId == 2 || catId == 3) &&
                    <>
                        <div>Title</div>
                        <div><input onChange={handleChange} name='title' type="text" placeholder='Title' className='border border-gray-400 rounded p-1' /></div>
                    </>
                }
                {
                    (catId == 3) &&
                    <>
                        <div>Sub Title</div>
                        <div><input onChange={handleChange} name='subTitle' type="text" placeholder='E.g., Total Images' className='border border-gray-400 rounded p-1' /></div>
                    </>
                }
                {
                    (catId == 1 || catId == 3) &&
                    <>
                        <div>Labels</div>
                        <div><input onChange={handleChange} name='labels' type="text" placeholder='E.g., type1, type2,...' className='border border-gray-400 rounded p-1' /></div>
                    </>
                }
                {
                    (catId == 1 || catId == 3) &&
                    <>
                        <div>Values</div>
                        <div><input onChange={handleChange} name='values' type="text" placeholder='E.g., value1, value2,...' className='border border-gray-400 rounded p-1' /></div>
                    </>
                }
                {
                    (catId == 2) &&
                    <>
                        <div>Data</div>
                        <div><input onChange={handleChange} name='data' type="text" className='border border-gray-400 rounded p-1' /></div>
                    </>
                }



            </div>
            <div className='flex justify-end mt-3'>
                <button onClick={handleSubmit} className='py-1 px-3 rounded border hover:cursor-pointer'>Submit</button>
            </div>

        </Box>
    </Modal>);
};
