import React from "react"
import { Route, Switch } from "react-router-dom"
import WindowTitle from "@emmpair/comps/WindowTitle"
import FarmListPage from  "@emmpair/conts/FarmListPage"
import FarmItemPage from "@emmpair/conts/FarmItemPage"


const FarmSection: React.FC = () => {
  return (
    <>
    <WindowTitle title={'Farm | Properly'} />    
    <Switch>
      <Route exact path="/farm" component={FarmListPage} />
      <Route exact path="/farm/:token" component={FarmItemPage} />
    </Switch>      
    </>
  )
}

export default FarmSection