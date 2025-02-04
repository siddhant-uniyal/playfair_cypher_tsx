import AppContextProvider from '../context/app-context'
import Grid from '../components/Grid'
import Text from '../components/Text'

const Playfair = () => {
  return (
      <div id="playfair">
      <AppContextProvider>
        <Text />
        <Grid></Grid>
      </AppContextProvider>
      </div>
  )
}

export default Playfair