<template>
  <svg
    class="search-icon"
    fill="none"
    height="120"
    viewBox="0 0 24 24"
    width="120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <transition mode="out-in" name="search-loading-">
      <g
        v-if="this.$store.state.currentlySearching"
        class="search-icon__spinner"
      >
        <circle class="search-icon__spinner-bubble" cx="7" cy="11" r="0.25" />
        <circle class="search-icon__spinner-bubble" cx="11" cy="11" r="0.25" />
        <circle class="search-icon__spinner-bubble" cx="15" cy="11" r="0.25" />
      </g>
    </transition>
  </svg>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style lang="scss" scoped>
.search-icon {
  stroke: white;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 10;
  &__spinner {
    transform-origin: 11px 11px;
  }
}
.search-icon {
  &__spinner {
    animation: rotate 1s ease-in-out infinite;
  }
  &__handle.search-loading {
    &--enter,
    &--leave-to {
      stroke-dashoffset: -14;
    }
    &--leave-active {
      transition: stroke-dashoffset 0.25s ease-in;
    }
    &--enter-active {
      transition: stroke-dashoffset 0.25s ease-out;
    }
  }
  &__spinner.search-loading {
    &--enter-active {
      .search-icon__spinner-bubble {
        transition: transform, opacity 0.45s var(--ease-out-back);
      }
    }
    &--leave-active {
      .search-icon__spinner-bubble {
        transition: transform, opacity 0.45s var(--ease-in-back);
      }
    }
    &--enter,
    &--leave-to {
      .search-icon__spinner-bubble {
        &:nth-child(1) {
          transform: translateX(-30px);
          opacity: 0.25;
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translateX(30px);
          opacity: 0.25;
        }
      }
    }
  }
}
@keyframes rotate {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
