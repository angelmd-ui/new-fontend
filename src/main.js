import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import VueTouch from 'vue-touch';
import StarRating from 'vue-star-rating'
Vue.use(VueTouch)


import PinchZoom from 'vue-pinch-zoom';

Vue.component('pinch-zoom', PinchZoom);
Vue.component('star-rating', StarRating);


import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import { Plugin } from 'vue-fragment'
Vue.use(Plugin)


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library } from '@fortawesome/fontawesome-svg-core'
import {
   faEye,
   faPenFancy,
   faBook,
   faFootballBall,
   faDesktop,
   faGlobeAmericas,
   faNewspaper,
   faSearch,
   faCalendarDay,
   faBars,
   faArrowLeft ,
   faArrowRight ,
   faArrowDown,
   faFutbol,
   faTag,
   faCheckCircle,
   faBullseye,
   faCheck,
  faTimes,
  faPlusCircle,
  faThumbsUp,
  faUniversity,
  faCommentDots,
  faComment,
  faUserAlt,
  faPalette,
  faFlask,
  faHeart,
  faGrinBeam,
  faUserCog,
  faCoins,
  faCameraRetro,
  faGuitar,
  faRunning,
  faCommentAlt,
  faChartPie,
  faTheaterMasks,
  faPhoneAlt,
  faSkating} from '@fortawesome/free-solid-svg-icons'

library.add(
  faEye,
  faTimes,
  faGrinBeam,
  faRunning,
  faPhoneAlt,
  faTag,
  faCoins,
  faGuitar,
  faCameraRetro,
  faPalette,
  faFlask,
  faChartPie,
  faUserCog,
  faTheaterMasks,
  faCommentAlt,
  faUserAlt,
  faArrowLeft,
  faArrowRight ,
  faHeart,
  faCheckCircle,
  faCheck,
  faSkating,
  faPlusCircle,
  faUniversity,
  faThumbsUp,
  faComment,
  faCommentDots,
  faPenFancy,faBook,faBullseye,faFootballBall,faDesktop,faGlobeAmericas,faNewspaper,faSearch,faCalendarDay,faBars,faArrowDown,faFutbol)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueLodash, { lodash: lodash })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

