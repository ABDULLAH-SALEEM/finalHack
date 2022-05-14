import React from 'react'
import Courses from './Courses/Courses'
import Header from './Header/Header'
import './Home.css'

const Home = () => {
  return (
    <div>
      <Header />
      {/* <Courses /> */}
      <div className='courseHeading'>News Feed</div>
      <div className='facebookfeed'>
        <div class="fb-page" data-href="https://www.facebook.com/SaylaniMassTraining/" data-tabs="timeline" data-width="450px" data-height="500px" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><blockquote cite="https://www.facebook.com/SaylaniMassTraining/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/SaylaniMassTraining/">Saylani Welfare Mass Training &amp; Job Creation Program</a></blockquote></div>
      </div>

    </div>

  )
}

export default Home