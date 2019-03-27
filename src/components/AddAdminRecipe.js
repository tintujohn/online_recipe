import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addUserData, fetchUserData } from '../actions/index';
import AdminRecipe from './AdminRecipe'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 160,
    width: 300,
    marginTop: 60,
    border: 1
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class AddAdminRecipe extends Component {
    state = {
        open: true,
        recipeName: '',
        recipeDetail: '',
        loadRecipe: false
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ 
          ...this.state,
          open: false,
          loadRecipe: true 
        });
        this.props.fetchUserData();
      };

      handleSubmit = (e) => {
        e.preventDefault();
        const data = {
          recipeName : this.state.recipeName,
          recipeDetails : this.state.recipeDetail,
        }

        this.props.addUserData(data);
        this.handleClose();
      };
  render() {
      return (
       <div>
         {this.state.loadRecipe === true?(
           
           <AdminRecipe {...this.props} />): null}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Recipe Of The Day</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Add Recipe Below:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Recipe Name"
              type="text"
              fullWidth
              onChange={e => this.setState({ recipeName: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="details"
              label="Recipe Details"
              type="text"
              fullWidth
              onChange={e => this.setState({ recipeDetail: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
  }
}

AddAdminRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
return {
  data: state.data !== undefined?state.data.data:null
};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUserData: (data) => dispatch(addUserData(data)),
    fetchUserData: () => dispatch(fetchUserData())
  };
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddAdminRecipe));