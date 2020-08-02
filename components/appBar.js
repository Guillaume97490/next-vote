import React from 'react';
import { useRouter } from 'next/router'
import { useUser } from 'utils/hooks'
import {AppBar, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText,
  Menu, MenuItem, SwipeableDrawer, Toolbar, Typography, Button} from '@material-ui/core';
// import Link from 'next/link'
import Link from 'src/Link'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import ReorderIcon from '@material-ui/icons/Reorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import { makeStyles } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Head from 'next/head';

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
      {/* <List> */}
        <Link color="inherit" href="/">
          <ListItem button 
              onClick={handleDrawerToggle} 
              selected={"/" === pathName}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
        </Link>
        {user && 
          <>
            <Link color="inherit" href="/votes">
              <ListItem button 
                  onClick={handleDrawerToggle}
                  selected={"/votes" === pathName}>
                <ListItemIcon>
                  <ReorderIcon />
                </ListItemIcon>
                <ListItemText primary="Tous les votes" />
              </ListItem>
            </Link>

            <Link color="inherit" href="/votes/en-cours">
              <ListItem button 
                  onClick={handleDrawerToggle}
                  selected={"/votes/en-cours" === pathName}>
                <ListItemIcon>
                  <PlaylistPlayIcon />
                </ListItemIcon>
                <ListItemText primary="Votes en cours" />
              </ListItem>
            </Link>

            <Link color="inherit" href="/votes/termines">
              <ListItem button 
                  onClick={handleDrawerToggle}
                  selected={"/votes/termines" === pathName}>
                <ListItemIcon>
                  <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary="Votes terminés" />
              </ListItem>
            </Link>

            <Link color="inherit" href="/votes/mes-votes">
              <ListItem button 
                  onClick={handleDrawerToggle}
                  selected={"/votes/mes-votes" === pathName}>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Mes votes" />
              </ListItem>
            </Link>


            <Link color="inherit" href="/votes/nouveau">
              <ListItem button 
                  onClick={handleDrawerToggle} 
                  selected={"/votes/nouveau" === pathName}>
                <ListItemIcon>
                  <PlaylistAddIcon />
                </ListItemIcon>
                <ListItemText primary="Créer un vote" />
              </ListItem>
            </Link>
          </>
        }

        
        
        
        
      {/* </List> */}

      <Divider />

      {user ?
        // <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <PowerSettingsNewIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" />
          </ListItem>
        // </List>
      :
      <>
        <Link color="inherit" href="/signin">
          <ListItem button 
              onClick={handleDrawerToggle} 
              selected={"/signin" === pathName}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Connexion" />
          </ListItem>
        </Link> 

        <Link color="inherit" href="/signup">
          <ListItem button 
              onClick={handleDrawerToggle} 
              selected={"/signup" === pathName}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Inscription" />
          </ListItem>
        </Link> 
      </>
      }

      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Head><title>{props.title || "Next-vote"}</title></Head>
      
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
            {props.title || "Next-vote"}
          </Typography>
          {user ? (
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
          )
        :
        <Button 
          variant="contained" 
          style={{backgroundColor:"#cae1f9", color:"#48568c"}}
          href="/signin"
        >
          Connexion
          </Button>
        }
          
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
