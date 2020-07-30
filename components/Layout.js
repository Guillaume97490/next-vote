import Appbar from 'components/appBar'
import Footer from 'components/footer'
import Container from '@material-ui/core/Container';

const Layout = props => (
  <>
    <Appbar />
      <Container maxWidth="md">
        {props.children}
      </Container>
    <Footer />
  </>
);
  
export default Layout;