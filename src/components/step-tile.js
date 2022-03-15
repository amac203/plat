import wheatBGElement from "../assets/wheatBGElement.svg"

export default {
  name: 'StepTile',
  data: function () {
    return {
      wheatBGElement: wheatBGElement
    }
  },
  props: {
    name: String,
    text: String,
    editing: Number
  },
  computed: {
    displayName: {
      get: function() {
        return this.name
      },
      set: function(newValue) {
        this.$emit('update:name', newValue)
        return newValue
      }
    },
    displayText: {
      get: function() {
        return this.text
      },
      set: function(newValue) {
        this.$emit('update:text', newValue)
        return newValue
      }
    },
  },
  methods: {
  },

}
