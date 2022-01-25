import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  MainDiv,
  HeadingDiv,
  MainHeading,
  HLine,
  PackageList,
  ThumbnailImg,
  PackageH1,
  PackageP,
  PackageUl,
  LoaderDiv,
} from './styledComponent'

class Home extends Component {
  state = {packageData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))
    this.setState({packageData: updatedData})
  }

  renderLoadingView = () => (
    <LoaderDiv data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderDiv>
  )

  renderPackageListView = () => {
    const {packageData} = this.state
    return (
      <>
        {packageData.map(each => (
          <PackageList key={each.id}>
            <ThumbnailImg src={each.imageUrl} alt={each.name} />
            <PackageH1>{each.name}</PackageH1>
            <PackageP>{each.description}</PackageP>
          </PackageList>
        ))}
      </>
    )
  }

  render() {
    const {packageData} = this.state
    console.log(packageData)
    return (
      <MainDiv>
        <HeadingDiv>
          <MainHeading>Travel Guide</MainHeading>
          <HLine />
        </HeadingDiv>
        <PackageUl>
          {packageData.length === 0
            ? this.renderLoadingView()
            : this.renderPackageListView()}
        </PackageUl>
      </MainDiv>
    )
  }
}
export default Home
