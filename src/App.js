import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar'
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors/purple';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import UserRecipe from './components/UserRecipe';
import AdminRecipe from './components/AdminRecipe';
import AddRecipe from './components/AddRecipe';
import { searchUserData, fetchAdminData } from './actions/index';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AddAdminRecipe from './components/AddAdminRecipe';
import PendingApprovals from './components/PendingApprovals';

const styles = style => ({
  fab: {
    margin: style.spacing.unit * 2,
  },
  absolute: {
    position: 'fixed',
    bottom: style.spacing.unit * 2,
    right: style.spacing.unit * 3,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 5,
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 1,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 120,
    },
  },
  adminBtn: {
    marginLeft: '40%',
  },
  adminRecipe: {
    padding: 0
  }
});

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  state = {
    add_item: false,
    search_data: false,
    is_admin: false,
    admin_recipe: false,
    pending_page: false
  }
  render() {
    const { classes } = this.props;
    this.handleClick=()=> {
      this.setState({
        add_item: true
      })
    }

    this.handleSearch = (e) => {
      if (e.key === 'Enter') {
        const data = e.target.value;
        this.props.searchUserData(data);
        this.setState({
          search_data: true
        })
      }
    }

    this.handleAdminPage = () => {
      this.props.fetchAdminData();
      this.setState({
        is_admin: true
      })
    }
    
    this.handleAdminRecipe = () => {
      this.setState({
        admin_recipe: true
      })
    }

    this.handlePendingApprovals = (e) => {
      e.preventDefault();
      this.setState({
        pending_page: true
      })
    }

    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
          <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                Recipe Management System
                </Typography>
                <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyPress={this.handleSearch}/>
            </div>
            <Button color="inherit" className={classes.adminBtn} onClick={this.handleAdminPage}>Admin</Button>
            {this.state.is_admin === true ? (
              <div>
                <Button color="inherit" onClick={this.handleAdminRecipe}><Icon className={classes.adminRecipe}>restaurant_menu</Icon></Button>
                <Button color="inherit" onClick={this.handlePendingApprovals}><Icon className={classes.adminRecipe}>done_all</Icon></Button>
                </div>): null}
            
            </Toolbar>
        </AppBar>
        <Tooltip title="Add" aria-label="Add">
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon onClick={this.handleClick} />
        </Fab>
      </Tooltip>
      {this.state.pending_page === true? (<PendingApprovals />): null}
      {this.state.pending_page === false && this.state.is_admin === true? (<AdminRecipe/>): null}
      {this.state.admin_recipe === true? (<AddAdminRecipe/>): null}
      {this.state.search_data === true?(<UserRecipe {...this.props.data}/>): null}
      {this.state.add_item !== true ?(<UserRecipe/>):<AddRecipe {...this.props}/>}
          </div>
      </MuiThemeProvider>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
return {
  data: state.data
};
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUserData: (data) => dispatch(searchUserData(data)),
    fetchAdminData: () => dispatch(fetchAdminData())
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
