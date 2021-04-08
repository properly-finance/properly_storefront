import React from "react"
import { Route, Switch } from "react-router-dom"
import WindowTitle from "@emmpair/comps/WindowTitle"
import FarmListPage from  "@emmpair/comps/FarmListPage"

const FarmSection: React.FC = () => {
  return (
    <>
    <WindowTitle title={'Farm | Properly'} />    
    <Switch>
      <Route exact path="/farm" component={FarmListPage} />
    </Switch>      
    </>
  )
}

export default FarmSection