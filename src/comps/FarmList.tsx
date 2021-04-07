import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TFarms } from "@emmpair/reducers/types"
import Warehouses from "@emmpair/icons/Warehouses"


const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  card: {
    "&:hover": {
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);"
    },
    cursor: "pointer",
    marginBottom: theme.spacing(3),
    transition: theme.transitions.duration.standard + "ms"
  },
  cardContent: {
    // Overrides Material-UI default theme
    "&:last-child": {
      paddingBottom: 16
    },
    display: "grid",
    gridColumnGap: theme.spacing(4),
    gridTemplateColumns: "48px 1fr"
  },
  cardDisabled: {
    "& $icon, & $sectionTitle, & $sectionDescription": {
      color: theme.palette.text.disabled
    },
    marginBottom: theme.spacing(3)
  },
  configurationItem: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    },
    display: "grid",
    gridColumnGap: theme.spacing(4),
    gridTemplateColumns: "1fr 1fr"
  },
  icon: {
    "& path": {
      fill: theme.palette.primary.main
    },
    fontSize: 48
  },
  sectionDescription: {

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600 as 600
  }
}),{ name: "FarmList" })

interface IFarmList {
  farms: [] | TFarms
  account?: string
  navigate: (path: string)=>void
}

const FarmList: React.FC<IFarmList> = (props) => {
  const { farms, account, navigate } = props
  const classes = useStyles()

  function handleNavigate(event, url: string){
    event.preventDefault()    
    if (account){
      navigate(url)
    }
  }
  // const handleNavigate = (url: string) => {
  //   console.log(url)    
  // }

  return (
    <div className={classes.root}>
      { farms.length ? (
        <div className={classes.configurationItem}>
          {farms.map((farm, farmKey) => (
            <Card
              className={account
                ? classes.card
                : classes.cardDisabled
              }
              onClick={(e)=>handleNavigate(e, `/farm/${farm.lpToken}`)}
              key={farmKey}
            >
              <CardContent className={classes.cardContent}>
                <div className={classes.icon}>
                  <Warehouses fontSize="inherit" viewBox="0 0 44 44" />
                </div>
                <div>
                  <Typography
                    className={classes.sectionTitle}
                    color="primary"
                  >
                    {farm.name}
                  </Typography>
                  <Typography className={classes.sectionDescription}>
                    depositFeeBP: {farm.depositFeeBP}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <h2>
          Loading...
        </h2>        
      )}
    </div>
  )
}

export default FarmList