import wheatBGElement from '../assets/wheatBGElement.svg';

export default {
  name: 'StepTile',

  data() {
    return {
      wheatBGElement,
    };
  },

  props: {
    name: String,
    text: String,
    editing: Number,
  },

  computed: {
    displayName: {
      get() {
        return this.name;
      },
      set(newValue) {
        this.$emit('update:name', newValue);
        return newValue;
      },
    },
    displayText: {
      get() {
        return this.text;
      },
      set(newValue) {
        this.$emit('update:text', newValue);
        return newValue;
      },
    },
  },

  methods: {
  },

};
