import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useUser } from 'utils/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ReorderIcon from '@material-ui/icons/Reorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    // display: 'flex'
  },
  title: {
    flexGrow: 1,
  },
  // drawer: {
  //   [theme.breakpoints.up('md')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  //   justifyContent: 'flex-end',
  // },
  drawerPaper: {
    width: drawerWidth,
  },
  // hide: {
  //   display: 'none',
  // },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function MenuAppBar(props) {
  const { window } = props;
  const pathName = useRouter().pathname
  // let user = null
  const user = useUser()
  
  const classes = useStyles();
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [openDrawer, setOpenDrawer] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleClose = () => setAnchorEl(null);

  const router = useRouter()

  const handleLogout = () => router.push('/api/auth/logout');

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link href="/">
          <ListItem button 
              onClick={handleDrawerToggle} 
              selected={"/" === pathName}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
        </Link>

        <Link href="/votes">
          <ListItem button 
              onClick={handleDrawerToggle}
              selected={"/votes" === pathName}>
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText primary="Tous les votes" />
          </ListItem>
        </Link>

        <Link href="/votes/en-cours">
          <ListItem button 
              onClick={handleDrawerToggle}
              selected={"/votes/en-cours" === pathName}>
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <ListItemText primary="Votes en cours" />
          </ListItem>
        </Link>

        <Link href="/votes/termines">
          <ListItem button 
              onClick={handleDrawerToggle}
              selected={"/votes/termines" === pathName}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Votes terminés" />
          </ListItem>
        </Link>

        <Link href="/votes/mes-votes">
          <ListItem button 
              onClick={handleDrawerToggle}
              selected={"/votes/mes-votes" === pathName}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Mes votes" />
          </ListItem>
        </Link>


        <Link href="/votes/nouveau">
          <ListItem button 
              onClick={handleDrawerToggle} 
              selected={"/votes/nouveau" === pathName}>
            <ListItemIcon>
              <PlaylistAddIcon />
            </ListItemIcon>
            <ListItemText primary="Créer un vote" />
          </ListItem>
        </Link>

        
        
        
        
      </List>

      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNewIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Se déconnecter" />
        </ListItem>
      </List>

      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton 
            edge="start" 
            className={classes.menuButton}
            color="inherit" 
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Next-Votes
          </Typography>
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                
                {/* <p>Your session: {JSON.stringify(user)}</p> */}
                {user && 
                  <MenuItem onClick={handleLogout}>
                    Se deconnecter
                  </MenuItem>
                }
              </Menu>
            </div>
          )}
        </Toolbar>
        
      </AppBar>
      <Toolbar />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* implementation="js" for delete of the dom, "css" for display:none */}
        <Hidden mdUp implementation="js">
        <SwipeableDrawer
            // disableBackdropTransition
            container={container}
            variant="temporary"
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}

            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          
        </SwipeableDrawer>
        </Hidden>
        {/* implementation="js" for delete of the dom, "css" for display:none */}
        <Hidden smDown implementation="js"> 
          <Drawer
            container={container}
            variant="permanent"
            anchor="left"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        
        </Hidden>

      </nav>
    </>
  );
}
