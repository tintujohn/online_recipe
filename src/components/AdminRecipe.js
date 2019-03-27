import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
});

class AdminRecipe extends Component {
  state = {
    spacing: 40,
  };
  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
      return (
       <Grid container className={classes.root} spacing={spacing}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        {this.props.data !== undefined ? (this.props.data.map((item) => {
      return <Grid key={item.recipeId} item>
                <Paper className={classes.paper} >
                  <Typography style={{ cursor: 'pointer' }}>{item.recipeName}</Typography>
                  <Typography color="textSecondary">
        {item.recipeDetails}
        </Typography>
            </Paper>
            </Grid>
    }) ):null}
    </Grid>
        </Grid>
        </Grid>)
  }
}

AdminRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
return {
  data: state.data.data !== undefined?state.data.data:state.data
};
};

export default withStyles(styles)(connect(mapStateToProps, null)(AdminRecipe));