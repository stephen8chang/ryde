import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Typography,
  Paper,
  TextField
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const CreateProject = props => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [hardwareSets, setHardwareSets] = useState([]);
  useEffect(async () => {
    const res = await axios.get('/api/hardware/all');
    setHardwareSets(res.data);
  }, [props.auth]);
  const handleOnSubmit = async () => {
    if (name !== '' && description !== '') {
      const checkedOut = await axios.post('/api/checked/create', {
        hardwareSets
      });
      await axios.post('/api/create', {
        projectName: name,
        description,
        checkedOut: checkedOut.data,
        creator: props.auth.email
      });
      setName('');
      setDescription('');
      setSuccessMessage('Project created!');
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };
  return (
    <Paper className={classes.paper}>
      <AppBar
        position='static'
        style={{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          alignItems: 'center'
        }}
      >
        <Typography variant='h6'>Create New Project</Typography>
      </AppBar>

      <TextField
        variant='filled'
        margin='normal'
        required
        id='Project Name'
        label='Project Name'
        name='Project Name'
        style={{ width: '75%' }}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        variant='filled'
        margin='normal'
        required
        id='Project Description'
        label='Project Description'
        name='Project Description'
        style={{ width: '75%' }}
        onChange={e => setDescription(e.target.value)}
      />
      <Button
        onClick={handleOnSubmit}
        style={{ paddingTop: 15, paddingBottom: 15 }}
      >
        Create New Project <AddToPhotosIcon />
      </Button>
      {errorMessage ? (
        <Alert
          className={classes.submit}
          style={{
            width: '70%',
            justifyContent: 'center'
          }}
          severity='error'
        >
          {errorMessage}
        </Alert>
      ) : null}
      {successMessage ? (
        <Alert
          className={classes.submit}
          style={{
            width: '70%',
            justifyContent: 'center'
          }}
          severity='success'
        >
          {successMessage}
        </Alert>
      ) : null}
    </Paper>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(CreateProject);
