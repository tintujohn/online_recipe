import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { approvePendingData, removeUserData } from '../actions/index';
import AddComment from './AddComment';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 160,
    width: 300,
    marginTop: 60,
    border: 1,
    padding: 5
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 60,
    width: 80
  },
});

class PendingApprovals extends Component {
  state = {
    spacing: 40,
    pending_approvals: [],
    comment_dialog: false,
    id_to_comment: '',
  };
  componentDidMount() {
    const pendingData = this.props.data.filter(recipe=>recipe.approvalStatus === 'new')
    this.setState({
        pending_approvals: pendingData
    })
  }
  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    this.handleApprove = (recipeId) => {
        this.props.approvePendingData(recipeId);
        window.location.reload();
    }

    this.handleRemoval = (recipeId) => {
        this.props.removeUserData(recipeId);
        window.location.reload();
    }

    this.handleAddComment = (recipeId) => {
        this.setState({
            comment_dialog: true,
            id_to_comment: recipeId,
        })
    }

      return (
        <div>
          {this.state.comment_dialog === true ? ( <AddComment recipeId={this.state.id_to_comment}/>): null }
       <Grid container className={classes.root} spacing={spacing}>
       
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        {this.state.pending_approvals !== undefined ? (this.state.pending_approvals.map((item) => {
            return <Grid key={item.recipeId} item>
                <Paper className={classes.paper} >
                  <Typography style={{ cursor: 'pointer' }}>{item.recipeName}</Typography>
                  <Typography color="textSecondary">
        {item.recipeDetails}
        </Typography>
        <Button size="medium" variant="outlined" color="secondary" className={classes.button} onClick={()=>this.handleApprove(item.recipeId)}>
        Approve
      </Button>
      <Button size="medium" variant="outlined" color="secondary" className={classes.button} onClick={()=>this.handleRemoval(item.recipeId)}>
        Remove
      </Button>
      <Button size="medium" variant="outlined" color="secondary" className={classes.button} onClick={()=>this.handleAddComment(item.recipeId)}>
        Comment
      </Button>
            </Paper>
            </Grid>
    }) ):null}
    </Grid>
        </Grid>
        </Grid>
        </div>
        )
  }
}

PendingApprovals.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
return {
  data: state.data.data !== undefined?state.data.data:state.data
};
};

const mapDispatchToProps = (dispatch) => {
    return {
        approvePendingData: (id) => dispatch(approvePendingData(id)),
        removeUserData: (id) => dispatch(removeUserData(id))
    };
  }

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PendingApprovals));