import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import * as React from "react";
import axios from 'axios'
import ImgList from "../../components/ImageList";
import Grow from '@mui/material/Grow';
import { useState } from "react";
import { useSelector } from 'react-redux';
import Skel from "../../components/Skeleton";
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from "@mui/material";
import { Loader2 } from "../../components/Loader2";

const genders = [
    'Male',
    'Female',
];

const colors = [
    'Black',
    'Blue',
    'Pink',
    'White',
    'Green',
    'Purple',
    'Maroon',
    'Yellow'
];

const categories = [
    'Shalwar Kameez',
    'Pants',
    'T-shirt',
    'Dress shirt',
    'Sweater',
    'Waist coat',
];

export const GenImage = () => {
    const [values, setValues] = useState({
        desc: '',
    });

    const [imageUrl, setImageUrl] = React.useState([])
    const [loadImage, setLoadImage] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    
    let state = useSelector((state) => state.users);
    
    const handleGrowChange = () => {
        setChecked((prev) => !prev);
    };

    const [gender, setGender] = useState('');
    const [flag, setFlag] = useState(false);
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('');
    const [displ, setDispl] = React.useState("none");
    
    let elem;
    elem = <></>;

    const exec = () => {
        setDispl("");
        // elem = <Grow in={checked}><Grid item sx={{marginTop: "15vmin"}}><image src="" alt="Generated image"></image></Grid></Grow>;
        let temp = new Object();
        temp.email = state.value.email;
        temp.caption = values.desc;
        if(flag)
            temp.caption = `${gender} ${category} ${color}`
        console.log(temp.caption)
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post("https://attn-7nqm5u6vxq-as.a.run.app/fashion", json, {headers: heads}).then((res) => {
            setDispl("none");
            if(res.data)
            {
                if(res.data.status)
                {
                    console.log('error');
                    elem = <Grid item><Typography variant="p" color="red">Invalid Caption</Typography></Grid>;
                }
                else
                {
                    // console.log(res.data.url);
                    setImageUrl(res.data.url);
                }
            }
        });
        // setValues({ ...values, desc: ""})
        setValues({desc: ""});
    }
    // if(loadImage)
    // {
    //     elem = <Grow in={checked}><Grid item sx={{marginTop: "15vmin"}}><image src="" alt="Generated image"></image></Grid></Grow>;
    //     let temp = new Object();
    //     temp.email = state.value.email;
    //     temp.caption = values.desc;
    //     let json = JSON.stringify(temp);
    //     let heads = {"Content-Type": "application/json"};
    //     axios.post("http://localhost:5001/fashion", json, {headers: heads}).then((res) => {
    //         if(res.data)
    //         {
    //             console.log(res.data);
    //         }
    //     });
    //     // setValues({ ...values, desc: ""})
    //     setValues({desc: ""});
    // }
    // else
    // {
    //     elem = <Grid item sx={{marginTop: "15vmin"}}><Skel/></Grid>
    //     console.log('no')
    // }
        // elem = <></>

    // console.log(modal, loadModal)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [alignment, setAlignment] = React.useState('caption');

    const handleToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
        if(alignment === "caption")
            setFlag(true);
        else if(alignment === "dropdown")
            setFlag(false);
        
            // console.log(flag);
    };


    const handleGender = (event) => {
        const {
          target: { value },
        } = event;
        setGender(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleColor = (event) => {
        const {
          target: { value },
        } = event;
        setColor(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleCategory = (event) => {
        const {
          target: { value },
        } = event;
        setCategory(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    }

    React.useEffect(() => {
        if(values.desc === "")
            setLoadImage(false);
    }, [values.desc]);


    return (
        <>
            <Loader2 disp={displ} pos="right"/>
            <Grid container alignItems="center" justifyContent="center" spacing={10}>
                <Grid item>
                    <Container maxWidth="md" sx={{backgroundColor: "#ee7752", width: "40vmax", textAlign: "center",
                        padding: "30px", marginTop: "100px", borderRadius: "20px"}}>
                        <h1>Image Generation</h1>
                        <Grid container direction='column' rowSpacing={2}>
                            <Grid item>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="caption"
                                    name="radio-buttons-group"
                                    onChange={handleToggle}
                                    >
                                    <FormControlLabel value="caption" control={<Radio />} label="Caption" />
                                    <FormControlLabel value="dropdown" control={<Radio />} label="Dropdown" />
                                </RadioGroup>
                            </Grid>
                            <Grid item>
                                <TextField disabled={flag} value={values.desc} onChange={handleChange('desc')} label="Description"
                                    fullWidth/>
                            </Grid>
                            {elem}
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-select-small">Gender</InputLabel>
                                    <Select disabled={!flag} labelId="demo-select-small" id="demo-select-small" value={gender} label="Gender"
                                        onChange={handleGender} fullWidth >
                                        {genders.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-select-small">Category</InputLabel>
                                    <Select disabled={!flag} labelId="demo-select-small" id="demo-select-small" value={category} label="Gender"
                                        onChange={handleCategory} fullWidth >
                                        {categories.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-select-small">Color</InputLabel>
                                    <Select disabled={!flag} labelId="demo-select-small" id="demo-select-small" value={color} label="Gender"
                                        onChange={handleColor} fullWidth >
                                        {colors.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={ () => {
                                    // const response = await axios.get('localhost:5000/GenImage');
                                    // setImageUrl(response.data)
                                    // console.log(values.desc);

                                    if(values.desc !== "")
                                        exec();
                                    else if(gender !== "" && category !== "" && color !== "")
                                        exec();
                                }}>Generate Image</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                {/* {elem} */}
                <Grid item sx={{marginTop: "15vmin"}} xs={6}>
                    {imageUrl.map((image, i) => (
                        <img key={i} src={image} alt={`Generated image ${i}`}></img>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}