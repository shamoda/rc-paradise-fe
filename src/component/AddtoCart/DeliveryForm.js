import React from 'react';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel

} from '@material-ui/core';
import Uber_logo from "./uber.png";
import DHL from "./DHL.png";
import Fedex from "./Fedex.png";

const DeliveryForm = (props) => {

  return (
    <FormControl style={{ marginTop: 10 }} component="fieldset">
      <FormLabel component="legend" style={{ marginLeft: 20 }}>Choose a delivery method !!!</FormLabel>
      <RadioGroup row aria-label="position" name="position" value={props.value} onChange={props.handleChange}>

        <FormControlLabel
          value='Uber'
          control={<Radio color="primary" />}
          label={<img src={Uber_logo} style={{ width: 40, height: 40, marginLeft: 10 }} />}
          labelPlacement="start"
        />

        <FormControlLabel
          value='DHL'
          control={<Radio color="primary" />}
          label={<img src={DHL} style={{ width: 40, height: 40, marginLeft: 10 }} />}
          labelPlacement="start"
        />

        <FormControlLabel
          value='Fedex'
          control={<Radio color="primary" />}
          label={<img src={Fedex} style={{ width: 40, height: 40, marginLeft: 10 }} />}
          labelPlacement="start"
        />

      </RadioGroup>
    </FormControl>
  );
}
export default DeliveryForm;

