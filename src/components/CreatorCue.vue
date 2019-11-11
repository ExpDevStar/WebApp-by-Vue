<template>
  <div class="cue" :class="{ active: active }">
    <div class="index">{{ index }}</div>

    <b-input
      type="number"
      step="0.1"
      min="0"
      size="is-small"
      v-model.number="startTime"
      class="time-input"
    />

    <b-button size="is-small" @click="fillStartTime()"
      ><i class="far fa-dot-circle"></i
    ></b-button>

    <div class="text" @click="$emit('seek', startTime)">
      {{ text }}
    </div>

    <b-input
      type="number"
      step="0.1"
      min="0"
      size="is-small"
      v-model.number="endTime"
      class="time-input"
    />

    <b-button size="is-small" @click="fillEndTime()"
      ><i class="far fa-dot-circle"></i
    ></b-button>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    currentTime: Number
  },
  data() {
    return {
      startTime: null,
      endTime: null
    };
  },
  computed: {
    index() {
      return `#${this.$vnode.key}`;
    },
    active() {
      return this.currentTime > 0
        ? this.currentTime >= this.startTime && this.currentTime <= this.endTime
        : false;
    }
  },
  methods: {
    fillStartTime() {
      this.startTime = this.currentTime;
    },
    fillEndTime() {
      this.endTime = this.currentTime;
    }
  }
};
</script>

<style lang="scss" scoped>
.cue {
  padding: 5px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;

  &.active {
    background: rgba(255, 255, 0, 0.15);

    &:hover {
      background: rgba(255, 255, 0, 0.2);
    }
  }

  &:hover {
    background: rgba(246, 246, 246, 1);
  }

  .index {
    text-align: center;
    color: #ccc;
    display: inline-block;
    min-width: 2em;
  }

  div {
    margin: 0 0.5em;
  }

  .text {
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }

  .time-input {
    min-width: 5em;
    width: 5em;
  }
}
</style>
