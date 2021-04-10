import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import useNavigator from "@emmpair/hooks/useNavigator"
import { pollRouter } from "@emmpair/hooks/useNavigator"


const useStyles = makeStyles({
  root: {
    flex: 1,
  },
},{ name: "ToolBar" })


type THTMLInputElement = HTMLInputElement & {
  href: string
}


export const ToolBar: React.FC = () => {
  const navigate = useNavigator()
  const classes = useStyles()
  const { location:{ pathname }} = pollRouter()
  const path = pathname.split('/')[1]


  function handleChange (
    event: React.ChangeEvent<THTMLInputElement>, 
    value: string
  ) {
    event.preventDefault()
    // const href = e.currentTarget.href?.replace(/http[s]?:[\/:]+[a-zA-Z-\.]+:?\d*/i, '')
    // const path = v == 0 ? "/" : href
    navigate(value)
  }

  return (
    <div className={classes.root}>    
      <Tabs
          value={`/${path}`}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value="/" label="Collateral & Mint" />
          <Tab value="/farm" label="Farm" />          
      </Tabs>
    </div>   
  )
}

export default ToolBar
