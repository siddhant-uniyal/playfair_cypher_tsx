import AppContextProvider from '../context/app-context'
import Grid from '../components/playfair/Grid'
import Text from '../components/playfair/Text'

const Playfair = () => {
  return (
      <div id="playfair" className='flex flex-col justify-center items-center'>
      <AppContextProvider>
        <Text />
        <Grid></Grid>
      </AppContextProvider>
      </div>
  )
}

export default Playfair