import splashImage from "../assets/friends2.jpeg"
import fullLogo from "../assets/fullLogo.svg"
import spicy from "../assets/spicy.svg"
import greenBGElement from "../assets/greenBGElement.svg"
import wheatBGElement from "../assets/wheatBGElement.svg"

export default {
  name: 'Splash',
  data: function () {
    return {
      splashImage: splashImage,
      fullLogo: fullLogo,
      spicy: spicy,
      greenBGElement: greenBGElement,
      wheatBGElement: wheatBGElement,
      tagline: "Cultivate Creativity"
    }
  },
  computed: {
  },
  methods: {
    getStarted(){
      this.$emit('getStarted')
    }
  },

  created() {

  }
}
