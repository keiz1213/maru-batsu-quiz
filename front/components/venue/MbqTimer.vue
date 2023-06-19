<script setup lang="ts">
  const props = defineProps<{
    elapsed: number
    limit: number
  }>()

  const padToTwo = (num: number) => {
    return String(num).padStart(2, '0')
  }

  const timeLeft = () => {
    return props.limit - props.elapsed
  }

  const timeLeftString = () => {
    const minutes = Math.floor(timeLeft() / 60)
    const seconds = timeLeft() % 60
    return `${padToTwo(minutes)}:${padToTwo(seconds)}`
  }

  const strokeDasharray = () => {
    const radius = 45
    const total = 2 * Math.PI * radius
    const timeFraction = timeLeft() / props.limit
    const adjTimeFraction = timeFraction - (1 - timeFraction) / props.limit
    const elapsedDash = Math.floor(adjTimeFraction * total)
    return `${elapsedDash} ${total}`
  }
</script>

<template>
  <div class="root">
    <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="circle">
        <circle class="time-elapsed-path" cx="50" cy="50" r="45" />
        <path
          class="time-left-path"
          v-if="timeLeft() > 0"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          :style="{ strokeDasharray: strokeDasharray() }"
        ></path>
      </g>
    </svg>
    <div class="time-left-container">
      <span class="time-left-label">{{ timeLeftString() }}</span>
    </div>
  </div>
</template>

<style>
  /* Sets the container's height and width */
  .root {
    height: 130px;
    width: 130px;
    position: relative;
  }

  /* Removes SVG styling that would hide the time label */
  .circle {
    fill: none;
    stroke: none;
  }

  /* The SVG path that displays the timer's progress */
  .time-elapsed-path {
    stroke-width: 7px;
    stroke: #424242;
  }

  .time-left-container {
    /* Size should be the same as that of parent container */
    height: inherit;
    width: inherit;

    /* Place container on top of circle ring */
    position: absolute;
    top: 0;

    /* Center content (label) vertically and horizontally  */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time-left-label {
    font-size: 30px;
    font-family: 'Segoe UI';
    color: rgb(1,249,65);
  }

  .time-left-path {
    /* Same thickness as the original ring */
    stroke-width: 7px;

    /* Rounds the path endings  */
    stroke-linecap: round;

    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;

    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;

    /* Colors the ring */
    stroke: rgb(0, 255, 64);
  }

  .svg {
    /* Flips the svg and makes the animation to move left-to-right */
    transform: scaleX(-1);
  }
</style>
