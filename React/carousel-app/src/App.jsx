import './App.css'
import Carousel from './components/Carousel'

function App() {

  const slides = [
    'https://i.ibb.co/ncrXc2V/1.png',
    'https://i.ibb.co/B3s7v4h/2.png',
    'https://i.ibb.co/XXR8kzF/3.png',
    'https://i.ibb.co/yg7BSdM/4.png',
  ]

  return (
    <div className='max-w-lg container'>
      <Carousel autoSlide={false}>
        {slides.map((s, i) => (
          <img key={i} src={s} />
        ))}
      </Carousel>
    </div>
  )
}

export default App
